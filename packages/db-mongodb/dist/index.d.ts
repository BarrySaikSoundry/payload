import type { TransactionOptions } from 'mongodb';
import type { MongoMemoryReplSet } from 'mongodb-memory-server';
import type { ClientSession, ConnectOptions, Connection } from 'mongoose';
import type { BaseDatabaseAdapter, DatabaseAdapterObj } from 'payload';
import type { CollectionModel, GlobalModel } from './types.js';
export type { MigrateDownArgs, MigrateUpArgs } from './types.js';
export interface Args {
    /** Set to false to disable auto-pluralization of collection names, Defaults to true */
    autoPluralization?: boolean;
    /** Extra configuration options */
    connectOptions?: {
        /** Set false to disable $facet aggregation in non-supporting databases, Defaults to true */
        useFacet?: boolean;
    } & ConnectOptions;
    /** Set to true to disable hinting to MongoDB to use 'id' as index. This is currently done when counting documents for pagination. Disabling this optimization might fix some problems with AWS DocumentDB. Defaults to false */
    disableIndexHints?: boolean;
    migrationDir?: string;
    /**
     * typed as any to avoid dependency
     */
    mongoMemoryServer?: MongoMemoryReplSet;
    transactionOptions?: TransactionOptions | false;
    /** The URL to connect to MongoDB or false to start payload and prevent connecting */
    url: false | string;
}
export type MongooseAdapter = {
    collections: {
        [slug: string]: CollectionModel;
    };
    connection: Connection;
    globals: GlobalModel;
    mongoMemoryServer: MongoMemoryReplSet;
    sessions: Record<number | string, ClientSession>;
    versions: {
        [slug: string]: CollectionModel;
    };
} & Args & BaseDatabaseAdapter;
declare module 'payload' {
    interface DatabaseAdapter extends Omit<BaseDatabaseAdapter, 'sessions'>, Omit<Args, 'migrationDir'> {
        collections: {
            [slug: string]: CollectionModel;
        };
        connection: Connection;
        globals: GlobalModel;
        mongoMemoryServer: MongoMemoryReplSet;
        sessions: Record<number | string, ClientSession>;
        transactionOptions: TransactionOptions;
        versions: {
            [slug: string]: CollectionModel;
        };
    }
}
export declare function mongooseAdapter({ autoPluralization, connectOptions, disableIndexHints, migrationDir: migrationDirArg, mongoMemoryServer, transactionOptions, url, }: Args): DatabaseAdapterObj;
//# sourceMappingURL=index.d.ts.map