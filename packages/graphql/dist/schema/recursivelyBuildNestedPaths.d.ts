import type { FieldWithSubFields, TabsField } from 'payload';
type Args = {
    field: FieldWithSubFields | TabsField;
    nestedFieldName2: string;
    parentName: string;
};
declare const recursivelyBuildNestedPaths: ({ field, nestedFieldName2, parentName }: Args) => any;
export default recursivelyBuildNestedPaths;
//# sourceMappingURL=recursivelyBuildNestedPaths.d.ts.map