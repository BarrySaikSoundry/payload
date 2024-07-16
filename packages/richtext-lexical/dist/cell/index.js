'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createHeadlessEditor } from '@lexical/headless';
import { useClientFunctions, useTableCell } from '@payloadcms/ui';
import { $getRoot } from 'lexical';
import React, { useEffect, useState } from 'react';
import { defaultEditorLexicalConfig } from '../lexical/config/client/default.js';
import { loadClientFeatures } from '../lexical/config/client/loader.js';
import { sanitizeClientEditorConfig } from '../lexical/config/client/sanitize.js';
import { getEnabledNodes } from '../lexical/nodes/index.js';
export const RichTextCell = (props)=>{
    const { admin, lexicalEditorConfig, richTextComponentMap } = props;
    const [preview, setPreview] = React.useState('Loading...');
    const { cellData, cellProps: { schemaPath } } = useTableCell();
    const clientFunctions = useClientFunctions();
    const [hasLoadedFeatures, setHasLoadedFeatures] = useState(false);
    const [featureProviders, setFeatureProviders] = useState([]);
    const [finalSanitizedEditorConfig, setFinalSanitizedEditorConfig] = useState(null);
    const featureProviderComponents = richTextComponentMap.get('features').sort((a, b)=>a.order - b.order) // order by order
    ;
    let featureProvidersAndComponentsToLoad = 0 // feature providers and components
    ;
    for (const featureProvider of featureProviderComponents){
        const featureComponentKeys = Array.from(richTextComponentMap.keys()).filter((key)=>key.startsWith(`feature.${featureProvider.key}.components.`));
        featureProvidersAndComponentsToLoad += 1;
        featureProvidersAndComponentsToLoad += featureComponentKeys.length;
    }
    useEffect(()=>{
        if (!hasLoadedFeatures) {
            const featureProvidersLocal = [];
            let featureProvidersAndComponentsLoaded = 0 // feature providers and components only
            ;
            Object.entries(clientFunctions).forEach(([key, plugin])=>{
                if (key.startsWith(`lexicalFeature.${schemaPath}.`)) {
                    if (!key.includes('.lexical_internal_components.')) {
                        featureProvidersLocal.push(plugin);
                    }
                    featureProvidersAndComponentsLoaded++;
                }
            });
            if (featureProvidersAndComponentsLoaded === featureProvidersAndComponentsToLoad) {
                setFeatureProviders(featureProvidersLocal);
                setHasLoadedFeatures(true);
                /**
         * Loaded feature provided => create the final sanitized editor config
         */ const resolvedClientFeatures = loadClientFeatures({
                    clientFunctions,
                    schemaPath,
                    unSanitizedEditorConfig: {
                        features: featureProvidersLocal,
                        lexical: lexicalEditorConfig
                    }
                });
                setFinalSanitizedEditorConfig(sanitizeClientEditorConfig(lexicalEditorConfig ? lexicalEditorConfig : defaultEditorLexicalConfig, resolvedClientFeatures, admin));
            }
        }
    }, [
        admin,
        featureProviderComponents,
        hasLoadedFeatures,
        clientFunctions,
        schemaPath,
        featureProviderComponents.length,
        featureProviders,
        finalSanitizedEditorConfig,
        lexicalEditorConfig,
        richTextComponentMap,
        featureProvidersAndComponentsToLoad
    ]);
    useEffect(()=>{
        if (!hasLoadedFeatures) {
            return;
        }
        let dataToUse = cellData;
        if (dataToUse == null || !hasLoadedFeatures || !finalSanitizedEditorConfig) {
            setPreview('');
            return;
        }
        // Transform data through load hooks
        if (finalSanitizedEditorConfig?.features?.hooks?.load?.length) {
            finalSanitizedEditorConfig.features.hooks.load.forEach((hook)=>{
                dataToUse = hook({
                    incomingEditorState: dataToUse
                });
            });
        }
        if (!dataToUse || typeof dataToUse !== 'object') {
            setPreview('');
            return;
        }
        // If data is from Slate and not Lexical
        if (Array.isArray(dataToUse) && !('root' in dataToUse)) {
            setPreview('');
            return;
        }
        // If data is from payload-plugin-lexical
        if ('jsonContent' in dataToUse) {
            setPreview('');
            return;
        }
        // initialize headless editor
        const headlessEditor = createHeadlessEditor({
            namespace: finalSanitizedEditorConfig.lexical.namespace,
            nodes: getEnabledNodes({
                editorConfig: finalSanitizedEditorConfig
            }),
            theme: finalSanitizedEditorConfig.lexical.theme
        });
        headlessEditor.setEditorState(headlessEditor.parseEditorState(dataToUse));
        const textContent = headlessEditor.getEditorState().read(()=>{
            return $getRoot().getTextContent();
        }) || '';
        // Limiting the number of characters shown is done in a CSS rule
        setPreview(textContent);
    }, [
        cellData,
        lexicalEditorConfig,
        hasLoadedFeatures,
        finalSanitizedEditorConfig
    ]);
    if (!hasLoadedFeatures) {
        return /*#__PURE__*/ _jsx(React.Fragment, {
            children: Array.isArray(featureProviderComponents) && featureProviderComponents.map((featureProvider)=>{
                // get all components starting with key feature.${FeatureProvider.key}.components.{featureComponentKey}
                const featureComponentKeys = Array.from(richTextComponentMap.keys()).filter((key)=>key.startsWith(`lexical_internal_feature.${featureProvider.key}.lexical_internal_components.`));
                const featureComponents = featureComponentKeys.map((key)=>{
                    return richTextComponentMap.get(key);
                });
                return /*#__PURE__*/ _jsxs(React.Fragment, {
                    children: [
                        featureComponents?.length ? featureComponents.map((FeatureComponent)=>{
                            return FeatureComponent;
                        }) : null,
                        featureProvider.ClientFeature
                    ]
                }, featureProvider.key);
            })
        });
    }
    return /*#__PURE__*/ _jsx("span", {
        children: preview
    });
};

//# sourceMappingURL=index.js.map