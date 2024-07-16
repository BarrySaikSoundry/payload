import path from 'path';
export const getGenerateURL = ({ bucket, config: { endpoint } })=>({ filename, prefix = '' })=>{
        return `${endpoint}/${bucket}/${path.posix.join(prefix, filename)}`;
    };

//# sourceMappingURL=generateURL.js.map