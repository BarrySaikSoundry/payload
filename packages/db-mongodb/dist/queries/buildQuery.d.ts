import type { Field, Payload, Where } from 'payload';
type GetBuildQueryPluginArgs = {
    collectionSlug?: string;
    versionsFields?: Field[];
};
export type BuildQueryArgs = {
    globalSlug?: string;
    locale?: string;
    payload: Payload;
    where: Where;
};
declare const getBuildQueryPlugin: ({ collectionSlug, versionsFields }?: GetBuildQueryPluginArgs) => (schema: any) => void;
export default getBuildQueryPlugin;
//# sourceMappingURL=buildQuery.d.ts.map