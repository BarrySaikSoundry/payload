'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as qs from 'qs-esm';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useDebounce } from '../../../../hooks/useDebounce.js';
import { useConfig } from '../../../../providers/Config/index.js';
import { useTranslation } from '../../../../providers/Translation/index.js';
import { ReactSelect } from '../../../ReactSelect/index.js';
import './index.scss';
import optionsReducer from './optionsReducer.js';
const baseClass = 'condition-value-relationship';
const maxResultsPerRequest = 10;
export const RelationshipField = (props)=>{
    const { admin: { isSortable } = {}, disabled, hasMany, onChange, relationTo, value } = props;
    const { collections, routes: { api }, serverURL } = useConfig();
    const hasMultipleRelations = Array.isArray(relationTo);
    const [options, dispatchOptions] = useReducer(optionsReducer, []);
    const [search, setSearch] = useState('');
    const [errorLoading, setErrorLoading] = useState('');
    const [hasLoadedFirstOptions, setHasLoadedFirstOptions] = useState(false);
    const debouncedSearch = useDebounce(search, 300);
    const { i18n, t } = useTranslation();
    const relationSlugs = hasMultipleRelations ? relationTo : [
        relationTo
    ];
    const initialRelationMap = ()=>{
        const map = new Map();
        relationSlugs.forEach((relation)=>{
            map.set(relation, 1);
        });
        return map;
    };
    const nextPageByRelationshipRef = React.useRef(initialRelationMap());
    const partiallyLoadedRelationshipSlugs = React.useRef(relationSlugs);
    const addOptions = useCallback((data, relation)=>{
        const collection = collections.find((coll)=>coll.slug === relation);
        dispatchOptions({
            type: 'ADD',
            collection,
            data,
            hasMultipleRelations,
            i18n,
            relation
        });
    }, [
        collections,
        hasMultipleRelations,
        i18n
    ]);
    const loadRelationOptions = React.useCallback(async ({ abortController, relationSlug })=>{
        const collection = collections.find((coll)=>coll.slug === relationSlug);
        const fieldToSearch = collection?.admin?.useAsTitle || 'id';
        const pageIndex = nextPageByRelationshipRef.current.get(relationSlug);
        if (partiallyLoadedRelationshipSlugs.current.includes(relationSlug)) {
            const query = {
                depth: 0,
                limit: maxResultsPerRequest,
                page: pageIndex,
                where: {
                    and: []
                }
            };
            if (debouncedSearch) {
                query.where.and.push({
                    [fieldToSearch]: {
                        like: debouncedSearch
                    }
                });
            }
            try {
                const response = await fetch(`${serverURL}${api}/${relationSlug}${qs.stringify(query, {
                    addQueryPrefix: true
                })}`, {
                    credentials: 'include',
                    headers: {
                        'Accept-Language': i18n.language
                    },
                    signal: abortController.signal
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.docs.length > 0) {
                        addOptions(data, relationSlug);
                        if (!debouncedSearch) {
                            if (data.nextPage) {
                                nextPageByRelationshipRef.current.set(relationSlug, data.nextPage);
                            } else {
                                partiallyLoadedRelationshipSlugs.current = partiallyLoadedRelationshipSlugs.current.filter((partiallyLoadedRelation)=>partiallyLoadedRelation !== relationSlug);
                            }
                        }
                    }
                } else {
                    setErrorLoading(t('error:unspecific'));
                }
            } catch (e) {
                if (!abortController.signal.aborted) {
                    console.error(e);
                }
            }
        }
        setHasLoadedFirstOptions(true);
    }, [
        addOptions,
        api,
        collections,
        debouncedSearch,
        i18n.language,
        serverURL,
        t
    ]);
    const loadMoreOptions = React.useCallback(()=>{
        if (partiallyLoadedRelationshipSlugs.current.length > 0) {
            const abortController = new AbortController();
            void loadRelationOptions({
                abortController,
                relationSlug: partiallyLoadedRelationshipSlugs.current[0]
            });
        }
    }, [
        loadRelationOptions
    ]);
    const findOptionsByValue = useCallback(()=>{
        if (value) {
            if (hasMany) {
                if (Array.isArray(value)) {
                    return value.map((val)=>{
                        if (hasMultipleRelations) {
                            let matchedOption;
                            options.forEach((opt)=>{
                                if (opt.options) {
                                    opt.options.some((subOpt)=>{
                                        if (subOpt?.value === val.value) {
                                            matchedOption = subOpt;
                                            return true;
                                        }
                                        return false;
                                    });
                                }
                            });
                            return matchedOption;
                        }
                        return options.find((opt)=>opt.value === val);
                    });
                }
                return undefined;
            }
            if (hasMultipleRelations) {
                let matchedOption;
                const valueWithRelation = value;
                options.forEach((opt)=>{
                    if (opt?.options) {
                        opt.options.some((subOpt)=>{
                            if (subOpt?.value === valueWithRelation.value) {
                                matchedOption = subOpt;
                                return true;
                            }
                            return false;
                        });
                    }
                });
                return matchedOption;
            }
            return options.find((opt)=>opt.value === value);
        }
        return undefined;
    }, [
        hasMany,
        hasMultipleRelations,
        value,
        options
    ]);
    const handleInputChange = useCallback((newSearch)=>{
        if (search !== newSearch) {
            setSearch(newSearch);
        }
    }, [
        search
    ]);
    const addOptionByID = useCallback(async (id, relation)=>{
        if (!errorLoading && id !== 'null' && id && relation) {
            const response = await fetch(`${serverURL}${api}/${relation}/${id}?depth=0`, {
                credentials: 'include',
                headers: {
                    'Accept-Language': i18n.language
                }
            });
            if (response.ok) {
                const data = await response.json();
                addOptions({
                    docs: [
                        data
                    ]
                }, relation);
            } else {
                // eslint-disable-next-line no-console
                console.error(t('error:loadingDocument', {
                    id
                }));
            }
        }
    }, [
        i18n,
        addOptions,
        api,
        errorLoading,
        serverURL,
        t
    ]);
    /**
   * 1. Trigger initial relationship options fetch
   * 2. When search changes, loadRelationOptions will
   *    fire off again
   */ useEffect(()=>{
        const relations = Array.isArray(relationTo) ? relationTo : [
            relationTo
        ];
        const abortControllers = [];
        relations.forEach((relation)=>{
            const abortController = new AbortController();
            void loadRelationOptions({
                abortController,
                relationSlug: relation
            });
            abortControllers.push(abortController);
        });
        return ()=>{
            abortControllers.forEach((controller)=>{
                if (controller.signal) controller.abort();
            });
        };
    }, [
        i18n,
        loadRelationOptions,
        relationTo
    ]);
    /**
   * Load any options that were not returned
   * in the first 10 of each relation fetch
   */ useEffect(()=>{
        if (value && hasLoadedFirstOptions) {
            if (hasMany) {
                const matchedOptions = findOptionsByValue();
                (matchedOptions || []).forEach((option, i)=>{
                    if (!option) {
                        if (hasMultipleRelations) {
                            void addOptionByID(value[i].value, value[i].relationTo);
                        } else {
                            void addOptionByID(value[i], relationTo);
                        }
                    }
                });
            } else {
                const matchedOption = findOptionsByValue();
                if (!matchedOption) {
                    if (hasMultipleRelations) {
                        const valueWithRelation = value;
                        void addOptionByID(valueWithRelation.value, valueWithRelation.relationTo);
                    } else {
                        void addOptionByID(value, relationTo);
                    }
                }
            }
        }
    }, [
        addOptionByID,
        findOptionsByValue,
        hasMany,
        hasMultipleRelations,
        relationTo,
        value,
        hasLoadedFirstOptions
    ]);
    const classes = [
        'field-type',
        baseClass,
        errorLoading && 'error-loading'
    ].filter(Boolean).join(' ');
    const valueToRender = findOptionsByValue() || value;
    return /*#__PURE__*/ _jsxs("div", {
        className: classes,
        children: [
            !errorLoading && /*#__PURE__*/ _jsx(ReactSelect, {
                disabled: disabled,
                isMulti: hasMany,
                isSortable: isSortable,
                onChange: (selected)=>{
                    if (!selected) {
                        onChange(null);
                        return;
                    }
                    if (hasMany && Array.isArray(selected)) {
                        onChange(selected ? selected.map((option)=>{
                            if (hasMultipleRelations) {
                                return {
                                    relationTo: option?.relationTo,
                                    value: option?.value
                                };
                            }
                            return option?.value;
                        }) : null);
                    } else if (hasMultipleRelations && !Array.isArray(selected)) {
                        onChange({
                            relationTo: selected?.relationTo,
                            value: selected?.value
                        });
                    } else if (!Array.isArray(selected)) {
                        onChange(selected?.value);
                    }
                },
                onInputChange: handleInputChange,
                onMenuScrollToBottom: loadMoreOptions,
                options: options,
                placeholder: t('general:selectValue'),
                value: valueToRender
            }),
            errorLoading && /*#__PURE__*/ _jsx("div", {
                className: `${baseClass}__error-loading`,
                children: errorLoading
            })
        ]
    });
};

//# sourceMappingURL=index.js.map