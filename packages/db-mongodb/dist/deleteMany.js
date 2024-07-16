import { withSession } from './withSession.js';
export const deleteMany = async function deleteMany({ collection, req = {}, where }) {
    const Model = this.collections[collection];
    const options = {
        ...await withSession(this, req),
        lean: true
    };
    const query = await Model.buildQuery({
        payload: this.payload,
        where
    });
    await Model.deleteMany(query, options);
};

//# sourceMappingURL=deleteMany.js.map