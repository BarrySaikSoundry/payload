import type { I18nClient, Language } from '@payloadcms/translations';
import type { ClientConfig, LanguageOptions } from 'payload';
import React from 'react';
import type { ComponentMap } from '../ComponentMap/buildComponentMap/types.js';
import type { Theme } from '../Theme/index.js';
type Props = {
    children: React.ReactNode;
    componentMap: ComponentMap;
    config: ClientConfig;
    dateFNSKey: Language['dateFNSKey'];
    fallbackLang: ClientConfig['i18n']['fallbackLanguage'];
    languageCode: string;
    languageOptions: LanguageOptions;
    switchLanguageServerAction?: (lang: string) => Promise<void>;
    theme: Theme;
    translations: I18nClient['translations'];
};
export declare const RootProvider: React.FC<Props>;
export {};
//# sourceMappingURL=index.d.ts.map