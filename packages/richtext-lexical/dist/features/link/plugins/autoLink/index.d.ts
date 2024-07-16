import type { PluginComponent } from '../../../typesClient.js';
import type { ClientProps } from '../../feature.client.js';
import type { LinkFields } from '../../nodes/types.js';
interface LinkMatcherResult {
    fields?: LinkFields;
    index: number;
    length: number;
    text: string;
    url: string;
}
export type LinkMatcher = (text: string) => LinkMatcherResult | null;
export declare function createLinkMatcherWithRegExp(regExp: RegExp, urlTransformer?: (text: string) => string): (text: string) => {
    index: number;
    length: number;
    text: string;
    url: string;
};
export declare const AutoLinkPlugin: PluginComponent<ClientProps>;
export {};
//# sourceMappingURL=index.d.ts.map