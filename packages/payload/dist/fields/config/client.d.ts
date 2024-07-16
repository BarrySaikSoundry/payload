import type { TFunction } from '@payloadcms/translations';
import type { Field, FieldBase } from '../../fields/config/types.js';
export type ClientFieldConfig = Omit<Field, 'access' | 'defaultValue' | 'hooks' | 'validate'>;
export type ServerOnlyFieldProperties = 'editor' | 'filterOptions' | 'label' | 'typescriptSchema' | keyof Pick<FieldBase, 'access' | 'custom' | 'defaultValue' | 'hooks' | 'validate'>;
export type ServerOnlyFieldAdminProperties = keyof Pick<FieldBase['admin'], 'components' | 'condition' | 'description'>;
export declare const createClientFieldConfig: ({ field: incomingField, t, }: {
    field: Field;
    t: TFunction;
}) => {
    admin?: {
        components?: {
            RowLabel?: import("../../index.js").RowLabelComponent;
        } & {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        initCollapsed?: boolean;
        isSortable?: boolean;
    } & {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        disableListFilter?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        position?: "sidebar";
        readOnly?: boolean;
        style?: import("react").CSSProperties;
        width?: string;
    };
    dbName?: import("../../index.js").DBIdentifierName;
    fields: Field[];
    interfaceName?: string;
    labels?: import("../../fields/config/types.js").Labels;
    maxRows?: number;
    minRows?: number;
    type: "array";
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
} | {
    admin?: {
        initCollapsed?: boolean;
        isSortable?: boolean;
    } & {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        disableListFilter?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        position?: "sidebar";
        readOnly?: boolean;
        style?: import("react").CSSProperties;
        width?: string;
    };
    blocks: import("../../fields/config/types.js").Block[];
    defaultValue?: any;
    labels?: import("../../fields/config/types.js").Labels;
    maxRows?: number;
    minRows?: number;
    type: "blocks";
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    custom?: Record<string, any>;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
} | {
    admin?: {
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
            afterInput?: import("../../index.js").CustomComponent[];
            beforeInput?: import("../../index.js").CustomComponent[];
        };
    } & {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        disableListFilter?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        position?: "sidebar";
        readOnly?: boolean;
        style?: import("react").CSSProperties;
        width?: string;
    };
    type: "checkbox";
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
} | {
    admin?: {
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
        };
        editorOptions?: import("@monaco-editor/react").EditorProps["options"];
        language?: string;
    } & {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        disableListFilter?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        position?: "sidebar";
        readOnly?: boolean;
        style?: import("react").CSSProperties;
        width?: string;
    };
    maxLength?: number;
    minLength?: number;
    type: "code";
    name: string;
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    custom?: Record<string, any>;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    defaultValue?: any;
    hidden?: boolean;
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
} | {
    fields: Field[];
    type: "collapsible";
    admin: {
        components: {
            RowLabel: import("../../index.js").RowLabelComponent;
        } & {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        initCollapsed?: boolean;
    } & {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        disableListFilter?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        position?: "sidebar";
        readOnly?: boolean;
        style?: import("react").CSSProperties;
        width?: string;
    };
    label?: Required<FieldBase["label"]>;
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    custom?: Record<string, any>;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    defaultValue?: any;
    hidden?: boolean;
    index?: boolean;
    localized?: boolean;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
} | {
    fields: Field[];
    type: "collapsible";
    admin?: {
        initCollapsed?: boolean;
    } & {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        disableListFilter?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        position?: "sidebar";
        readOnly?: boolean;
        style?: import("react").CSSProperties;
        width?: string;
    };
    label: Required<FieldBase["label"]>;
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    custom?: Record<string, any>;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    defaultValue?: any;
    hidden?: boolean;
    index?: boolean;
    localized?: boolean;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
} | {
    admin?: {
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
            afterInput?: import("../../index.js").CustomComponent[];
            beforeInput?: import("../../index.js").CustomComponent[];
        };
        date?: import("../../index.js").ConditionalDateProps;
        placeholder?: Record<string, string> | string;
    } & {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        disableListFilter?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        position?: "sidebar";
        readOnly?: boolean;
        style?: import("react").CSSProperties;
        width?: string;
    };
    type: "date";
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
} | {
    admin?: {
        autoComplete?: string;
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
            afterInput?: import("../../index.js").CustomComponent[];
            beforeInput?: import("../../index.js").CustomComponent[];
        };
        placeholder?: Record<string, string> | string;
    } & {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        disableListFilter?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        position?: "sidebar";
        readOnly?: boolean;
        style?: import("react").CSSProperties;
        width?: string;
    };
    type: "email";
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
} | {
    admin?: {
        hideGutter?: boolean;
    } & {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        disableListFilter?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        position?: "sidebar";
        readOnly?: boolean;
        style?: import("react").CSSProperties;
        width?: string;
    };
    fields: Field[];
    interfaceName?: string;
    type: "group";
    name: string;
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    custom?: Record<string, any>;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    defaultValue?: any;
    hidden?: boolean;
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
} | {
    admin?: {
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
        };
        editorOptions?: import("@monaco-editor/react").EditorProps["options"];
    } & {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        disableListFilter?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        position?: "sidebar";
        readOnly?: boolean;
        style?: import("react").CSSProperties;
        width?: string;
    };
    jsonSchema?: {
        fileMatch: string[];
        schema: import("json-schema").JSONSchema4;
        uri: string;
    };
    type: "json";
    name: string;
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    custom?: Record<string, any>;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    defaultValue?: any;
    hidden?: boolean;
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
} | {
    admin?: {
        autoComplete?: string;
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
            afterInput?: import("../../index.js").CustomComponent[];
            beforeInput?: import("../../index.js").CustomComponent[];
        };
        placeholder?: Record<string, string> | string;
        step?: number;
    } & {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        disableListFilter?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        position?: "sidebar";
        readOnly?: boolean;
        style?: import("react").CSSProperties;
        width?: string;
    };
    max?: number;
    min?: number;
    type: "number";
    hasMany: true;
    maxRows?: number;
    minRows?: number;
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
} | {
    admin?: {
        autoComplete?: string;
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
            afterInput?: import("../../index.js").CustomComponent[];
            beforeInput?: import("../../index.js").CustomComponent[];
        };
        placeholder?: Record<string, string> | string;
        step?: number;
    } & {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        disableListFilter?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        position?: "sidebar";
        readOnly?: boolean;
        style?: import("react").CSSProperties;
        width?: string;
    };
    max?: number;
    min?: number;
    type: "number";
    hasMany?: false | undefined;
    maxRows?: undefined;
    minRows?: undefined;
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
} | {
    type: "point";
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    admin?: {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        disableListFilter?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        position?: "sidebar";
        readOnly?: boolean;
        style?: import("react").CSSProperties;
        width?: string;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
} | {
    admin?: {
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
        };
        layout?: "horizontal" | "vertical";
    } & {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        disableListFilter?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        position?: "sidebar";
        readOnly?: boolean;
        style?: import("react").CSSProperties;
        width?: string;
    };
    dbName?: import("../../index.js").DBIdentifierName;
    enumName?: import("../../index.js").DBIdentifierName;
    options: import("../../fields/config/types.js").Option[];
    type: "radio";
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
} | {
    admin?: {
        sortOptions?: {
            [collectionSlug: import("../../index.js").CollectionSlug]: string;
        };
    } & ({
        allowCreate?: boolean;
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
        };
        isSortable?: boolean;
    } & {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        disableListFilter?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        position?: "sidebar";
        readOnly?: boolean;
        style?: import("react").CSSProperties;
        width?: string;
    });
    relationTo: import("../../index.js").CollectionSlug[];
    filterOptions?: import("../../fields/config/types.js").FilterOptions;
    hasMany: true;
    maxDepth?: number;
    type: "relationship";
    max?: number;
    maxRows?: number;
    min?: number;
    minRows?: number;
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
} | {
    admin?: {
        sortOptions?: {
            [collectionSlug: import("../../index.js").CollectionSlug]: string;
        };
    } & ({
        allowCreate?: boolean;
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
        };
        isSortable?: boolean;
    } & {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        disableListFilter?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        position?: "sidebar";
        readOnly?: boolean;
        style?: import("react").CSSProperties;
        width?: string;
    });
    relationTo: import("../../index.js").CollectionSlug[];
    filterOptions?: import("../../fields/config/types.js").FilterOptions;
    hasMany?: false;
    maxDepth?: number;
    type: "relationship";
    max?: undefined;
    maxRows?: undefined;
    min?: undefined;
    minRows?: undefined;
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
} | {
    admin?: {
        sortOptions?: string;
    } & ({
        allowCreate?: boolean;
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
        };
        isSortable?: boolean;
    } & {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        disableListFilter?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        position?: "sidebar";
        readOnly?: boolean;
        style?: import("react").CSSProperties;
        width?: string;
    });
    relationTo: import("../../index.js").CollectionSlug;
    filterOptions?: import("../../fields/config/types.js").FilterOptions;
    hasMany: true;
    maxDepth?: number;
    type: "relationship";
    max?: number;
    maxRows?: number;
    min?: number;
    minRows?: number;
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
} | {
    admin?: {
        sortOptions?: string;
    } & ({
        allowCreate?: boolean;
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
        };
        isSortable?: boolean;
    } & {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        disableListFilter?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        position?: "sidebar";
        readOnly?: boolean;
        style?: import("react").CSSProperties;
        width?: string;
    });
    relationTo: import("../../index.js").CollectionSlug;
    filterOptions?: import("../../fields/config/types.js").FilterOptions;
    hasMany?: false;
    maxDepth?: number;
    type: "relationship";
    max?: undefined;
    maxRows?: undefined;
    min?: undefined;
    minRows?: undefined;
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
} | {
    admin?: {
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
        };
    } & {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        disableListFilter?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        position?: "sidebar";
        readOnly?: boolean;
        style?: import("react").CSSProperties;
        width?: string;
    };
    editor?: import("../../index.js").RichTextAdapter<any, any, any> | import("../../index.js").RichTextAdapterProvider<any, any, any>;
    maxDepth?: number;
    type: "richText";
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
} | {
    admin?: import("../../fields/config/types.js").RowAdmin;
    fields: Field[];
    type: "row";
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    custom?: Record<string, any>;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    defaultValue?: any;
    hidden?: boolean;
    index?: boolean;
    localized?: boolean;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
} | {
    admin?: {
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
        };
        isClearable?: boolean;
        isSortable?: boolean;
    } & {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        disableListFilter?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        position?: "sidebar";
        readOnly?: boolean;
        style?: import("react").CSSProperties;
        width?: string;
    };
    dbName?: import("../../index.js").DBIdentifierName;
    enumName?: import("../../index.js").DBIdentifierName;
    hasMany?: boolean;
    options: import("../../fields/config/types.js").Option[];
    type: "select";
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
} | {
    admin?: import("../../fields/config/types.js").TabsAdmin;
    tabs: import("../../fields/config/types.js").Tab[];
    type: "tabs";
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    custom?: Record<string, any>;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    defaultValue?: any;
    hidden?: boolean;
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    required?: boolean;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
} | {
    admin?: {
        autoComplete?: string;
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
            afterInput?: import("../../index.js").CustomComponent[];
            beforeInput?: import("../../index.js").CustomComponent[];
        };
        placeholder?: Record<string, string> | string;
        rtl?: boolean;
    } & {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        disableListFilter?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        position?: "sidebar";
        readOnly?: boolean;
        style?: import("react").CSSProperties;
        width?: string;
    };
    maxLength?: number;
    minLength?: number;
    type: "text";
    hasMany: true;
    maxRows?: number;
    minRows?: number;
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
} | {
    admin?: {
        autoComplete?: string;
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
            afterInput?: import("../../index.js").CustomComponent[];
            beforeInput?: import("../../index.js").CustomComponent[];
        };
        placeholder?: Record<string, string> | string;
        rtl?: boolean;
    } & {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        disableListFilter?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        position?: "sidebar";
        readOnly?: boolean;
        style?: import("react").CSSProperties;
        width?: string;
    };
    maxLength?: number;
    minLength?: number;
    type: "text";
    hasMany?: false | undefined;
    maxRows?: undefined;
    minRows?: undefined;
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
} | {
    admin?: {
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
            afterInput?: import("../../index.js").CustomComponent[];
            beforeInput?: import("../../index.js").CustomComponent[];
        };
        placeholder?: Record<string, string> | string;
        rows?: number;
        rtl?: boolean;
    } & {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        disableListFilter?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        position?: "sidebar";
        readOnly?: boolean;
        style?: import("react").CSSProperties;
        width?: string;
    };
    maxLength?: number;
    minLength?: number;
    type: "textarea";
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
} | {
    admin: {
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Field: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        position?: string;
        width?: string;
    };
    custom?: Record<string, any>;
    label?: Record<string, string> | string;
    name: string;
    type: "ui";
} | {
    admin?: {
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
        };
    } & {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        disableListFilter?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        position?: "sidebar";
        readOnly?: boolean;
        style?: import("react").CSSProperties;
        width?: string;
    };
    filterOptions?: import("../../fields/config/types.js").FilterOptions;
    maxDepth?: number;
    relationTo: import("../../index.js").CollectionSlug;
    type: "upload";
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: Array<(args: {
        jsonSchema: import("json-schema").JSONSchema4;
    }) => import("json-schema").JSONSchema4>;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
};
export declare const createClientFieldConfigs: ({ fields, t, }: {
    fields: Field[];
    t: TFunction;
}) => Field[];
//# sourceMappingURL=client.d.ts.map