import Iterable from './Iterable/index.js';
import Nested from './Nested/index.js';
import Select from './Select/index.js';
import Tabs from './Tabs/index.js';
import Text from './Text/index.js';
export default {
    array: Iterable,
    blocks: Iterable,
    checkbox: Text,
    code: Text,
    collapsible: Nested,
    date: Text,
    email: Text,
    group: Nested,
    json: Text,
    number: Text,
    point: Text,
    radio: Select,
    relationship: null,
    richText: Text,
    row: Nested,
    select: Select,
    tabs: Tabs,
    text: Text,
    textarea: Text,
    upload: null
};

//# sourceMappingURL=index.js.map