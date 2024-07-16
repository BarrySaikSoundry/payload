export const sanitizeEditViewProps = (props)=>{
    const clientSideProps = {
        ...props
    };
    delete clientSideProps.initPageResult.req;
    delete clientSideProps.initPageResult.collectionConfig;
    delete clientSideProps.initPageResult.globalConfig;
    return clientSideProps;
};

//# sourceMappingURL=sanitizeEditViewProps.js.map