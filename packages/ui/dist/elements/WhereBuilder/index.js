'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React, { useEffect, useState } from 'react';
import { useListQuery } from '../../providers/ListQuery/index.js';
import { useLocale } from '../../providers/Locale/index.js';
import { useSearchParams } from '../../providers/SearchParams/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { Button } from '../Button/index.js';
import { Condition } from './Condition/index.js';
import './index.scss';
import { reduceFieldMap } from './reduceFieldMap.js';
import { transformWhereQuery } from './transformWhereQuery.js';
import validateWhereQuery from './validateWhereQuery.js';
const baseClass = 'where-builder';
/**
 * The WhereBuilder component is used to render the filter controls for a collection's list view.
 * It is part of the {@link ListControls} component which is used to render the controls (search, filter, where).
 */ export const WhereBuilder = (props)=>{
    const { collectionPluralLabel, fieldMap } = props;
    const { i18n, t } = useTranslation();
    const { code: currentLocale } = useLocale();
    const [reducedFields, setReducedColumns] = useState(()=>reduceFieldMap({
            fieldMap,
            i18n
        }));
    useEffect(()=>{
        setReducedColumns(reduceFieldMap({
            fieldMap,
            i18n
        }));
    }, [
        fieldMap,
        i18n
    ]);
    const { searchParams } = useSearchParams();
    const { handleWhereChange } = useListQuery();
    const [shouldUpdateQuery, setShouldUpdateQuery] = React.useState(false);
    // This handles initializing the where conditions from the search query (URL). That way, if you pass in
    // query params to the URL, the where conditions will be initialized from those and displayed in the UI.
    // Example: /admin/collections/posts?where[or][0][and][0][text][equals]=example%20post
    /*
    stored conditions look like this:
    [
      _or_ & _and_ queries have the same shape:
      {
        and: [{
          category: {
            equals: 'category-a'
          }
        }]
      },

      {
        and:[{
          category: {
            equals: 'category-b'
          },
          text: {
            not_equals: 'oranges'
          },
        }]
      }
    ]
  */ const [conditions, setConditions] = React.useState(()=>{
        const whereFromSearch = searchParams.where;
        if (whereFromSearch) {
            if (validateWhereQuery(whereFromSearch)) {
                return whereFromSearch.or;
            }
            // Transform the where query to be in the right format. This will transform something simple like [text][equals]=example%20post to the right format
            const transformedWhere = transformWhereQuery(whereFromSearch);
            if (validateWhereQuery(transformedWhere)) {
                return transformedWhere.or;
            }
            console.warn(`Invalid where query in URL: ${JSON.stringify(whereFromSearch)}`);
        }
        return [];
    });
    const addCondition = React.useCallback(({ andIndex, fieldName, orIndex, relation })=>{
        const newConditions = [
            ...conditions
        ];
        if (relation === 'and') {
            newConditions[orIndex].and.splice(andIndex, 0, {
                [fieldName]: {}
            });
        } else {
            newConditions.push({
                and: [
                    {
                        [fieldName]: {}
                    }
                ]
            });
        }
        setConditions(newConditions);
    }, [
        conditions
    ]);
    const updateCondition = React.useCallback(({ andIndex, fieldName, operator, orIndex, value: valueArg })=>{
        const existingRowCondition = conditions[orIndex].and[andIndex];
        if (typeof existingRowCondition === 'object' && fieldName && operator) {
            const value = valueArg ?? (operator ? existingRowCondition[operator] : '');
            const newRowCondition = {
                [fieldName]: operator ? {
                    [operator]: value
                } : {}
            };
            if (JSON.stringify(existingRowCondition) !== JSON.stringify(newRowCondition)) {
                conditions[orIndex].and[andIndex] = newRowCondition;
                setConditions(conditions);
                if (![
                    null,
                    undefined
                ].includes(value)) {
                    // only update query when field/operator/value are filled out
                    setShouldUpdateQuery(true);
                }
            }
        }
    }, [
        conditions
    ]);
    const removeCondition = React.useCallback(({ andIndex, orIndex })=>{
        const newConditions = [
            ...conditions
        ];
        newConditions[orIndex].and.splice(andIndex, 1);
        if (newConditions[orIndex].and.length === 0) {
            newConditions.splice(orIndex, 1);
        }
        setConditions(newConditions);
        setShouldUpdateQuery(true);
    }, [
        conditions
    ]);
    React.useEffect(()=>{
        if (shouldUpdateQuery) {
            handleWhereChange({
                or: conditions
            });
            setShouldUpdateQuery(false);
        }
    }, [
        conditions,
        handleWhereChange,
        shouldUpdateQuery
    ]);
    return /*#__PURE__*/ _jsxs("div", {
        className: baseClass,
        children: [
            conditions.length > 0 && /*#__PURE__*/ _jsxs(React.Fragment, {
                children: [
                    /*#__PURE__*/ _jsx("div", {
                        className: `${baseClass}__label`,
                        children: t('general:filterWhere', {
                            label: getTranslation(collectionPluralLabel, i18n)
                        })
                    }),
                    /*#__PURE__*/ _jsx("ul", {
                        className: `${baseClass}__or-filters`,
                        children: conditions.map((or, orIndex)=>{
                            const compoundOrKey = `${orIndex}_${Array.isArray(or?.and) ? or.and.length : ''}`;
                            return /*#__PURE__*/ _jsxs("li", {
                                children: [
                                    orIndex !== 0 && /*#__PURE__*/ _jsx("div", {
                                        className: `${baseClass}__label`,
                                        children: t('general:or')
                                    }),
                                    /*#__PURE__*/ _jsx("ul", {
                                        className: `${baseClass}__and-filters`,
                                        children: Array.isArray(or?.and) && or.and.map((_, andIndex)=>{
                                            const initialFieldName = Object.keys(conditions[orIndex].and[andIndex])[0];
                                            const initialOperator = Object.keys(conditions[orIndex].and[andIndex]?.[initialFieldName] || {})?.[0] || undefined;
                                            const initialValue = conditions[orIndex].and[andIndex]?.[initialFieldName]?.[initialOperator] || '';
                                            return /*#__PURE__*/ _jsxs("li", {
                                                children: [
                                                    andIndex !== 0 && /*#__PURE__*/ _jsx("div", {
                                                        className: `${baseClass}__label`,
                                                        children: t('general:and')
                                                    }),
                                                    /*#__PURE__*/ _jsx(Condition, {
                                                        addCondition: addCondition,
                                                        andIndex: andIndex,
                                                        fieldName: initialFieldName,
                                                        fields: reducedFields,
                                                        initialValue: initialValue,
                                                        operator: initialOperator,
                                                        orIndex: orIndex,
                                                        removeCondition: removeCondition,
                                                        updateCondition: updateCondition
                                                    })
                                                ]
                                            }, andIndex);
                                        })
                                    })
                                ]
                            }, compoundOrKey);
                        })
                    }),
                    /*#__PURE__*/ _jsx(Button, {
                        buttonStyle: "icon-label",
                        className: `${baseClass}__add-or`,
                        icon: "plus",
                        iconPosition: "left",
                        iconStyle: "with-border",
                        onClick: ()=>{
                            addCondition({
                                andIndex: 0,
                                fieldName: reducedFields[0].value,
                                orIndex: conditions.length,
                                relation: 'or'
                            });
                        },
                        children: t('general:or')
                    })
                ]
            }),
            conditions.length === 0 && /*#__PURE__*/ _jsxs("div", {
                className: `${baseClass}__no-filters`,
                children: [
                    /*#__PURE__*/ _jsx("div", {
                        className: `${baseClass}__label`,
                        children: t('general:noFiltersSet')
                    }),
                    /*#__PURE__*/ _jsx(Button, {
                        buttonStyle: "icon-label",
                        className: `${baseClass}__add-first-filter`,
                        icon: "plus",
                        iconPosition: "left",
                        iconStyle: "with-border",
                        onClick: ()=>{
                            if (reducedFields.length > 0) {
                                addCondition({
                                    andIndex: 0,
                                    fieldName: reducedFields[0].value,
                                    orIndex: conditions.length,
                                    relation: 'or'
                                });
                            }
                        },
                        children: t('general:addFilter')
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=index.js.map