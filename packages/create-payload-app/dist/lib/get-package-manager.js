import execa from 'execa';
import fse from 'fs-extra';
export async function getPackageManager(args) {
    const { cliArgs, projectDir } = args;
    try {
        // Check for yarn.lock, package-lock.json, or pnpm-lock.yaml
        let detected = 'npm';
        if (cliArgs?.['--use-pnpm'] || fse.existsSync(`${projectDir}/pnpm-lock.yaml`) || await commandExists('pnpm')) {
            detected = 'pnpm';
        } else if (cliArgs?.['--use-yarn'] || fse.existsSync(`${projectDir}/yarn.lock`) || await commandExists('yarn')) {
            detected = 'yarn';
        } else if (cliArgs?.['--use-npm'] || fse.existsSync(`${projectDir}/package-lock.json`)) {
            detected = 'npm';
        }
        return detected;
    } catch (error) {
        return 'npm';
    }
}
async function commandExists(command) {
    try {
        await execa.command(`command -v ${command}`);
        return true;
    } catch  {
        return false;
    }
}

//# sourceMappingURL=get-package-manager.js.map