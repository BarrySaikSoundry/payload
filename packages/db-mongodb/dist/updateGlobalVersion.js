import { withSession } from './withSession.js';
export async function updateGlobalVersion({ id, global, locale, req = {}, versionData, where }) {
    const VersionModel = this.versions[global];
    const whereToUse = where || {
        id: {
            equals: id
        }
    };
    const options = {
        ...await withSession(this, req),
        lean: true,
        new: true
    };
    const query = await VersionModel.buildQuery({
        locale,
        payload: this.payload,
        where: whereToUse
    });
    const doc = await VersionModel.findOneAndUpdate(query, versionData, options);
    const result = JSON.parse(JSON.stringify(doc));
    const verificationToken = doc._verificationToken;
    // custom id type reset
    result.id = result._id;
    if (verificationToken) {
        result._verificationToken = verificationToken;
    }
    return result;
}

//# sourceMappingURL=updateGlobalVersion.js.map