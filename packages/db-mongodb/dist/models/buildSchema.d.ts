import type { Schema, SchemaOptions } from 'mongoose';
import type { Field, SanitizedConfig } from 'payload';
export type BuildSchemaOptions = {
    allowIDField?: boolean;
    disableUnique?: boolean;
    draftsEnabled?: boolean;
    indexSortableFields?: boolean;
    options?: SchemaOptions;
};
declare const buildSchema: (config: SanitizedConfig, configFields: Field[], buildSchemaOptions?: BuildSchemaOptions) => Schema;
export default buildSchema;
//# sourceMappingURL=buildSchema.d.ts.map