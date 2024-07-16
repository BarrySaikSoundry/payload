import type { GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import type { DeepRequired, MarkOptional } from 'ts-essentials';
import type { CustomPreviewButton, CustomPublishButton, CustomSaveButton, CustomSaveDraftButton, CustomUpload } from '../../admin/types.js';
import type { Arguments as MeArguments } from '../../auth/operations/me.js';
import type { Arguments as RefreshArguments, Result as RefreshResult } from '../../auth/operations/refresh.js';
import type { Auth, ClientUser, IncomingAuthType } from '../../auth/types.js';
import type { Access, CustomComponent, EditConfig, Endpoint, EntityDescription, EntityDescriptionComponent, GeneratePreviewURL, LabelFunction, LivePreviewConfig, OpenGraphConfig } from '../../config/types.js';
import type { DBIdentifierName } from '../../database/types.js';
import type { Field } from '../../fields/config/types.js';
import type { CollectionSlug, TypedAuthOperations, TypedCollection } from '../../index.js';
import type { PayloadRequest, RequestContext } from '../../types/index.js';
import type { SanitizedUploadConfig, UploadConfig } from '../../uploads/types.js';
import type { IncomingCollectionVersions, SanitizedCollectionVersions } from '../../versions/types.js';
import type { AfterOperationArg, AfterOperationMap } from '../operations/utils.js';
export type DataFromCollectionSlug<TSlug extends CollectionSlug> = TypedCollection[TSlug];
export type AuthOperationsFromCollectionSlug<TSlug extends CollectionSlug> = TypedAuthOperations[TSlug];
export type RequiredDataFromCollection<TData extends Record<string, any>> = MarkOptional<TData, 'createdAt' | 'id' | 'sizes' | 'updatedAt'>;
export type RequiredDataFromCollectionSlug<TSlug extends CollectionSlug> = RequiredDataFromCollection<DataFromCollectionSlug<TSlug>>;
export type HookOperationType = 'autosave' | 'count' | 'create' | 'delete' | 'forgotPassword' | 'login' | 'read' | 'refresh' | 'update';
type CreateOrUpdateOperation = Extract<HookOperationType, 'create' | 'update'>;
export type BeforeOperationHook = (args: {
    args?: any;
    /** The collection which this hook is being run on */
    collection: SanitizedCollectionConfig;
    context: RequestContext;
    /**
     * Hook operation being performed
     */
    operation: HookOperationType;
    req: PayloadRequest;
}) => any;
export type BeforeValidateHook<T extends TypeWithID = any> = (args: {
    /** The collection which this hook is being run on */
    collection: SanitizedCollectionConfig;
    context: RequestContext;
    data?: Partial<T>;
    /**
     * Hook operation being performed
     */
    operation: CreateOrUpdateOperation;
    /**
     * Original document before change
     *
     * `undefined` on 'create' operation
     */
    originalDoc?: T;
    req: PayloadRequest;
}) => any;
export type BeforeChangeHook<T extends TypeWithID = any> = (args: {
    /** The collection which this hook is being run on */
    collection: SanitizedCollectionConfig;
    context: RequestContext;
    data: Partial<T>;
    /**
     * Hook operation being performed
     */
    operation: CreateOrUpdateOperation;
    /**
     * Original document before change
     *
     * `undefined` on 'create' operation
     */
    originalDoc?: T;
    req: PayloadRequest;
}) => any;
export type AfterChangeHook<T extends TypeWithID = any> = (args: {
    /** The collection which this hook is being run on */
    collection: SanitizedCollectionConfig;
    context: RequestContext;
    doc: T;
    /**
     * Hook operation being performed
     */
    operation: CreateOrUpdateOperation;
    previousDoc: T;
    req: PayloadRequest;
}) => any;
export type BeforeReadHook<T extends TypeWithID = any> = (args: {
    /** The collection which this hook is being run on */
    collection: SanitizedCollectionConfig;
    context: RequestContext;
    doc: T;
    query: {
        [key: string]: any;
    };
    req: PayloadRequest;
}) => any;
export type AfterReadHook<T extends TypeWithID = any> = (args: {
    /** The collection which this hook is being run on */
    collection: SanitizedCollectionConfig;
    context: RequestContext;
    doc: T;
    findMany?: boolean;
    query?: {
        [key: string]: any;
    };
    req: PayloadRequest;
}) => any;
export type BeforeDeleteHook = (args: {
    /** The collection which this hook is being run on */
    collection: SanitizedCollectionConfig;
    context: RequestContext;
    id: number | string;
    req: PayloadRequest;
}) => any;
export type AfterDeleteHook<T extends TypeWithID = any> = (args: {
    /** The collection which this hook is being run on */
    collection: SanitizedCollectionConfig;
    context: RequestContext;
    doc: T;
    id: number | string;
    req: PayloadRequest;
}) => any;
export type AfterOperationHook<TOperationGeneric extends CollectionSlug = string> = (arg: AfterOperationArg<TOperationGeneric>) => Awaited<ReturnType<AfterOperationMap<TOperationGeneric>[keyof AfterOperationMap<TOperationGeneric>]>> | Promise<Awaited<ReturnType<AfterOperationMap<TOperationGeneric>[keyof AfterOperationMap<TOperationGeneric>]>>>;
export type AfterErrorHook = (err: Error, res: unknown, context: RequestContext, 
/** The collection which this hook is being run on. This is null if the AfterError hook was be added to the payload-wide config */
collection: SanitizedCollectionConfig | null) => {
    response: any;
    status: number;
} | void;
export type BeforeLoginHook<T extends TypeWithID = any> = (args: {
    /** The collection which this hook is being run on */
    collection: SanitizedCollectionConfig;
    context: RequestContext;
    req: PayloadRequest;
    user: T;
}) => any;
export type AfterLoginHook<T extends TypeWithID = any> = (args: {
    /** The collection which this hook is being run on */
    collection: SanitizedCollectionConfig;
    context: RequestContext;
    req: PayloadRequest;
    token: string;
    user: T;
}) => any;
export type AfterLogoutHook<T extends TypeWithID = any> = (args: {
    /** The collection which this hook is being run on */
    collection: SanitizedCollectionConfig;
    context: RequestContext;
    req: PayloadRequest;
}) => any;
export type AfterMeHook<T extends TypeWithID = any> = (args: {
    /** The collection which this hook is being run on */
    collection: SanitizedCollectionConfig;
    context: RequestContext;
    req: PayloadRequest;
    response: unknown;
}) => any;
export type RefreshHook<T extends TypeWithID = any> = (args: {
    args: RefreshArguments;
    user: T;
}) => Promise<RefreshResult | void> | (RefreshResult | void);
export type MeHook<T extends TypeWithID = any> = (args: {
    args: MeArguments;
    user: T;
}) => ({
    exp: number;
    user: T;
} | void) | Promise<{
    exp: number;
    user: T;
} | void>;
export type AfterRefreshHook<T extends TypeWithID = any> = (args: {
    /** The collection which this hook is being run on */
    collection: SanitizedCollectionConfig;
    context: RequestContext;
    exp: number;
    req: PayloadRequest;
    token: string;
}) => any;
export type AfterForgotPasswordHook = (args: {
    args?: any;
    /** The collection which this hook is being run on */
    collection: SanitizedCollectionConfig;
    context: RequestContext;
}) => any;
export type CollectionAdminOptions = {
    /**
     * Custom admin components
     */
    components?: {
        afterList?: CustomComponent[];
        afterListTable?: CustomComponent[];
        beforeList?: CustomComponent[];
        beforeListTable?: CustomComponent[];
        /**
         * Components within the edit view
         */
        edit?: {
            Description?: EntityDescriptionComponent;
            /**
             * Replaces the "Preview" button
             */
            PreviewButton?: CustomPreviewButton;
            /**
             * Replaces the "Publish" button
             * + drafts must be enabled
             */
            PublishButton?: CustomPublishButton;
            /**
             * Replaces the "Save" button
             * + drafts must be disabled
             */
            SaveButton?: CustomSaveButton;
            /**
             * Replaces the "Save Draft" button
             * + drafts must be enabled
             * + autosave must be disabled
             */
            SaveDraftButton?: CustomSaveDraftButton;
            /**
             * Replaces the "Upload" section
             * + upload must be enabled
             */
            Upload?: CustomUpload;
        };
        views?: {
            /**
             * Set to a React component to replace the entire "Edit" view, including all nested routes.
             * Set to an object to replace or modify individual nested routes, or to add new ones.
             */
            Edit?: EditConfig;
            List?: {
                Component?: React.ComponentType<any>;
                actions?: CustomComponent[];
            } | React.ComponentType<any>;
        };
    };
    /** Extension point to add your custom data. Available in server and client. */
    custom?: Record<string, any>;
    /**
     * Default columns to show in list view
     */
    defaultColumns?: string[];
    /**
     * Custom description for collection
     */
    description?: EntityDescription;
    enableRichTextLink?: boolean;
    enableRichTextRelationship?: boolean;
    /**
     * Place collections into a navigational group
     * */
    group?: Record<string, string> | string;
    /**
     * Exclude the collection from the admin nav and routes
     */
    hidden?: ((args: {
        user: ClientUser;
    }) => boolean) | boolean;
    /**
     * Hide the API URL within the Edit view
     */
    hideAPIURL?: boolean;
    /**
     * Additional fields to be searched via the full text search
     */
    listSearchableFields?: string[];
    /**
     * Live preview options
     */
    livePreview?: LivePreviewConfig;
    meta?: {
        description?: string;
        openGraph?: OpenGraphConfig;
    };
    pagination?: {
        defaultLimit?: number;
        limits?: number[];
    };
    /**
     * Function to generate custom preview URL
     */
    preview?: GeneratePreviewURL;
    /**
     * Field to use as title in Edit view and first column in List view
     */
    useAsTitle?: string;
};
/** Manage all aspects of a data collection */
export type CollectionConfig<TSlug extends CollectionSlug = any> = {
    /**
     * Access control
     */
    access?: {
        admin?: ({ req }: {
            req: PayloadRequest;
        }) => Promise<boolean> | boolean;
        create?: Access;
        delete?: Access;
        read?: Access;
        readVersions?: Access;
        unlock?: Access;
        update?: Access;
    };
    /**
     * Collection admin options
     */
    admin?: CollectionAdminOptions;
    /**
     * Collection login options
     *
     * Use `true` to enable with default options
     */
    auth?: IncomingAuthType | boolean;
    /** Extension point to add your custom data. Server only. */
    custom?: Record<string, any>;
    /**
     * Used to override the default naming of the database table or collection with your using a function or string
     * @WARNING: If you change this property with existing data, you will need to handle the renaming of the table in your database or by using migrations
     */
    dbName?: DBIdentifierName;
    /**
     * Default field to sort by in collection list view
     */
    defaultSort?: string;
    /**
     * When true, do not show the "Duplicate" button while editing documents within this collection and prevent `duplicate` from all APIs
     */
    disableDuplicate?: boolean;
    /**
     * Custom rest api endpoints, set false to disable all rest endpoints for this collection.
     */
    endpoints?: Omit<Endpoint, 'root'>[] | false;
    fields: Field[];
    /**
     * GraphQL configuration
     */
    graphQL?: {
        pluralName?: string;
        singularName?: string;
    } | false;
    /**
     * Hooks to modify Payload functionality
     */
    hooks?: {
        afterChange?: AfterChangeHook[];
        afterDelete?: AfterDeleteHook[];
        afterError?: AfterErrorHook;
        afterForgotPassword?: AfterForgotPasswordHook[];
        afterLogin?: AfterLoginHook[];
        afterLogout?: AfterLogoutHook[];
        afterMe?: AfterMeHook[];
        afterOperation?: AfterOperationHook<TSlug>[];
        afterRead?: AfterReadHook[];
        afterRefresh?: AfterRefreshHook[];
        beforeChange?: BeforeChangeHook[];
        beforeDelete?: BeforeDeleteHook[];
        beforeLogin?: BeforeLoginHook[];
        beforeOperation?: BeforeOperationHook[];
        beforeRead?: BeforeReadHook[];
        beforeValidate?: BeforeValidateHook[];
        /**
        /**
         * Use the `me` hook to control the `me` operation.
         * Here, you can optionally instruct the me operation to return early,
         * and skip its default logic.
         */
        me?: MeHook[];
        /**
         * Use the `refresh` hook to control the refresh operation.
         * Here, you can optionally instruct the refresh operation to return early,
         * and skip its default logic.
         */
        refresh?: RefreshHook[];
    };
    /**
     * Label configuration
     */
    labels?: {
        plural?: LabelFunction | Record<string, string> | string;
        singular?: LabelFunction | Record<string, string> | string;
    };
    slug: string;
    /**
     * Add `createdAt` and `updatedAt` fields
     *
     * @default true
     */
    timestamps?: boolean;
    /**
     * Options used in typescript generation
     */
    typescript?: {
        /**
         * Typescript generation name given to the interface type
         */
        interface?: string;
    };
    /**
     * Customize the handling of incoming file uploads
     *
     * @default false // disable uploads
     */
    upload?: UploadConfig | boolean;
    /**
     * Enable versioning. Set it to true to enable default versions settings,
     * or customize versions options by setting the property equal to an object
     * containing the version options.
     *
     * @default false // disable versioning
     */
    versions?: IncomingCollectionVersions | boolean;
};
export interface SanitizedCollectionConfig extends Omit<DeepRequired<CollectionConfig>, 'auth' | 'endpoints' | 'fields' | 'upload' | 'versions'> {
    auth: Auth;
    endpoints: Endpoint[] | false;
    fields: Field[];
    upload: SanitizedUploadConfig;
    versions: SanitizedCollectionVersions;
}
export type Collection = {
    config: SanitizedCollectionConfig;
    customIDType?: 'number' | 'text';
    graphQL?: {
        JWT: GraphQLObjectType;
        countType: GraphQLObjectType;
        mutationInputType: GraphQLNonNull<any>;
        paginatedType: GraphQLObjectType;
        type: GraphQLObjectType;
        updateMutationInputType: GraphQLNonNull<any>;
        versionType: GraphQLObjectType;
        whereInputType: GraphQLInputObjectType;
    };
};
export type BulkOperationResult<TSlug extends CollectionSlug> = {
    docs: DataFromCollectionSlug<TSlug>[];
    errors: {
        id: DataFromCollectionSlug<TSlug>['id'];
        message: string;
    }[];
};
export type AuthCollection = {
    config: SanitizedCollectionConfig;
};
export type TypeWithID = {
    id: number | string;
};
export type TypeWithTimestamps = {
    [key: string]: unknown;
    createdAt: string;
    id: number | string;
    updatedAt: string;
};
export {};
//# sourceMappingURL=types.d.ts.map