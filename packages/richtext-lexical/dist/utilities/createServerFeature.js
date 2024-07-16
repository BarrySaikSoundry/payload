export const createServerFeature = ({ dependencies, dependenciesPriority, dependenciesSoft, feature, key })=>{
    const featureProviderProviderServer = (props)=>{
        const featureProviderServer = {
            dependencies,
            dependenciesPriority,
            dependenciesSoft,
            key,
            serverFeatureProps: props
        };
        if (typeof feature === 'function') {
            featureProviderServer.feature = async ({ config, featureProviderMap, isRoot, resolvedFeatures, unSanitizedEditorConfig })=>{
                const toReturn = await feature({
                    config,
                    featureProviderMap,
                    isRoot,
                    props,
                    resolvedFeatures,
                    unSanitizedEditorConfig
                });
                if (toReturn.sanitizedServerFeatureProps === null) {
                    toReturn.sanitizedServerFeatureProps = props;
                }
                return toReturn;
            };
        } else {
            feature.sanitizedServerFeatureProps = props;
            featureProviderServer.feature = feature;
        }
        return featureProviderServer;
    };
    return featureProviderProviderServer;
};

//# sourceMappingURL=createServerFeature.js.map