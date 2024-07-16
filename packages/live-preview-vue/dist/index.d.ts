import type { Ref } from 'vue';
/**
 * Vue composable to implement Payload CMS Live Preview.
 *
 * {@link https://payloadcms.com/docs/live-preview/frontend View the documentation}
 */
export declare const useLivePreview: <T>(props: {
    apiRoute?: string;
    depth?: number;
    initialData: T;
    serverURL: string;
}) => {
    data: Ref<T>;
    isLoading: Ref<boolean>;
};
//# sourceMappingURL=index.d.ts.map