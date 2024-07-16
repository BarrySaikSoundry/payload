import path from 'path';
export const getGenerateURL = ({ bucket, config: { endpoint } })=>({ filename, prefix = '' })=>{
        const stringifiedEndpoint = typeof endpoint === 'string' ? endpoint : endpoint?.toString();
        return `${stringifiedEndpoint}/${bucket}/${path.posix.join(prefix, filename)}`;
    };

//# sourceMappingURL=generateURL.js.map