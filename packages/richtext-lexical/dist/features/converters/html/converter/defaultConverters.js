import { LinebreakHTMLConverter } from './converters/linebreak.js';
import { ParagraphHTMLConverter } from './converters/paragraph.js';
import { TextHTMLConverter } from './converters/text.js';
export const defaultHTMLConverters = [
    ParagraphHTMLConverter,
    TextHTMLConverter,
    LinebreakHTMLConverter
];

//# sourceMappingURL=defaultConverters.js.map