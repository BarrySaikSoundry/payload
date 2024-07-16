import { withMergedProps } from '@payloadcms/ui/shared';
import { OverviewComponent } from './OverviewComponent.js';
export const OverviewField = ({ descriptionPath, imagePath, overrides, titlePath })=>{
    return {
        name: 'overview',
        type: 'ui',
        admin: {
            components: {
                Field: withMergedProps({
                    Component: OverviewComponent,
                    sanitizeServerOnlyProps: true,
                    toMergeIntoProps: {
                        descriptionPath,
                        imagePath,
                        titlePath
                    }
                })
            }
        },
        label: 'Overview',
        ...overrides ?? {}
    };
};

//# sourceMappingURL=index.js.map