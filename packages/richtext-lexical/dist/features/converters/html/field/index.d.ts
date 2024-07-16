import type { Field } from 'payload';
import type { SanitizedServerEditorConfig } from '../../../../lexical/config/types.js';
import type { HTMLConverter } from '../converter/types.js';
type Props = {
    /**
     * Whether the lexicalHTML field should be hidden in the admin panel
     *
     * @default true
     */
    hidden?: boolean;
    name: string;
    /**
     * Whether the HTML should be stored in the database
     *
     * @default false
     */
    storeInDB?: boolean;
};
/**
 * Combines the default HTML converters with HTML converters found in the features, and with HTML converters configured in the htmlConverter feature.
 *
 * @param editorConfig
 */
export declare const consolidateHTMLConverters: ({ editorConfig, }: {
    editorConfig: SanitizedServerEditorConfig;
}) => HTMLConverter[];
export declare const lexicalHTML: (
/**
 * A string which matches the lexical field name you want to convert to HTML.
 *
 * This has to be a SIBLING field of this lexicalHTML field - otherwise, it won't be able to find the lexical field.
 **/
lexicalFieldName: string, props: Props) => Field;
export {};
//# sourceMappingURL=index.d.ts.map