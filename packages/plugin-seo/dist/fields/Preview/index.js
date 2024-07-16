import { withMergedProps } from '@payloadcms/ui/shared';
import { PreviewComponent } from './PreviewComponent.js';
export const PreviewField = ({ descriptionPath, hasGenerateFn = false, overrides, titlePath })=>{
    return {
        name: 'preview',
        type: 'ui',
        admin: {
            components: {
                Field: withMergedProps({
                    Component: PreviewComponent,
                    sanitizeServerOnlyProps: true,
                    toMergeIntoProps: {
                        descriptionPath,
                        hasGenerateURLFn: hasGenerateFn,
                        titlePath
                    }
                })
            }
        },
        label: 'Preview',
        ...overrides ?? {}
    };
};

//# sourceMappingURL=index.js.map