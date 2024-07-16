import type { UIField } from 'payload';
interface FieldFunctionProps {
    /**
     * Path to the description field to use for the preview
     *
     * @default 'meta.description'
     */
    descriptionPath?: string;
    /**
     * Path to the image field to use for the preview
     *
     * @default 'meta.image'
     */
    imagePath?: string;
    overrides?: Partial<UIField>;
    /**
     * Path to the title field to use for the preview
     *
     * @default 'meta.title'
     */
    titlePath?: string;
}
type FieldFunction = ({ overrides }: FieldFunctionProps) => UIField;
export declare const OverviewField: FieldFunction;
export {};
//# sourceMappingURL=index.d.ts.map