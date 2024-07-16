import type { I18n } from '@payloadcms/translations';
import type { Field, SanitizedConfig } from 'payload';
import type { FieldSchemaMap } from './types.js';
type Args = {
    config: SanitizedConfig;
    fields: Field[];
    i18n: I18n<any, any>;
    schemaMap: FieldSchemaMap;
    schemaPath: string;
};
export declare const traverseFields: ({ config, fields, i18n, schemaMap, schemaPath }: Args) => void;
export {};
//# sourceMappingURL=traverseFields.d.ts.map