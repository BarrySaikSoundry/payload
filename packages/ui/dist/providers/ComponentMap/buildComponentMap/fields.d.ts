import type { I18nClient } from '@payloadcms/translations';
import type { Field, FieldWithPath, SanitizedConfig } from 'payload';
import type { WithServerSidePropsPrePopulated } from './index.js';
import type { FieldMap } from './types.js';
export declare const mapFields: (args: {
    WithServerSideProps: WithServerSidePropsPrePopulated;
    config: SanitizedConfig;
    /**
     * If mapFields is used outside of collections, you might not want it to add an id field
     */
    disableAddingID?: boolean;
    fieldSchema: FieldWithPath[];
    filter?: (field: Field) => boolean;
    i18n: I18nClient;
    parentPath?: string;
    readOnly?: boolean;
}) => FieldMap;
//# sourceMappingURL=fields.d.ts.map