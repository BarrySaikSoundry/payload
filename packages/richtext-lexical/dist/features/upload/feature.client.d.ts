export type UploadFeaturePropsClient = {
    collections: {
        [collection: string]: {
            hasExtraFields: boolean;
        };
    };
};
export declare const UploadFeatureClient: import("react").FC<{
    featureKey: string;
    order: number;
} & UploadFeaturePropsClient>;
//# sourceMappingURL=feature.client.d.ts.map