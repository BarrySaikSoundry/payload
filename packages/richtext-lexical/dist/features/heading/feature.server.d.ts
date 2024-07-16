import type { SerializedHeadingNode as _SerializedHeadingNode, HeadingTagType } from '@lexical/rich-text';
import type { Spread } from 'lexical';
export type SerializedHeadingNode = Spread<{
    type: 'heading';
}, _SerializedHeadingNode>;
export type HeadingFeatureProps = {
    enabledHeadingSizes?: HeadingTagType[];
};
export declare const HeadingFeature: import("../typesServer.js").FeatureProviderProviderServer<HeadingFeatureProps, HeadingFeatureProps, HeadingFeatureProps>;
//# sourceMappingURL=feature.server.d.ts.map