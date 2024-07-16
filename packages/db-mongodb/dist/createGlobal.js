import sanitizeInternalFields from './utilities/sanitizeInternalFields.js';
import { withSession } from './withSession.js';
export const createGlobal = async function createGlobal({ slug, data, req = {} }) {
    const Model = this.globals;
    const global = {
        globalType: slug,
        ...data
    };
    const options = await withSession(this, req);
    let [result] = await Model.create([
        global
    ], options);
    result = JSON.parse(JSON.stringify(result));
    // custom id type reset
    result.id = result._id;
    result = sanitizeInternalFields(result);
    return result;
};

//# sourceMappingURL=createGlobal.js.map