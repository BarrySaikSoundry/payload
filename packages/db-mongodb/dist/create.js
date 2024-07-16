import { handleError } from './utilities/handleError.js';
import { withSession } from './withSession.js';
export const create = async function create({ collection, data, req = {} }) {
    const Model = this.collections[collection];
    const options = await withSession(this, req);
    let doc;
    try {
        [doc] = await Model.create([
            data
        ], options);
    } catch (error) {
        handleError({
            collection,
            error,
            req
        });
    }
    // doc.toJSON does not do stuff like converting ObjectIds to string, or date strings to date objects. That's why we use JSON.parse/stringify here
    const result = JSON.parse(JSON.stringify(doc));
    const verificationToken = doc._verificationToken;
    // custom id type reset
    result.id = result._id;
    if (verificationToken) {
        result._verificationToken = verificationToken;
    }
    return result;
};

//# sourceMappingURL=create.js.map