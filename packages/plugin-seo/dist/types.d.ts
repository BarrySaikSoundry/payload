import type { DocumentInfoContext } from '@payloadcms/ui';
import type { Field, TextField, TextareaField, UploadField } from 'payload';
export type GenerateTitle<T = any> = (args: {
    doc: T;
    locale?: string;
} & DocumentInfoContext) => Promise<string> | string;
export type GenerateDescription<T = any> = (args: {
    doc: T;
    locale?: string;
} & DocumentInfoContext) => Promise<string> | string;
export type GenerateImage<T = any> = (args: {
    doc: T;
    locale?: string;
} & DocumentInfoContext) => Promise<string> | string;
export type GenerateURL<T = any> = (args: {
    doc: T;
    locale?: string;
} & DocumentInfoContext) => Promise<string> | string;
export type SEOPluginConfig = {
    collections?: string[];
    fieldOverrides?: {
        description?: Partial<TextareaField>;
        image?: Partial<UploadField>;
        title?: Partial<TextField>;
    };
    fields?: Field[];
    generateDescription?: GenerateDescription;
    generateImage?: GenerateImage;
    generateTitle?: GenerateTitle;
    generateURL?: GenerateURL;
    globals?: string[];
    interfaceName?: string;
    tabbedUI?: boolean;
    uploadsCollection?: string;
};
export type Meta = {
    description?: string;
    image?: any;
    keywords?: string;
    title?: string;
};
//# sourceMappingURL=types.d.ts.map