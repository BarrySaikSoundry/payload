import { type CellComponentProps, type SanitizedCollectionConfig } from 'payload';
import type { FieldMap } from '../../providers/ComponentMap/buildComponentMap/types.js';
import type { ColumnPreferences } from '../../providers/ListInfo/index.js';
import type { Column } from '../Table/index.js';
type Args = {
    cellProps: Partial<CellComponentProps>[];
    columnPreferences: ColumnPreferences;
    columns?: ColumnPreferences;
    enableRowSelections: boolean;
    fieldMap: FieldMap;
    useAsTitle: SanitizedCollectionConfig['admin']['useAsTitle'];
};
export declare const buildColumnState: (args: Args) => Column[];
export {};
//# sourceMappingURL=buildColumnState.d.ts.map