import { withMergedProps } from '@payloadcms/ui/shared';
import { MetaDescriptionComponent } from './MetaDescriptionComponent.js';
export const MetaDescriptionField = ({ hasGenerateFn = false, overrides })=>{
    return {
        name: 'description',
        type: 'textarea',
        admin: {
            components: {
                Field: withMergedProps({
                    Component: MetaDescriptionComponent,
                    sanitizeServerOnlyProps: true,
                    toMergeIntoProps: {
                        hasGenerateDescriptionFn: hasGenerateFn
                    }
                })
            }
        },
        localized: true,
        ...overrides ?? {}
    };
};

//# sourceMappingURL=index.js.map