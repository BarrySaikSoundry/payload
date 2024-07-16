import { withSession } from './withSession.js';
export const deleteVersions = async function deleteVersions({ collection, locale, req = {}, where }) {
    const VersionsModel = this.versions[collection];
    const options = {
        ...await withSession(this, req),
        lean: true
    };
    const query = await VersionsModel.buildQuery({
        locale,
        payload: this.payload,
        where
    });
    await VersionsModel.deleteMany(query, options);
};

//# sourceMappingURL=deleteVersions.js.map