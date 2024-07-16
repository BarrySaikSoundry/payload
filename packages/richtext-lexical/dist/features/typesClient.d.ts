import type { Transformer } from '@lexical/markdown';
import type { Klass, LexicalEditor, LexicalNode, LexicalNodeReplacement, SerializedEditorState } from 'lexical';
import type React from 'react';
import type { ClientEditorConfig } from '../lexical/config/types.js';
import type { SlashMenuGroup } from '../lexical/plugins/SlashMenu/LexicalTypeaheadMenuPlugin/types.js';
import type { ToolbarGroup } from './toolbars/types.js';
export type FeatureProviderProviderClient<UnSanitizedClientFeatureProps = undefined, ClientFeatureProps = UnSanitizedClientFeatureProps> = (props: ClientComponentProps<ClientFeatureProps>) => FeatureProviderClient<ClientFeatureProps>;
/**
 * No dependencies => Features need to be sorted on the server first, then sent to client in right order
 */
export type FeatureProviderClient<UnSanitizedClientFeatureProps = undefined, ClientFeatureProps = UnSanitizedClientFeatureProps> = {
    /**
     * Return props, to make it easy to retrieve passed in props to this Feature for the client if anyone wants to
     */
    clientFeatureProps: ClientComponentProps<UnSanitizedClientFeatureProps>;
    feature: ((props: {
        clientFunctions: Record<string, any>;
        /** unSanitizedEditorConfig.features, but mapped */
        featureProviderMap: ClientFeatureProviderMap;
        resolvedFeatures: ResolvedClientFeatureMap;
        unSanitizedEditorConfig: ClientEditorConfig;
    }) => ClientFeature<ClientFeatureProps>) | ClientFeature<ClientFeatureProps>;
};
export type PluginComponent<ClientFeatureProps = any> = React.FC<{
    clientProps: ClientFeatureProps;
}>;
export type PluginComponentWithAnchor<ClientFeatureProps = any> = React.FC<{
    anchorElem: HTMLElement;
    clientProps: ClientFeatureProps;
}>;
export type ClientFeature<ClientFeatureProps> = {
    hooks?: {
        load?: ({ incomingEditorState, }: {
            incomingEditorState: SerializedEditorState;
        }) => SerializedEditorState;
        save?: ({ incomingEditorState, }: {
            incomingEditorState: SerializedEditorState;
        }) => SerializedEditorState;
    };
    markdownTransformers?: Transformer[];
    nodes?: Array<Klass<LexicalNode> | LexicalNodeReplacement>;
    /**
     * Plugins are react components which get added to the editor. You can use them to interact with lexical, e.g. to create a command which creates a node, or opens a modal, or some other more "outside" functionality
     */
    plugins?: Array<{
        Component: PluginComponent<ClientFeatureProps>;
        position: 'aboveContainer';
    } | {
        Component: PluginComponent<ClientFeatureProps>;
        position: 'bottom';
    } | {
        Component: PluginComponent<ClientFeatureProps>;
        position: 'normal';
    } | {
        Component: PluginComponent<ClientFeatureProps>;
        position: 'top';
    } | {
        Component: PluginComponentWithAnchor<ClientFeatureProps>;
        position: 'floatingAnchorElem';
    } | {
        Component: PluginComponent<ClientFeatureProps>;
        position: 'belowContainer';
    }>;
    /**
     * Client Features can register their own providers, which will be nested below the EditorConfigProvider
     */
    providers?: Array<React.FC>;
    /**
     * Return props, to make it easy to retrieve passed in props to this Feature for the client if anyone wants to
     */
    sanitizedClientFeatureProps?: ClientComponentProps<ClientFeatureProps>;
    slashMenu?: {
        /**
         * Dynamic groups allow you to add different groups depending on the query string (so, the text after the slash).
         * Thus, to re-calculate the available groups, this function will be called every time you type after the /.
         *
         * The groups provided by dynamicGroups will be merged with the static groups provided by the groups property.
         */
        dynamicGroups?: ({ editor, queryString, }: {
            editor: LexicalEditor;
            queryString: string;
        }) => SlashMenuGroup[];
        /**
         * Static array of groups together with the items in them. These will always be present.
         * While typing after the /, they will be filtered by the query string and the keywords, key and display name of the items.
         */
        groups?: SlashMenuGroup[];
    };
    /**
     * An opt-in, classic fixed toolbar which stays at the top of the editor
     */
    toolbarFixed?: {
        groups: ToolbarGroup[];
    };
    /**
     * The default, floating toolbar which appears when you select text.
     */
    toolbarInline?: {
        /**
         * Array of toolbar groups / sections. Each section can contain multiple toolbar items.
         */
        groups: ToolbarGroup[];
    };
};
export type ClientComponentProps<ClientFeatureProps> = ClientFeatureProps extends undefined ? {
    featureKey: string;
    order: number;
} : {
    featureKey: string;
    order: number;
} & ClientFeatureProps;
export type ResolvedClientFeature<ClientFeatureProps> = {
    key: string;
    order: number;
} & ClientFeature<ClientFeatureProps>;
export type ResolvedClientFeatureMap = Map<string, ResolvedClientFeature<any>>;
export type ClientFeatureProviderMap = Map<string, FeatureProviderClient<any, any>>;
/**
 * Plugins are react components which get added to the editor. You can use them to interact with lexical, e.g. to create a command which creates a node, or opens a modal, or some other more "outside" functionality
 */
export type SanitizedPlugin = {
    Component: PluginComponent;
    clientProps: any;
    key: string;
    position: 'bottom';
} | {
    Component: PluginComponent;
    clientProps: any;
    key: string;
    position: 'normal';
} | {
    Component: PluginComponent;
    clientProps: any;
    key: string;
    position: 'top';
} | {
    Component: PluginComponentWithAnchor;
    clientProps: any;
    desktopOnly?: boolean;
    key: string;
    position: 'floatingAnchorElem';
} | {
    Component: PluginComponent;
    clientProps: any;
    key: string;
    position: 'aboveContainer';
} | {
    Component: PluginComponent;
    clientProps: any;
    key: string;
    position: 'belowContainer';
};
export type SanitizedClientFeatures = {
    /** The keys of all enabled features */
    enabledFeatures: string[];
    hooks: {
        load: Array<({ incomingEditorState, }: {
            incomingEditorState: SerializedEditorState;
        }) => SerializedEditorState>;
        save: Array<({ incomingEditorState, }: {
            incomingEditorState: SerializedEditorState;
        }) => SerializedEditorState>;
    };
    /**
     * Plugins are react components which get added to the editor. You can use them to interact with lexical, e.g. to create a command which creates a node, or opens a modal, or some other more "outside" functionality
     */
    plugins?: Array<SanitizedPlugin>;
    slashMenu: {
        /**
         * Dynamic groups allow you to add different groups depending on the query string (so, the text after the slash).
         * Thus, to re-calculate the available groups, this function will be called every time you type after the /.
         *
         * The groups provided by dynamicGroups will be merged with the static groups provided by the groups property.
         */
        dynamicGroups: Array<({ editor, queryString }: {
            editor: LexicalEditor;
            queryString: string;
        }) => SlashMenuGroup[]>;
        /**
         * Static array of groups together with the items in them. These will always be present.
         * While typing after the /, they will be filtered by the query string and the keywords, key and display name of the items.
         */
        groups: SlashMenuGroup[];
    };
} & Required<Pick<ResolvedClientFeature<unknown>, 'markdownTransformers' | 'nodes' | 'providers' | 'toolbarFixed' | 'toolbarInline'>>;
//# sourceMappingURL=typesClient.d.ts.map