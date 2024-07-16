import type { Data, Field, TabAsField, User } from 'payload';
type Args<T> = {
    data: T;
    fields: (Field | TabAsField)[];
    id?: number | string;
    locale: string | undefined;
    siblingData: Data;
    user: User;
};
export declare const iterateFields: <T>({ id, data, fields, locale, siblingData, user, }: Args<T>) => Promise<void>;
export {};
//# sourceMappingURL=iterateFields.d.ts.map