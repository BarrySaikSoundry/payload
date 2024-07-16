import { APIError } from '../../../errors/index.js';
import { getFileByPath } from '../../../uploads/getFileByPath.js';
import { createLocalReq } from '../../../utilities/createLocalReq.js';
import { updateOperation } from '../update.js';
import { updateByIDOperation } from '../updateByID.js';
async function updateLocal(payload, options) {
    const { id, autosave, collection: collectionSlug, data, depth, draft, file, filePath, overrideAccess = true, overwriteExistingFiles = false, showHiddenFields, where } = options;
    const collection = payload.collections[collectionSlug];
    if (!collection) {
        throw new APIError(`The collection with slug ${String(collectionSlug)} can't be found. Update Operation.`);
    }
    const req = await createLocalReq(options, payload);
    req.file = file ?? await getFileByPath(filePath);
    const args = {
        id,
        autosave,
        collection,
        data,
        depth,
        draft,
        overrideAccess,
        overwriteExistingFiles,
        payload,
        req,
        showHiddenFields,
        where
    };
    if (options.id) {
        return updateByIDOperation(args);
    }
    return updateOperation(args);
}
export default updateLocal;

//# sourceMappingURL=update.js.map