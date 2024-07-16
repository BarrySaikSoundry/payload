export declare const withPayloadStatement: {
    cjs: string;
    esm: string;
};
type NextConfigType = 'cjs' | 'esm';
export declare const wrapNextConfig: (args: {
    nextConfigPath: string;
    nextConfigType: NextConfigType;
}) => void;
/**
 * Parses config content with AST and wraps it with withPayload function
 */
export declare function parseAndModifyConfigContent(content: string, configType: NextConfigType): {
    modifiedConfigContent: string;
    success: boolean;
};
export {};
//# sourceMappingURL=wrap-next-config.d.ts.map