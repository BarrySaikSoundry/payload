import parseRange from 'range-parser';
const getRangeFromHeader = async (blockBlobClient, rangeHeader)=>{
    const fullRange = {
        end: undefined,
        start: 0
    };
    if (!rangeHeader) {
        return fullRange;
    }
    const size = await blockBlobClient.getProperties().then((props)=>props.contentLength);
    if (size === undefined) {
        return fullRange;
    }
    const range = parseRange(size, rangeHeader);
    if (range === -1 || range === -2 || range.type !== 'bytes' || range.length !== 1) {
        return fullRange;
    }
    return range[0];
};
export default getRangeFromHeader;

//# sourceMappingURL=getRangeFromHeader.js.map