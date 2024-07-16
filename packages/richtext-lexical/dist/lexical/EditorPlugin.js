import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
export const EditorPlugin = ({ anchorElem, clientProps, plugin })=>{
    if (plugin.position === 'floatingAnchorElem') {
        return plugin.Component && /*#__PURE__*/ _jsx(plugin.Component, {
            anchorElem: anchorElem,
            clientProps: clientProps
        });
    }
    return plugin.Component && /*#__PURE__*/ _jsx(plugin.Component, {
        clientProps: clientProps
    });
};

//# sourceMappingURL=EditorPlugin.js.map