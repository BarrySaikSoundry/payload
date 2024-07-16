import type { SlateNodeConverterProvider } from './converter/types.js';
export type SlateToLexicalFeatureProps = {
    converters?: (({ defaultConverters, }: {
        defaultConverters: SlateNodeConverterProvider[];
    }) => SlateNodeConverterProvider[]) | SlateNodeConverterProvider[];
};
export declare const SlateToLexicalFeature: import("../../typesServer.js").FeatureProviderProviderServer<SlateToLexicalFeatureProps, {
    converters?: SlateNodeConverterProvider[];
}, undefined>;
//# sourceMappingURL=feature.server.d.ts.map