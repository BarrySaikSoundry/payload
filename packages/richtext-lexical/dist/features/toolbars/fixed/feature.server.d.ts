export type FixedToolbarFeatureProps = {
    /**
     * @default false
     *
     * If this is enabled, the toolbar will apply to the focused editor, not the editor with the FixedToolbarFeature.
     *
     * This means that if the editor has a child-editor, and the child-editor is focused, the toolbar will apply to the child-editor, not the parent editor with this feature added.
     */
    applyToFocusedEditor?: boolean;
    /**
     * @default false
     *
     * If there is a parent editor with a fixed toolbar, this will disable the toolbar for this editor.
     */
    disableIfParentHasFixedToolbar?: boolean;
};
export declare const FixedToolbarFeature: import("../../typesServer.js").FeatureProviderProviderServer<FixedToolbarFeatureProps, FixedToolbarFeatureProps, FixedToolbarFeatureProps>;
//# sourceMappingURL=feature.server.d.ts.map