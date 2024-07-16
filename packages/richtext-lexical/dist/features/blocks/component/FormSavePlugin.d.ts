import type { Data, FormState } from 'payload';
import type React from 'react';
type Props = {
    onChange?: ({ fullFieldsWithValues, newFormData, }: {
        fullFieldsWithValues: FormState;
        newFormData: Data;
    }) => void;
};
export declare const FormSavePlugin: React.FC<Props>;
export {};
//# sourceMappingURL=FormSavePlugin.d.ts.map