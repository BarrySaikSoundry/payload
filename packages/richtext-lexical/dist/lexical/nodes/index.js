export function getEnabledNodes({ editorConfig }) {
    return editorConfig.features.nodes.map((node)=>{
        if ('node' in node) {
            return node.node;
        }
        return node;
    });
}

//# sourceMappingURL=index.js.map