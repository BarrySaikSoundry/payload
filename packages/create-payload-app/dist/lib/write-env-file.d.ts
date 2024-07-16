import type { CliArgs, ProjectTemplate } from '../types.js';
/** Parse and swap .env.example values and write .env */
export declare function writeEnvFile(args: {
    cliArgs: CliArgs;
    databaseUri: string;
    payloadSecret: string;
    projectDir: string;
    template?: ProjectTemplate;
}): Promise<void>;
//# sourceMappingURL=write-env-file.d.ts.map