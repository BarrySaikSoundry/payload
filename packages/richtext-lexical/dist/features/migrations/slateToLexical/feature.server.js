// eslint-disable-next-line payload/no-imports-from-exports-dir
import { SlateToLexicalFeatureClient } from '../../../exports/client/index.js';
import { createServerFeature } from '../../../utilities/createServerFeature.js';
import { defaultSlateConverters } from './converter/defaultConverters.js';
import { UnknownConvertedNode } from './nodes/unknownConvertedNode/index.js';
export const SlateToLexicalFeature = createServerFeature({
    feature: ({ props })=>{
        if (!props) {
            props = {};
        }
        let converters = [];
        if (props?.converters && typeof props?.converters === 'function') {
            converters = props.converters({
                defaultConverters: defaultSlateConverters
            });
        } else if (props.converters && typeof props?.converters !== 'function') {
            converters = props.converters;
        } else {
            converters = defaultSlateConverters;
        }
        props.converters = converters;
        return {
            ClientFeature: SlateToLexicalFeatureClient,
            generateComponentMap: ()=>{
                const map = {};
                for (const converter of converters){
                    if (converter.ClientConverter) {
                        const key = converter.converter.nodeTypes.join('-');
                        map[key] = converter.ClientConverter;
                    }
                }
                return map;
            },
            nodes: [
                {
                    node: UnknownConvertedNode
                }
            ],
            sanitizedServerFeatureProps: {
                converters
            }
        };
    },
    key: 'slateToLexical'
});

//# sourceMappingURL=feature.server.js.map