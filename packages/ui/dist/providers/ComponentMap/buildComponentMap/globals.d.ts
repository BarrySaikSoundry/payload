import type { I18nClient } from '@payloadcms/translations';
import type { EditViewProps, SanitizedConfig, SanitizedGlobalConfig } from 'payload';
import React from 'react';
import type { WithServerSidePropsPrePopulated } from './index.js';
import type { GlobalComponentMap } from './types.js';
export declare const mapGlobals: ({ args, }: {
    args: {
        DefaultEditView: React.FC<EditViewProps>;
        WithServerSideProps: WithServerSidePropsPrePopulated;
        config: SanitizedConfig;
        globals: SanitizedGlobalConfig[];
        i18n: I18nClient;
        readOnly?: boolean;
    };
}) => {
    [key: SanitizedGlobalConfig["slug"]]: GlobalComponentMap;
};
//# sourceMappingURL=globals.d.ts.map