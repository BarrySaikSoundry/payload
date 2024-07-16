import { HeadingConverter } from './converters/heading/index.js';
import { LinkConverter } from './converters/link/index.js';
import { ListConverter } from './converters/list/index.js';
import { ListItemConverter } from './converters/listItem/index.js';
import { QuoteConverter } from './converters/quote/index.js';
import { UnknownConverter } from './converters/unknown/index.js';
import { UploadConverter } from './converters/upload/index.js';
export const defaultConverters = [
    HeadingConverter,
    LinkConverter,
    ListConverter,
    ListItemConverter,
    QuoteConverter,
    UnknownConverter,
    UploadConverter
];

//# sourceMappingURL=defaultConverters.js.map