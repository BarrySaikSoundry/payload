import type { DocumentPreferences, ErrorProps, FieldDescriptionProps, LabelProps, Locale, SanitizedLabelProps, SanitizedLocalizationConfig, User, Validate } from 'payload';
export declare const fieldBaseClass = "field-type";
export type FormFieldBase = {
    AfterInput?: React.ReactNode;
    BeforeInput?: React.ReactNode;
    CustomDescription?: React.ReactNode;
    CustomError?: React.ReactNode;
    CustomLabel?: React.ReactNode;
    className?: string;
    custom?: Record<string, any>;
    descriptionProps?: FieldDescriptionProps;
    disabled?: boolean;
    docPreferences?: DocumentPreferences;
    errorProps?: ErrorProps;
    label?: LabelProps['label'];
    labelProps?: SanitizedLabelProps;
    locale?: Locale;
    localized?: boolean;
    path?: string;
    readOnly?: boolean;
    required?: boolean;
    rtl?: boolean;
    style?: React.CSSProperties;
    user?: User;
    validate?: Validate;
};
/**
 * Determines whether a field should be displayed as right-to-left (RTL) based on its configuration, payload's localization configuration and the adming user's currently enabled locale.

 * @returns Whether the field should be displayed as RTL.
 */
export declare function isFieldRTL({ fieldLocalized, fieldRTL, locale, localizationConfig, }: {
    fieldLocalized: boolean;
    fieldRTL: boolean;
    locale: Locale;
    localizationConfig?: SanitizedLocalizationConfig;
}): boolean;
//# sourceMappingURL=index.d.ts.map