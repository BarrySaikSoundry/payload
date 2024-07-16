'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useWindowInfo } from '@faceless-ui/window-info';
import { getTranslation } from '@payloadcms/translations';
import React, { useEffect, useRef, useState } from 'react';
import AnimateHeightImport from 'react-animate-height';
const AnimateHeight = AnimateHeightImport.default || AnimateHeightImport;
import { useUseTitleField } from '../../hooks/useUseAsTitle.js';
import { ChevronIcon } from '../../icons/Chevron/index.js';
import { useListQuery } from '../../providers/ListQuery/index.js';
import { useSearchParams } from '../../providers/SearchParams/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { ColumnSelector } from '../ColumnSelector/index.js';
import { DeleteMany } from '../DeleteMany/index.js';
import { EditMany } from '../EditMany/index.js';
import { Pill } from '../Pill/index.js';
import { PublishMany } from '../PublishMany/index.js';
import { SearchFilter } from '../SearchFilter/index.js';
import { UnpublishMany } from '../UnpublishMany/index.js';
import { WhereBuilder } from '../WhereBuilder/index.js';
import validateWhereQuery from '../WhereBuilder/validateWhereQuery.js';
import { getTextFieldsToBeSearched } from './getTextFieldsToBeSearched.js';
import './index.scss';
const baseClass = 'list-controls';
/**
 * The ListControls component is used to render the controls (search, filter, where)
 * for a collection's list view. You can find those directly above the table which lists
 * the collection's documents.
 */ export const ListControls = (props)=>{
    const { collectionConfig, enableColumns = true, enableSort = false, fieldMap } = props;
    const { handleSearchChange } = useListQuery();
    const { searchParams } = useSearchParams();
    const titleField = useUseTitleField(collectionConfig, fieldMap);
    const { i18n, t } = useTranslation();
    const { breakpoints: { s: smallBreak } } = useWindowInfo();
    const hasWhereParam = useRef(Boolean(searchParams?.where));
    const shouldInitializeWhereOpened = validateWhereQuery(searchParams?.where);
    const [visibleDrawer, setVisibleDrawer] = useState(shouldInitializeWhereOpened ? 'where' : undefined);
    useEffect(()=>{
        if (hasWhereParam.current && !searchParams?.where) {
            setVisibleDrawer(undefined);
            hasWhereParam.current = false;
        } else if (searchParams?.where) {
            hasWhereParam.current = true;
        }
    }, [
        setVisibleDrawer,
        searchParams?.where
    ]);
    return /*#__PURE__*/ _jsxs("div", {
        className: baseClass,
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: `${baseClass}__wrap`,
                children: [
                    /*#__PURE__*/ _jsx(SearchFilter, {
                        fieldLabel: (titleField && getTranslation('label' in titleField.fieldComponentProps && typeof titleField.fieldComponentProps.label === 'string' ? titleField.fieldComponentProps.label : titleField.name, i18n)) ?? undefined,
                        fieldName: titleField?.name,
                        handleChange: handleSearchChange,
                        listSearchableFields: getTextFieldsToBeSearched(collectionConfig.admin.listSearchableFields, fieldMap)
                    }),
                    /*#__PURE__*/ _jsx("div", {
                        className: `${baseClass}__buttons`,
                        children: /*#__PURE__*/ _jsxs("div", {
                            className: `${baseClass}__buttons-wrap`,
                            children: [
                                !smallBreak && /*#__PURE__*/ _jsxs(React.Fragment, {
                                    children: [
                                        /*#__PURE__*/ _jsx(EditMany, {
                                            collection: collectionConfig,
                                            fieldMap: fieldMap
                                        }),
                                        /*#__PURE__*/ _jsx(PublishMany, {
                                            collection: collectionConfig
                                        }),
                                        /*#__PURE__*/ _jsx(UnpublishMany, {
                                            collection: collectionConfig
                                        }),
                                        /*#__PURE__*/ _jsx(DeleteMany, {
                                            collection: collectionConfig
                                        })
                                    ]
                                }),
                                enableColumns && /*#__PURE__*/ _jsx(Pill, {
                                    "aria-controls": `${baseClass}-columns`,
                                    "aria-expanded": visibleDrawer === 'columns',
                                    className: `${baseClass}__toggle-columns ${visibleDrawer === 'columns' ? `${baseClass}__buttons-active` : ''}`,
                                    icon: /*#__PURE__*/ _jsx(ChevronIcon, {}),
                                    onClick: ()=>setVisibleDrawer(visibleDrawer !== 'columns' ? 'columns' : undefined),
                                    pillStyle: "light",
                                    children: t('general:columns')
                                }),
                                /*#__PURE__*/ _jsx(Pill, {
                                    "aria-controls": `${baseClass}-where`,
                                    "aria-expanded": visibleDrawer === 'where',
                                    className: `${baseClass}__toggle-where ${visibleDrawer === 'where' ? `${baseClass}__buttons-active` : ''}`,
                                    icon: /*#__PURE__*/ _jsx(ChevronIcon, {}),
                                    onClick: ()=>setVisibleDrawer(visibleDrawer !== 'where' ? 'where' : undefined),
                                    pillStyle: "light",
                                    children: t('general:filters')
                                }),
                                enableSort && /*#__PURE__*/ _jsx(Pill, {
                                    "aria-controls": `${baseClass}-sort`,
                                    "aria-expanded": visibleDrawer === 'sort',
                                    className: `${baseClass}__toggle-sort`,
                                    icon: /*#__PURE__*/ _jsx(ChevronIcon, {}),
                                    onClick: ()=>setVisibleDrawer(visibleDrawer !== 'sort' ? 'sort' : undefined),
                                    pillStyle: "light",
                                    children: t('general:sort')
                                })
                            ]
                        })
                    })
                ]
            }),
            enableColumns && /*#__PURE__*/ _jsx(AnimateHeight, {
                className: `${baseClass}__columns`,
                height: visibleDrawer === 'columns' ? 'auto' : 0,
                id: `${baseClass}-columns`,
                children: /*#__PURE__*/ _jsx(ColumnSelector, {
                    collectionSlug: collectionConfig.slug
                })
            }),
            /*#__PURE__*/ _jsx(AnimateHeight, {
                className: `${baseClass}__where`,
                height: visibleDrawer === 'where' ? 'auto' : 0,
                id: `${baseClass}-where`,
                children: /*#__PURE__*/ _jsx(WhereBuilder, {
                    collectionPluralLabel: collectionConfig?.labels?.plural,
                    collectionSlug: collectionConfig.slug,
                    fieldMap: fieldMap
                }, String(hasWhereParam.current && !searchParams?.where))
            }),
            enableSort && /*#__PURE__*/ _jsx(AnimateHeight, {
                className: `${baseClass}__sort`,
                height: visibleDrawer === 'sort' ? 'auto' : 0,
                id: `${baseClass}-sort`,
                children: /*#__PURE__*/ _jsx("p", {
                    children: "Sort Complex"
                })
            })
        ]
    });
};

//# sourceMappingURL=index.js.map