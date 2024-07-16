import type { GraphQLFieldConfig } from 'graphql';
import type { Field, GraphQLInfo, SanitizedConfig } from 'payload';
import { GraphQLObjectType } from 'graphql';
export type ObjectTypeConfig = {
    [path: string]: GraphQLFieldConfig<any, any>;
};
type Args = {
    baseFields?: ObjectTypeConfig;
    config: SanitizedConfig;
    fields: Field[];
    forceNullable?: boolean;
    graphqlResult: GraphQLInfo;
    name: string;
    parentName: string;
};
export declare function buildObjectType({ name, baseFields, config, fields, forceNullable, graphqlResult, parentName, }: Args): GraphQLObjectType;
export {};
//# sourceMappingURL=buildObjectType.d.ts.map