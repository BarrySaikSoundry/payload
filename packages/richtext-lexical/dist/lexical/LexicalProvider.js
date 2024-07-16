'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { LexicalComposer } from '@lexical/react/LexicalComposer.js';
import * as React from 'react';
import { useMemo } from 'react';
import { LexicalEditor as LexicalEditorComponent } from './LexicalEditor.js';
import { EditorConfigProvider, useEditorConfigContext } from './config/client/EditorConfigProvider.js';
import { getEnabledNodes } from './nodes/index.js';
const NestProviders = ({ children, providers })=>{
    if (!providers?.length) {
        return children;
    }
    const Component = providers[0];
    if (providers.length > 1) {
        return /*#__PURE__*/ _jsx(Component, {
            children: /*#__PURE__*/ _jsx(NestProviders, {
                providers: providers.slice(1),
                children: children
            })
        });
    }
    return /*#__PURE__*/ _jsx(Component, {
        children: children
    });
};
export const LexicalProvider = (props)=>{
    const { editorConfig, fieldProps, onChange, path, readOnly, value } = props;
    const parentContext = useEditorConfigContext();
    const editorContainerRef = React.useRef(null);
    const processedValue = useMemo(()=>{
        let processed = value;
        if (editorConfig?.features?.hooks?.load?.length) {
            editorConfig.features.hooks.load.forEach((hook)=>{
                processed = hook({
                    incomingEditorState: processed
                });
            });
        }
        return processed;
    }, [
        editorConfig,
        value
    ]);
    // useMemo for the initialConfig that depends on readOnly and processedValue
    const initialConfig = useMemo(()=>{
        if (processedValue && typeof processedValue !== 'object') {
            throw new Error('The value passed to the Lexical editor is not an object. This is not supported. Please remove the data from the field and start again. This is the value that was passed in: ' + JSON.stringify(processedValue));
        }
        if (processedValue && Array.isArray(processedValue) && !('root' in processedValue)) {
            throw new Error('You have tried to pass in data from the old, Slate editor, to the new, Lexical editor. This is not supported. There is no automatic conversion from Slate to Lexical data available yet (coming soon). Please remove the data from the field and start again.');
        }
        if (processedValue && 'jsonContent' in processedValue) {
            throw new Error('You have tried to pass in data from payload-plugin-lexical. This is not supported. The data structure has changed in this editor, compared to the plugin, and there is no automatic conversion available yet (coming soon). Please remove the data from the field and start again.');
        }
        return {
            editable: readOnly !== true,
            editorState: processedValue != null ? JSON.stringify(processedValue) : undefined,
            namespace: editorConfig.lexical.namespace,
            nodes: [
                ...getEnabledNodes({
                    editorConfig
                })
            ],
            onError: (error)=>{
                throw error;
            },
            theme: editorConfig.lexical.theme
        };
    }, [
        editorConfig,
        processedValue,
        readOnly
    ]);
    if (!initialConfig) {
        return /*#__PURE__*/ _jsx("p", {
            children: "Loading..."
        });
    }
    return /*#__PURE__*/ _jsx(LexicalComposer, {
        initialConfig: initialConfig,
        children: /*#__PURE__*/ _jsx(EditorConfigProvider, {
            editorConfig: editorConfig,
            editorContainerRef: editorContainerRef,
            fieldProps: fieldProps,
            parentContext: parentContext,
            children: /*#__PURE__*/ _jsx(NestProviders, {
                providers: editorConfig.features.providers,
                children: /*#__PURE__*/ _jsx(LexicalEditorComponent, {
                    editorConfig: editorConfig,
                    editorContainerRef: editorContainerRef,
                    onChange: onChange
                })
            })
        })
    }, path);
};

//# sourceMappingURL=LexicalProvider.js.map