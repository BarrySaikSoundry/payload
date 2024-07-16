'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import { toKebabCase } from 'payload/shared';
import React, { useCallback, useEffect, useState } from 'react';
import { useCollapsible } from '../../elements/Collapsible/provider.js';
import { useFieldProps } from '../../forms/FieldPropsProvider/index.js';
import { RenderFields } from '../../forms/RenderFields/index.js';
import { withCondition } from '../../forms/withCondition/index.js';
import { useDocumentInfo } from '../../providers/DocumentInfo/index.js';
import { usePreferences } from '../../providers/Preferences/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { FieldDescription } from '../FieldDescription/index.js';
import { fieldBaseClass } from '../shared/index.js';
import { TabComponent } from './Tab/index.js';
import './index.scss';
import { TabsProvider } from './provider.js';
const baseClass = 'tabs-field';
export { TabsProvider };
const _TabsField = (props)=>{
    const { name, CustomDescription, className, descriptionProps, forceRender = false, path: pathFromProps, readOnly: readOnlyFromProps, tabs = [] } = props;
    const { indexPath, path: pathFromContext, readOnly: readOnlyFromContext, schemaPath, siblingPermissions } = useFieldProps();
    const readOnly = readOnlyFromProps || readOnlyFromContext;
    const path = pathFromContext ?? pathFromProps ?? name;
    const { getPreference, setPreference } = usePreferences();
    const { preferencesKey } = useDocumentInfo();
    const { i18n } = useTranslation();
    const { isWithinCollapsible } = useCollapsible();
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const tabsPrefKey = `tabs-${indexPath}`;
    useEffect(()=>{
        if (preferencesKey) {
            const getInitialPref = async ()=>{
                const existingPreferences = await getPreference(preferencesKey);
                const initialIndex = path ? existingPreferences?.fields?.[path]?.tabIndex : existingPreferences?.fields?.[tabsPrefKey]?.tabIndex;
                setActiveTabIndex(initialIndex || 0);
            };
            void getInitialPref();
        }
    }, [
        path,
        getPreference,
        preferencesKey,
        tabsPrefKey
    ]);
    const handleTabChange = useCallback(async (incomingTabIndex)=>{
        setActiveTabIndex(incomingTabIndex);
        const existingPreferences = await getPreference(preferencesKey);
        if (preferencesKey) {
            void setPreference(preferencesKey, {
                ...existingPreferences,
                ...path ? {
                    fields: {
                        ...existingPreferences?.fields || {},
                        [path]: {
                            ...existingPreferences?.fields?.[path],
                            tabIndex: incomingTabIndex
                        }
                    }
                } : {
                    fields: {
                        ...existingPreferences?.fields,
                        [tabsPrefKey]: {
                            ...existingPreferences?.fields?.[tabsPrefKey],
                            tabIndex: incomingTabIndex
                        }
                    }
                }
            });
        }
    }, [
        preferencesKey,
        getPreference,
        setPreference,
        path,
        tabsPrefKey
    ]);
    const activeTabConfig = tabs[activeTabIndex];
    function generateTabPath() {
        let tabPath = path;
        if (path && activeTabConfig.name) {
            tabPath = `${path}.${activeTabConfig.name}`;
        } else if (!path && activeTabConfig.name) {
            tabPath = activeTabConfig.name;
        }
        return tabPath;
    }
    return /*#__PURE__*/ _jsx("div", {
        className: [
            fieldBaseClass,
            className,
            baseClass,
            isWithinCollapsible && `${baseClass}--within-collapsible`
        ].filter(Boolean).join(' '),
        children: /*#__PURE__*/ _jsxs(TabsProvider, {
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: `${baseClass}__tabs-wrap`,
                    children: /*#__PURE__*/ _jsx("div", {
                        className: `${baseClass}__tabs`,
                        children: tabs.map((tab, tabIndex)=>{
                            return /*#__PURE__*/ _jsx(TabComponent, {
                                isActive: activeTabIndex === tabIndex,
                                parentPath: path,
                                setIsActive: ()=>handleTabChange(tabIndex),
                                tab: tab
                            }, tabIndex);
                        })
                    })
                }),
                /*#__PURE__*/ _jsx("div", {
                    className: `${baseClass}__content-wrap`,
                    children: activeTabConfig && /*#__PURE__*/ _jsx(React.Fragment, {
                        children: /*#__PURE__*/ _jsxs("div", {
                            className: [
                                `${baseClass}__tab`,
                                activeTabConfig.label && `${baseClass}__tabConfigLabel-${toKebabCase(getTranslation(activeTabConfig.label, i18n))}`
                            ].filter(Boolean).join(' '),
                            children: [
                                CustomDescription ? CustomDescription : /*#__PURE__*/ _jsx(FieldDescription, {
                                    ...descriptionProps || {}
                                }),
                                /*#__PURE__*/ _jsx(RenderFields, {
                                    fieldMap: activeTabConfig.fieldMap,
                                    forceRender: forceRender,
                                    margins: "small",
                                    path: generateTabPath(),
                                    permissions: 'name' in activeTabConfig && siblingPermissions?.[activeTabConfig.name]?.fields ? siblingPermissions[activeTabConfig.name]?.fields : siblingPermissions,
                                    readOnly: readOnly,
                                    schemaPath: `${schemaPath ? `${schemaPath}` : ''}${activeTabConfig.name ? `.${activeTabConfig.name}` : ''}`
                                }, activeTabConfig.label ? getTranslation(activeTabConfig.label, i18n) : activeTabConfig['name'])
                            ]
                        })
                    })
                })
            ]
        })
    });
};
export const TabsField = withCondition(_TabsField);

//# sourceMappingURL=index.js.map