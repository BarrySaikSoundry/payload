import sanitizeInternalFields from './utilities/sanitizeInternalFields.js';
import { withSession } from './withSession.js';
export const findOne = async function findOne({ collection, locale, req = {}, where }) {
    const Model = this.collections[collection];
    const options = {
        ...await withSession(this, req),
        lean: true
    };
    const query = await Model.buildQuery({
        locale,
        payload: this.payload,
        where
    });
    const doc = await Model.findOne(query, {}, options);
    if (!doc) {
        return null;
    }
    let result = JSON.parse(JSON.stringify(doc));
    // custom id type reset
    result.id = result._id;
    result = sanitizeInternalFields(result);
    return result;
};

//# sourceMappingURL=findOne.js.map