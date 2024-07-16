import { combineQueries } from 'payload';
import sanitizeInternalFields from './utilities/sanitizeInternalFields.js';
import { withSession } from './withSession.js';
export const findGlobal = async function findGlobal({ slug, locale, req = {}, where }) {
    const Model = this.globals;
    const options = {
        ...await withSession(this, req),
        lean: true
    };
    const query = await Model.buildQuery({
        globalSlug: slug,
        locale,
        payload: this.payload,
        where: combineQueries({
            globalType: {
                equals: slug
            }
        }, where)
    });
    let doc = await Model.findOne(query, {}, options);
    if (!doc) {
        return null;
    }
    if (doc._id) {
        doc.id = doc._id;
        delete doc._id;
    }
    doc = JSON.parse(JSON.stringify(doc));
    doc = sanitizeInternalFields(doc);
    return doc;
};

//# sourceMappingURL=findGlobal.js.map