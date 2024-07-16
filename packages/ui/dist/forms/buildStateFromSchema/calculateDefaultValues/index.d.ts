import type { Data, Field as FieldSchema, User } from 'payload';
type Args = {
    data: Data;
    fields: FieldSchema[];
    id?: number | string;
    locale: string | undefined;
    siblingData: Data;
    user: User;
};
export declare const calculateDefaultValues: ({ id, data, fields, locale, user, }: Args) => Promise<Data>;
export {};
//# sourceMappingURL=index.d.ts.map