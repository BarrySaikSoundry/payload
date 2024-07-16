export const deleteFromSearch = async ({ doc, req: { payload }, req })=>{
    try {
        const searchDocQuery = await payload.find({
            collection: 'search',
            depth: 0,
            req,
            where: {
                'doc.value': {
                    equals: doc.id
                }
            }
        });
        if (searchDocQuery?.docs?.[0]) {
            await payload.delete({
                id: searchDocQuery?.docs?.[0]?.id,
                collection: 'search',
                req
            });
        }
    } catch (err) {
        payload.logger.error({
            err: `Error deleting search doc: ${err}`
        });
    }
    return doc;
};

//# sourceMappingURL=deleteFromSearch.js.map