import type { CliArgs, DbDetails, PackageManager, ProjectTemplate } from '../types.js';
export declare function createProject(args: {
    cliArgs: CliArgs;
    dbDetails?: DbDetails;
    packageManager: PackageManager;
    projectDir: string;
    projectName: string;
    template: ProjectTemplate;
}): Promise<void>;
export declare function updatePackageJSON(args: {
    projectDir: string;
    projectName: string;
}): Promise<void>;
//# sourceMappingURL=create-project.d.ts.map