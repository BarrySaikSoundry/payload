import type * as ts from 'typescript';
export declare function compile(sourcecode: string, filename: string, options: {
    fallbackToTs?: (filename: string) => boolean;
} & ts.CompilerOptions): Promise<string>;
//# sourceMappingURL=compile.d.ts.map