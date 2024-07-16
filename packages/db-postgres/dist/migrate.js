/* eslint-disable no-restricted-syntax, no-await-in-loop */ import { createRequire } from 'module';
import { commitTransaction, initTransaction, killTransaction, readMigrationFiles } from 'payload';
import prompts from 'prompts';
import { createMigrationTable } from './utilities/createMigrationTable.js';
import { migrationTableExists } from './utilities/migrationTableExists.js';
import { parseError } from './utilities/parseError.js';
const require = createRequire(import.meta.url);
export async function migrate() {
    const { payload } = this;
    const migrationFiles = await readMigrationFiles({
        payload
    });
    if (!migrationFiles.length) {
        payload.logger.info({
            msg: 'No migrations to run.'
        });
        return;
    }
    let latestBatch = 0;
    let migrationsInDB = [];
    const hasMigrationTable = await migrationTableExists(this.drizzle);
    if (hasMigrationTable) {
        ({ docs: migrationsInDB } = await payload.find({
            collection: 'payload-migrations',
            limit: 0,
            sort: '-name'
        }));
        if (Number(migrationsInDB?.[0]?.batch) > 0) {
            latestBatch = Number(migrationsInDB[0]?.batch);
        }
    } else {
        await createMigrationTable(this);
    }
    if (migrationsInDB.find((m)=>m.batch === -1)) {
        const { confirm: runMigrations } = await prompts({
            name: 'confirm',
            type: 'confirm',
            initial: false,
            message: "It looks like you've run Payload in dev mode, meaning you've dynamically pushed changes to your database.\n\n" + "If you'd like to run migrations, data loss will occur. Would you like to proceed?"
        }, {
            onCancel: ()=>{
                process.exit(0);
            }
        });
        if (!runMigrations) {
            process.exit(0);
        }
    }
    const newBatch = latestBatch + 1;
    // Execute 'up' function for each migration sequentially
    for (const migration of migrationFiles){
        const alreadyRan = migrationsInDB.find((existing)=>existing.name === migration.name);
        // If already ran, skip
        if (alreadyRan) {
            continue; // eslint-disable-line no-continue
        }
        await runMigrationFile(payload, migration, newBatch);
    }
}
async function runMigrationFile(payload, migration, batch) {
    const { generateDrizzleJson } = require('drizzle-kit/payload');
    const start = Date.now();
    const req = {
        payload
    };
    payload.logger.info({
        msg: `Migrating: ${migration.name}`
    });
    const pgAdapter = payload.db;
    const drizzleJSON = generateDrizzleJson(pgAdapter.schema);
    try {
        await initTransaction(req);
        await migration.up({
            payload,
            req
        });
        payload.logger.info({
            msg: `Migrated:  ${migration.name} (${Date.now() - start}ms)`
        });
        await payload.create({
            collection: 'payload-migrations',
            data: {
                name: migration.name,
                batch,
                schema: drizzleJSON
            },
            req
        });
        await commitTransaction(req);
    } catch (err) {
        await killTransaction(req);
        payload.logger.error({
            err,
            msg: parseError(err, `Error running migration ${migration.name}`)
        });
    }
}

//# sourceMappingURL=migrate.js.map