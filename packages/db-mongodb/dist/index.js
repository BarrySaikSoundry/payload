import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';
import { createDatabaseAdapter } from 'payload';
import { connect } from './connect.js';
import { count } from './count.js';
import { create } from './create.js';
import { createGlobal } from './createGlobal.js';
import { createGlobalVersion } from './createGlobalVersion.js';
import { createMigration } from './createMigration.js';
import { createVersion } from './createVersion.js';
import { deleteMany } from './deleteMany.js';
import { deleteOne } from './deleteOne.js';
import { deleteVersions } from './deleteVersions.js';
import { destroy } from './destroy.js';
import { find } from './find.js';
import { findGlobal } from './findGlobal.js';
import { findGlobalVersions } from './findGlobalVersions.js';
import { findOne } from './findOne.js';
import { findVersions } from './findVersions.js';
import { init } from './init.js';
import { migrateFresh } from './migrateFresh.js';
import { queryDrafts } from './queryDrafts.js';
import { beginTransaction } from './transactions/beginTransaction.js';
import { commitTransaction } from './transactions/commitTransaction.js';
import { rollbackTransaction } from './transactions/rollbackTransaction.js';
import { updateGlobal } from './updateGlobal.js';
import { updateGlobalVersion } from './updateGlobalVersion.js';
import { updateOne } from './updateOne.js';
import { updateVersion } from './updateVersion.js';
export function mongooseAdapter({ autoPluralization = true, connectOptions, disableIndexHints = false, migrationDir: migrationDirArg, mongoMemoryServer, transactionOptions = {}, url }) {
    function adapter({ payload }) {
        const migrationDir = findMigrationDir(migrationDirArg);
        mongoose.set('strictQuery', false);
        return createDatabaseAdapter({
            name: 'mongoose',
            // Mongoose-specific
            autoPluralization,
            collections: {},
            connectOptions: connectOptions || {},
            connection: undefined,
            count,
            disableIndexHints,
            globals: undefined,
            mongoMemoryServer,
            sessions: {},
            transactionOptions: transactionOptions === false ? undefined : transactionOptions,
            url,
            versions: {},
            // DatabaseAdapter
            beginTransaction: transactionOptions ? beginTransaction : undefined,
            commitTransaction,
            connect,
            create,
            createGlobal,
            createGlobalVersion,
            createMigration,
            createVersion,
            defaultIDType: 'text',
            deleteMany,
            deleteOne,
            deleteVersions,
            destroy,
            find,
            findGlobal,
            findGlobalVersions,
            findOne,
            findVersions,
            init,
            migrateFresh,
            migrationDir,
            payload,
            queryDrafts,
            rollbackTransaction,
            updateGlobal,
            updateGlobalVersion,
            updateOne,
            updateVersion
        });
    }
    return {
        defaultIDType: 'text',
        init: adapter
    };
}
/**
 * Attempt to find migrations directory.
 *
 * Checks for the following directories in order:
 * - `migrationDir` argument from Payload config
 * - `src/migrations`
 * - `dist/migrations`
 * - `migrations`
 *
 * Defaults to `src/migrations`
 *
 * @param migrationDir
 * @returns
 */ function findMigrationDir(migrationDir) {
    const cwd = process.cwd();
    const srcDir = path.resolve(cwd, 'src/migrations');
    const distDir = path.resolve(cwd, 'dist/migrations');
    const relativeMigrations = path.resolve(cwd, 'migrations');
    // Use arg if provided
    if (migrationDir) return migrationDir;
    // Check other common locations
    if (fs.existsSync(srcDir)) {
        return srcDir;
    }
    if (fs.existsSync(distDir)) {
        return distDir;
    }
    if (fs.existsSync(relativeMigrations)) {
        return relativeMigrations;
    }
    return srcDir;
}

//# sourceMappingURL=index.js.map