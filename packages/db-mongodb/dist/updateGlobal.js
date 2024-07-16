import sanitizeInternalFields from './utilities/sanitizeInternalFields.js';
import { withSession } from './withSession.js';
export const updateGlobal = async function updateGlobal({ slug, data, req = {} }) {
    const Model = this.globals;
    const options = {
        ...await withSession(this, req),
        lean: true,
        new: true
    };
    let result;
    result = await Model.findOneAndUpdate({
        globalType: slug
    }, data, options);
    result = JSON.parse(JSON.stringify(result));
    // custom id type reset
    result.id = result._id;
    result = sanitizeInternalFields(result);
    return result;
};

//# sourceMappingURL=updateGlobal.js.map