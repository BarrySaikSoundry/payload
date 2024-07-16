'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { ShimmerEffect, useClientFunctions, useFieldProps } from '@payloadcms/ui';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { createFeatureMap } from './createFeatureMap.js';
const RichTextEditor = /*#__PURE__*/ lazy(()=>import('./RichText.js').then((module)=>({
            default: module.RichText
        })));
export const RichTextField = (props)=>{
    const { richTextComponentMap } = props;
    const { schemaPath } = useFieldProps();
    const clientFunctions = useClientFunctions();
    const [hasLoadedPlugins, setHasLoadedPlugins] = useState(false);
    const [features] = useState(()=>{
        return createFeatureMap(richTextComponentMap);
    });
    const [plugins, setPlugins] = useState([]);
    useEffect(()=>{
        if (!hasLoadedPlugins) {
            const plugins = [];
            Object.entries(clientFunctions).forEach(([key, plugin])=>{
                if (key.startsWith(`slatePlugin.${schemaPath}.`)) {
                    plugins.push(plugin);
                }
            });
            if (plugins.length === features.plugins.length) {
                setPlugins(plugins);
                setHasLoadedPlugins(true);
            }
        }
    }, [
        hasLoadedPlugins,
        clientFunctions,
        schemaPath,
        features.plugins.length
    ]);
    if (!hasLoadedPlugins) {
        return /*#__PURE__*/ _jsx(React.Fragment, {
            children: Array.isArray(features.plugins) && features.plugins.map((Plugin, i)=>{
                return /*#__PURE__*/ _jsx(React.Fragment, {
                    children: Plugin
                }, i);
            })
        });
    }
    return /*#__PURE__*/ _jsx(Suspense, {
        fallback: /*#__PURE__*/ _jsx(ShimmerEffect, {
            height: "35vh"
        }),
        children: /*#__PURE__*/ _jsx(RichTextEditor, {
            ...props,
            elements: features.elements,
            leaves: features.leaves,
            plugins: plugins
        })
    });
};

//# sourceMappingURL=index.js.map