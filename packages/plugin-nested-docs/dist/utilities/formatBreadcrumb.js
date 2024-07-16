export const formatBreadcrumb = (pluginConfig, collection, docs)=>{
    let url = undefined;
    let label;
    const lastDoc = docs[docs.length - 1];
    if (typeof pluginConfig?.generateURL === 'function') {
        url = pluginConfig.generateURL(docs, lastDoc);
    }
    if (typeof pluginConfig?.generateLabel === 'function') {
        label = pluginConfig.generateLabel(docs, lastDoc);
    } else {
        const useAsTitle = collection?.admin?.useAsTitle || 'id';
        label = lastDoc[useAsTitle];
    }
    return {
        doc: lastDoc.id,
        label,
        url
    };
};

//# sourceMappingURL=formatBreadcrumb.js.map