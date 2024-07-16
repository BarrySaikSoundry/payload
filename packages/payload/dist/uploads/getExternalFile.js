import { APIError } from '../errors/index.js';
export const getExternalFile = async ({ data, req, uploadConfig })=>{
    const { filename, url } = data;
    if (typeof url === 'string') {
        let fileURL = url;
        if (!url.startsWith('http')) {
            const baseUrl = req.headers.get('origin') || `${req.protocol}://${req.headers.get('host')}`;
            fileURL = `${baseUrl}${url}`;
        }
        const headers = uploadConfig.externalFileHeaderFilter ? uploadConfig.externalFileHeaderFilter(Object.fromEntries(new Headers(req.headers))) : {
            cookie: req.headers?.get('cookie')
        };
        const res = await fetch(fileURL, {
            credentials: 'include',
            headers,
            method: 'GET'
        });
        if (!res.ok) throw new APIError(`Failed to fetch file from ${fileURL}`, res.status);
        const data = await res.arrayBuffer();
        return {
            name: filename,
            data: Buffer.from(data),
            mimetype: res.headers.get('content-type') || undefined,
            size: Number(res.headers.get('content-length')) || 0
        };
    }
    throw new APIError('Invalid file url', 400);
};

//# sourceMappingURL=getExternalFile.js.map