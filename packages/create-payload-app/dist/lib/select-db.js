import * as p from '@clack/prompts';
import slugify from '@sindresorhus/slugify';
const dbChoiceRecord = {
    mongodb: {
        dbConnectionPrefix: 'mongodb://127.0.0.1/',
        title: 'MongoDB',
        value: 'mongodb'
    },
    postgres: {
        dbConnectionPrefix: 'postgres://postgres:<password>@127.0.0.1:5432/',
        title: 'PostgreSQL (beta)',
        value: 'postgres'
    }
};
export async function selectDb(args, projectName) {
    let dbType = undefined;
    if (args['--db']) {
        if (!Object.values(dbChoiceRecord).some((dbChoice)=>dbChoice.value === args['--db'])) {
            throw new Error(`Invalid database type given. Valid types are: ${Object.values(dbChoiceRecord).map((dbChoice)=>dbChoice.value).join(', ')}`);
        }
        dbType = args['--db'];
    } else {
        dbType = await p.select({
            initialValue: 'mongodb',
            message: `Select a database`,
            options: [
                {
                    label: 'MongoDB',
                    value: 'mongodb'
                },
                {
                    label: 'Postgres',
                    value: 'postgres'
                }
            ]
        });
        if (p.isCancel(dbType)) process.exit(0);
    }
    const dbChoice = dbChoiceRecord[dbType];
    let dbUri = undefined;
    const initialDbUri = `${dbChoice.dbConnectionPrefix}${projectName === '.' ? `payload-${getRandomDigitSuffix()}` : slugify(projectName)}`;
    if (args['--db-accept-recommended']) {
        dbUri = initialDbUri;
    } else if (args['--db-connection-string']) {
        dbUri = args['--db-connection-string'];
    } else {
        dbUri = await p.text({
            initialValue: initialDbUri,
            message: `Enter ${dbChoice.title.split(' ')[0]} connection string`
        });
        if (p.isCancel(dbUri)) process.exit(0);
    }
    return {
        type: dbChoice.value,
        dbUri
    };
}
function getRandomDigitSuffix() {
    return (Math.random() * Math.pow(10, 6)).toFixed(0);
}

//# sourceMappingURL=select-db.js.map