'use client';
import { useAddClientFunction, useFieldProps, useTableCell } from '@payloadcms/ui';
const useLexicalFeatureProp = (featureKey, componentKey, prop)=>{
    const { schemaPath: schemaPathFromFieldProps } = useFieldProps();
    const tableCell = useTableCell();
    const schemaPathFromCellProps = tableCell?.cellProps?.schemaPath;
    const schemaPath = schemaPathFromCellProps || schemaPathFromFieldProps // schemaPathFromCellProps needs to have priority, as there can be cells within fields (e.g. list drawers) and the cell schemaPath needs to be used there - not the parent field schemaPath. There cannot be fields within cells.
    ;
    useAddClientFunction(`lexicalFeature.${schemaPath}.${featureKey}.lexical_internal_components.${componentKey}`, prop);
};
export const createFeaturePropComponent = (prop)=>{
    return (props)=>{
        useLexicalFeatureProp(props.featureKey, props.componentKey, prop);
        return null;
    };
};

//# sourceMappingURL=createFeaturePropComponent.js.map