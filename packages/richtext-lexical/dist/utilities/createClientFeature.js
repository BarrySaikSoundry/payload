import { createClientComponent } from '../features/createClientComponent.js';
export const createClientFeature = (feature)=>{
    const featureProviderProvideClient = (props)=>{
        const featureProviderClient = {
            clientFeatureProps: props
        };
        if (typeof feature === 'function') {
            featureProviderClient.feature = ({ clientFunctions, featureProviderMap, resolvedFeatures, unSanitizedEditorConfig })=>{
                const toReturn = feature({
                    clientFunctions,
                    featureProviderMap,
                    props,
                    resolvedFeatures,
                    unSanitizedEditorConfig
                });
                if (toReturn.sanitizedClientFeatureProps === null) {
                    toReturn.sanitizedClientFeatureProps = props;
                }
                return toReturn;
            };
        } else {
            feature.sanitizedClientFeatureProps = props;
            featureProviderClient.feature = feature;
        }
        return featureProviderClient;
    };
    return createClientComponent(featureProviderProvideClient);
};

//# sourceMappingURL=createClientFeature.js.map