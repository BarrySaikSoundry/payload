import { getGenerateUrl } from './generateURL.js';
import { getHandleDelete } from './handleDelete.js';
import { getHandleUpload } from './handleUpload.js';
import { getStaticHandler } from './staticHandler.js';
const defaultUploadOptions = {
    access: 'public',
    addRandomSuffix: false,
    cacheControlMaxAge: 60 * 60 * 24 * 365
};
/**
 * @deprecated Use [`@payloadcms/storage-vercel-blob`](https://www.npmjs.com/package/@payloadcms/storage-vercel-blob) instead.
 *
 * This adapter has been superceded by `@payloadcms/storage-vercel-blob` and will be removed in Payload 3.0.
 */ export const vercelBlobAdapter = ({ options = {}, token })=>({ collection, prefix })=>{
        if (!token) {
            throw new Error('The token argument is required for the Vercel Blob adapter.');
        }
        // Parse storeId from token
        const storeId = token.match(/^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i)?.[1].toLowerCase();
        if (!storeId) {
            throw new Error('Invalid token format for Vercel Blob adapter. Should be vercel_blob_rw_<store_id>_<random_string>.');
        }
        const { access, addRandomSuffix, cacheControlMaxAge } = {
            ...defaultUploadOptions,
            ...options
        };
        const baseUrl = `https://${storeId}.${access}.blob.vercel-storage.com`;
        return {
            name: 'vercel-blob',
            generateURL: getGenerateUrl({
                baseUrl,
                prefix
            }),
            handleDelete: getHandleDelete({
                baseUrl,
                prefix,
                token
            }),
            handleUpload: getHandleUpload({
                access,
                addRandomSuffix,
                baseUrl,
                cacheControlMaxAge,
                prefix,
                token
            }),
            staticHandler: getStaticHandler({
                baseUrl,
                token
            }, collection)
        };
    };

//# sourceMappingURL=index.js.map