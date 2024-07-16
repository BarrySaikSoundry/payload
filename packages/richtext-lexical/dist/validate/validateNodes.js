export async function validateNodes({ nodeValidations, nodes, validation: validationFromProps }) {
    for (const node of nodes){
        // Validate node
        if (nodeValidations && typeof nodeValidations?.has === 'function' && nodeValidations?.has(node.type)) {
            const validations = nodeValidations.get(node.type);
            for (const validation of validations){
                const validationResult = await validation({
                    node,
                    nodeValidations,
                    validation: validationFromProps
                });
                if (validationResult !== true) {
                    return `${node.type} node failed to validate: ${validationResult}`;
                }
            }
        }
        // Validate node's children
        if ('children' in node && node?.children) {
            const childrenValidationResult = await validateNodes({
                nodeValidations,
                nodes: node.children,
                validation: validationFromProps
            });
            if (childrenValidationResult !== true) {
                return childrenValidationResult;
            }
        }
    }
    return true;
}

//# sourceMappingURL=validateNodes.js.map