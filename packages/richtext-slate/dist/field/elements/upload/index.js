import { Button } from './Button/index.js';
import { Element } from './Element/index.js';
import { WithUpload } from './plugin.js';
import { uploadName } from './shared.js';
export const upload = {
    name: uploadName,
    Button,
    Element,
    plugins: [
        WithUpload
    ]
};

//# sourceMappingURL=index.js.map