import type { LexicalPluginNodeConverterProvider } from './converter/types.js';
export type LexicalPluginToLexicalFeatureProps = {
    converters?: (({ defaultConverters, }: {
        defaultConverters: LexicalPluginNodeConverterProvider[];
    }) => LexicalPluginNodeConverterProvider[]) | LexicalPluginNodeConverterProvider[];
};
export declare const LexicalPluginToLexicalFeature: import("../../typesServer.js").FeatureProviderProviderServer<LexicalPluginToLexicalFeatureProps, LexicalPluginToLexicalFeatureProps, undefined>;
//# sourceMappingURL=feature.server.d.ts.map