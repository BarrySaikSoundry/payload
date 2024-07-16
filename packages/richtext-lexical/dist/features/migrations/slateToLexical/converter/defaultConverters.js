import { SlateBlockquoteConverter } from './converters/blockquote/index.js';
import { SlateHeadingConverter } from './converters/heading/index.js';
import { SlateIndentConverter } from './converters/indent/index.js';
import { SlateLinkConverter } from './converters/link/index.js';
import { SlateListItemConverter } from './converters/listItem/index.js';
import { SlateOrderedListConverter } from './converters/orderedList/index.js';
import { SlateRelationshipConverter } from './converters/relationship/index.js';
import { SlateUnknownConverter } from './converters/unknown/index.js';
import { SlateUnorderedListConverter } from './converters/unorderedList/index.js';
import { SlateUploadConverter } from './converters/upload/index.js';
export const defaultSlateConverters = [
    SlateBlockquoteConverter,
    SlateHeadingConverter,
    SlateIndentConverter,
    SlateLinkConverter,
    SlateListItemConverter,
    SlateOrderedListConverter,
    SlateRelationshipConverter,
    SlateUnorderedListConverter,
    SlateUploadConverter,
    SlateUnknownConverter
];

//# sourceMappingURL=defaultConverters.js.map