// eslint-disable-next-line payload/no-imports-from-exports-dir
import { FixedToolbarFeatureClient } from '../../../exports/client/index.js';
import { createServerFeature } from '../../../utilities/createServerFeature.js';
export const FixedToolbarFeature = createServerFeature({
    feature: ({ props })=>{
        const sanitizedProps = {
            applyToFocusedEditor: props?.applyToFocusedEditor === undefined ? false : props.applyToFocusedEditor,
            disableIfParentHasFixedToolbar: props?.disableIfParentHasFixedToolbar === undefined ? false : props.disableIfParentHasFixedToolbar
        };
        return {
            ClientFeature: FixedToolbarFeatureClient,
            clientFeatureProps: sanitizedProps,
            sanitizedServerFeatureProps: sanitizedProps
        };
    },
    key: 'toolbarFixed'
});

//# sourceMappingURL=feature.server.js.map