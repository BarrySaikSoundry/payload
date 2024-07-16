import React from 'react';
import './index.scss';
export type Props = {
    className?: string;
    mimeTypes?: string[];
    onChange: (e: FileList) => void;
    onPasteUrlClick?: () => void;
};
export declare const Dropzone: React.FC<Props>;
//# sourceMappingURL=index.d.ts.map