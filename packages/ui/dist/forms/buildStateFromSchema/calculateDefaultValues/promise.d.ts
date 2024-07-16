import type { Data, Field, TabAsField, User } from 'payload';
type Args<T> = {
    data: T;
    field: Field | TabAsField;
    id?: number | string;
    locale: string | undefined;
    siblingData: Data;
    user: User;
};
export declare const defaultValuePromise: <T>({ id, data, field, locale, siblingData, user, }: Args<T>) => Promise<void>;
export {};
//# sourceMappingURL=promise.d.ts.map