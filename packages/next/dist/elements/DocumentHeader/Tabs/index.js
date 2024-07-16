import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { isPlainObject } from 'payload';
import React from 'react';
import { ShouldRenderTabs } from './ShouldRenderTabs.js';
import { DocumentTab } from './Tab/index.js';
import { getCustomViews } from './getCustomViews.js';
import { getViewConfig } from './getViewConfig.js';
import { tabs as defaultTabs } from './tabs/index.js';
const baseClass = 'doc-tabs';
export const DocumentTabs = (props)=>{
    const { collectionConfig, config, globalConfig, permissions } = props;
    const customViews = getCustomViews({
        collectionConfig,
        globalConfig
    });
    return /*#__PURE__*/ _jsx(ShouldRenderTabs, {
        children: /*#__PURE__*/ _jsx("div", {
            className: baseClass,
            children: /*#__PURE__*/ _jsx("div", {
                className: `${baseClass}__tabs-container`,
                children: /*#__PURE__*/ _jsxs("ul", {
                    className: `${baseClass}__tabs`,
                    children: [
                        Object.entries(defaultTabs)?.sort(([, a], [, b])=>{
                            if (a.order === undefined && b.order === undefined) return 0;
                            else if (a.order === undefined) return 1;
                            else if (b.order === undefined) return -1;
                            return a.order - b.order;
                        })?.map(([name, tab], index)=>{
                            const viewConfig = getViewConfig({
                                name,
                                collectionConfig,
                                globalConfig
                            });
                            const tabFromConfig = viewConfig && 'Tab' in viewConfig ? viewConfig.Tab : undefined;
                            const tabConfig = typeof tabFromConfig === 'object' ? tabFromConfig : undefined;
                            const { condition } = tabConfig || {};
                            const meetsCondition = !condition || condition && Boolean(condition({
                                collectionConfig,
                                config,
                                globalConfig,
                                permissions
                            }));
                            if (meetsCondition) {
                                return /*#__PURE__*/ _jsx(DocumentTab, {
                                    ...props,
                                    ...tab || {},
                                    ...tabFromConfig || {}
                                }, `tab-${index}`);
                            }
                            return null;
                        }),
                        customViews?.map((CustomView, index)=>{
                            if ('Tab' in CustomView) {
                                const { Tab, path } = CustomView;
                                if (typeof Tab === 'object' && !isPlainObject(Tab)) {
                                    throw new Error(`Custom 'Tab' Component for path: "${path}" must be a React Server Component. To use client-side functionality, render your Client Component within a Server Component and pass it only props that are serializable. More info: https://react.dev/reference/react/use-server#serializable-parameters-and-return-values`);
                                }
                                if (typeof Tab === 'function') {
                                    return /*#__PURE__*/ _createElement(Tab, {
                                        path: path,
                                        ...props,
                                        key: `tab-custom-${index}`
                                    });
                                }
                                return /*#__PURE__*/ _jsx(DocumentTab, {
                                    ...props,
                                    ...Tab
                                }, `tab-custom-${index}`);
                            }
                            return null;
                        })
                    ]
                })
            })
        })
    });
};

//# sourceMappingURL=index.js.map