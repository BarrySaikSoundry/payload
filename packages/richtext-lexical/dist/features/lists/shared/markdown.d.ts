import type { ListNode, ListType } from '@lexical/list';
import type { ElementTransformer } from '@lexical/markdown';
import type { ElementNode } from 'lexical';
export declare const listReplace: (listType: ListType) => ElementTransformer["replace"];
export declare const listExport: (listNode: ListNode, exportChildren: (node: ElementNode) => string, depth: number) => string;
//# sourceMappingURL=markdown.d.ts.map