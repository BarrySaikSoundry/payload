import { jsx as _jsx } from "react/jsx-runtime";
import { isReactComponentOrFunction } from 'payload/shared';
import React from 'react';
// Need to import from client barrel file
// eslint-disable-next-line payload/no-imports-from-exports-dir
import { ViewDescription } from '../../../exports/client/index.js';
import { mapActions } from './actions.js';
import { mapFields } from './fields.js';
export const mapGlobals = ({ args })=>{
    const { DefaultEditView, WithServerSideProps, config, globals, i18n, i18n: { t }, readOnly: readOnlyOverride } = args;
    return globals.reduce((acc, globalConfig)=>{
        const { slug, fields } = globalConfig;
        const editViewFromConfig = globalConfig?.admin?.components?.views?.Edit;
        const SaveButton = globalConfig?.admin?.components?.elements?.SaveButton;
        const SaveButtonComponent = SaveButton ? /*#__PURE__*/ _jsx(WithServerSideProps, {
            Component: SaveButton
        }) : undefined;
        const SaveDraftButton = globalConfig?.admin?.components?.elements?.SaveDraftButton;
        const SaveDraftButtonComponent = SaveDraftButton ? /*#__PURE__*/ _jsx(WithServerSideProps, {
            Component: SaveDraftButton
        }) : undefined;
        const PreviewButton = globalConfig?.admin?.components?.elements?.PreviewButton;
        const PreviewButtonComponent = PreviewButton ? /*#__PURE__*/ _jsx(WithServerSideProps, {
            Component: PreviewButton
        }) : undefined;
        const PublishButton = globalConfig?.admin?.components?.elements?.PublishButton;
        const PublishButtonComponent = PublishButton ? /*#__PURE__*/ _jsx(WithServerSideProps, {
            Component: PublishButton
        }) : undefined;
        const CustomEditView = typeof editViewFromConfig === 'function' ? editViewFromConfig : typeof editViewFromConfig === 'object' && isReactComponentOrFunction(editViewFromConfig.Default) ? editViewFromConfig.Default : typeof editViewFromConfig?.Default === 'object' && 'Component' in editViewFromConfig.Default && isReactComponentOrFunction(editViewFromConfig.Default.Component) ? editViewFromConfig.Default.Component : undefined;
        const Edit = CustomEditView || DefaultEditView;
        let description = undefined;
        if (globalConfig.admin && 'description' in globalConfig.admin) {
            if (typeof globalConfig.admin?.description === 'string' || typeof globalConfig.admin?.description === 'object') {
                description = globalConfig.admin.description;
            } else if (typeof globalConfig.admin?.description === 'function') {
                description = globalConfig.admin?.description({
                    t
                });
            }
        }
        const descriptionProps = {
            description
        };
        const DescriptionComponent = globalConfig.admin?.components?.elements?.Description || (description ? ViewDescription : undefined);
        const Description = DescriptionComponent !== undefined ? /*#__PURE__*/ _jsx(WithServerSideProps, {
            Component: DescriptionComponent,
            ...descriptionProps || {}
        }) : undefined;
        const componentMap = {
            Description,
            Edit: /*#__PURE__*/ _jsx(Edit, {
                globalSlug: globalConfig.slug
            }),
            PreviewButton: PreviewButtonComponent,
            PublishButton: PublishButtonComponent,
            SaveButton: SaveButtonComponent,
            SaveDraftButton: SaveDraftButtonComponent,
            Upload: null,
            actionsMap: mapActions({
                WithServerSideProps,
                globalConfig
            }),
            fieldMap: mapFields({
                WithServerSideProps,
                config,
                fieldSchema: fields,
                i18n,
                readOnly: readOnlyOverride
            }),
            isPreviewEnabled: !!globalConfig?.admin?.preview
        };
        return {
            ...acc,
            [slug]: componentMap
        };
    }, {});
};

//# sourceMappingURL=globals.js.map