import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Gutter, RenderTitle } from '@payloadcms/ui';
import React, { Fragment } from 'react';
import { DocumentTabs } from './Tabs/index.js';
const baseClass = `doc-header`;
export const DocumentHeader = (props)=>{
    const { collectionConfig, config, customHeader, globalConfig, hideTabs, i18n, permissions } = props;
    return /*#__PURE__*/ _jsxs(Gutter, {
        className: baseClass,
        children: [
            customHeader && customHeader,
            !customHeader && /*#__PURE__*/ _jsxs(Fragment, {
                children: [
                    /*#__PURE__*/ _jsx(RenderTitle, {
                        className: `${baseClass}__title`
                    }),
                    !hideTabs && /*#__PURE__*/ _jsx(DocumentTabs, {
                        collectionConfig: collectionConfig,
                        config: config,
                        globalConfig: globalConfig,
                        i18n: i18n,
                        permissions: permissions
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=index.js.map