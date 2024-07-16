import type { forgotPasswordOperation } from '../../auth/operations/forgotPassword.js';
import type { loginOperation } from '../../auth/operations/login.js';
import type { refreshOperation } from '../../auth/operations/refresh.js';
import type { CollectionSlug } from '../../index.js';
import type { PayloadRequest } from '../../types/index.js';
import type { SanitizedCollectionConfig } from '../config/types.js';
import type { countOperation } from './count.js';
import type { createOperation } from './create.js';
import type { deleteOperation } from './delete.js';
import type { deleteByIDOperation } from './deleteByID.js';
import type { findOperation } from './find.js';
import type { findByIDOperation } from './findByID.js';
import type { updateOperation } from './update.js';
import type { updateByIDOperation } from './updateByID.js';
export type AfterOperationMap<TOperationGeneric extends CollectionSlug> = {
    count: typeof countOperation<TOperationGeneric>;
    create: typeof createOperation<TOperationGeneric>;
    delete: typeof deleteOperation<TOperationGeneric>;
    deleteByID: typeof deleteByIDOperation<TOperationGeneric>;
    find: typeof findOperation<TOperationGeneric>;
    findByID: typeof findByIDOperation<TOperationGeneric>;
    forgotPassword: typeof forgotPasswordOperation;
    login: typeof loginOperation<TOperationGeneric>;
    refresh: typeof refreshOperation;
    update: typeof updateOperation<TOperationGeneric>;
    updateByID: typeof updateByIDOperation<TOperationGeneric>;
};
export type AfterOperationArg<TOperationGeneric extends CollectionSlug> = {
    /** The collection which this hook is being run on */
    collection: SanitizedCollectionConfig;
    req: PayloadRequest;
} & ({
    args: Parameters<AfterOperationMap<TOperationGeneric>['count']>[0];
    operation: 'count';
    result: Awaited<ReturnType<AfterOperationMap<TOperationGeneric>['count']>>;
} | {
    args: Parameters<AfterOperationMap<TOperationGeneric>['create']>[0];
    operation: 'create';
    result: Awaited<ReturnType<AfterOperationMap<TOperationGeneric>['create']>>;
} | {
    args: Parameters<AfterOperationMap<TOperationGeneric>['delete']>[0];
    operation: 'delete';
    result: Awaited<ReturnType<AfterOperationMap<TOperationGeneric>['delete']>>;
} | {
    args: Parameters<AfterOperationMap<TOperationGeneric>['deleteByID']>[0];
    operation: 'deleteByID';
    result: Awaited<ReturnType<AfterOperationMap<TOperationGeneric>['deleteByID']>>;
} | {
    args: Parameters<AfterOperationMap<TOperationGeneric>['find']>[0];
    operation: 'find';
    result: Awaited<ReturnType<AfterOperationMap<TOperationGeneric>['find']>>;
} | {
    args: Parameters<AfterOperationMap<TOperationGeneric>['findByID']>[0];
    operation: 'findByID';
    result: Awaited<ReturnType<AfterOperationMap<TOperationGeneric>['findByID']>>;
} | {
    args: Parameters<AfterOperationMap<TOperationGeneric>['forgotPassword']>[0];
    operation: 'forgotPassword';
    result: Awaited<ReturnType<AfterOperationMap<TOperationGeneric>['forgotPassword']>>;
} | {
    args: Parameters<AfterOperationMap<TOperationGeneric>['login']>[0];
    operation: 'login';
    result: Awaited<ReturnType<AfterOperationMap<TOperationGeneric>['login']>>;
} | {
    args: Parameters<AfterOperationMap<TOperationGeneric>['refresh']>[0];
    operation: 'refresh';
    result: Awaited<ReturnType<AfterOperationMap<TOperationGeneric>['refresh']>>;
} | {
    args: Parameters<AfterOperationMap<TOperationGeneric>['update']>[0];
    operation: 'update';
    result: Awaited<ReturnType<AfterOperationMap<TOperationGeneric>['update']>>;
} | {
    args: Parameters<AfterOperationMap<TOperationGeneric>['updateByID']>[0];
    operation: 'updateByID';
    result: Awaited<ReturnType<AfterOperationMap<TOperationGeneric>['updateByID']>>;
});
type OperationResult<TOperationGeneric extends CollectionSlug, O extends keyof AfterOperationMap<TOperationGeneric>> = Awaited<ReturnType<AfterOperationMap<TOperationGeneric>[O]>>;
export declare const buildAfterOperation: <TOperationGeneric extends CollectionSlug, O extends keyof AfterOperationMap<TOperationGeneric> = keyof AfterOperationMap<TOperationGeneric>>(operationArgs: {
    operation: O;
} & Omit<AfterOperationArg<TOperationGeneric>, "req">) => Promise<OperationResult<TOperationGeneric, O> | any>;
export {};
//# sourceMappingURL=utils.d.ts.map