import { withMergedProps } from '@payloadcms/ui/shared';
import { MetaTitleComponent } from './MetaTitleComponent.js';
export const MetaTitleField = ({ hasGenerateFn = false, overrides })=>{
    return {
        name: 'title',
        type: 'text',
        admin: {
            components: {
                Field: withMergedProps({
                    Component: MetaTitleComponent,
                    sanitizeServerOnlyProps: true,
                    toMergeIntoProps: {
                        hasGenerateTitleFn: hasGenerateFn
                    }
                })
            }
        },
        localized: true,
        ...overrides ?? {}
    };
};

//# sourceMappingURL=index.js.map