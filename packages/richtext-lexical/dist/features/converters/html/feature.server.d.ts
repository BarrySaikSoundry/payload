import type { HTMLConverter } from './converter/types.js';
export type HTMLConverterFeatureProps = {
    converters?: (({ defaultConverters }: {
        defaultConverters: HTMLConverter[];
    }) => HTMLConverter[]) | HTMLConverter[];
};
export declare const HTMLConverterFeature: import("../../typesServer.js").FeatureProviderProviderServer<HTMLConverterFeatureProps, HTMLConverterFeatureProps, undefined>;
//# sourceMappingURL=feature.server.d.ts.map