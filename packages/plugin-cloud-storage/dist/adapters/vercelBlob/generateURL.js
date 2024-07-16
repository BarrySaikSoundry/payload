import path from 'path';
export const getGenerateUrl = ({ baseUrl })=>{
    return ({ filename, prefix = '' })=>{
        return `${baseUrl}/${path.posix.join(prefix, filename)}`;
    };
};

//# sourceMappingURL=generateURL.js.map