import { withSession } from './withSession.js';
export const createVersion = async function createVersion({ autosave, collectionSlug, createdAt, parent, req = {}, updatedAt, versionData }) {
    const VersionModel = this.versions[collectionSlug];
    const options = await withSession(this, req);
    const [doc] = await VersionModel.create([
        {
            autosave,
            createdAt,
            latest: true,
            parent,
            updatedAt,
            version: versionData
        }
    ], options, req);
    await VersionModel.updateMany({
        $and: [
            {
                _id: {
                    $ne: doc._id
                }
            },
            {
                parent: {
                    $eq: parent
                }
            },
            {
                latest: {
                    $eq: true
                }
            }
        ]
    }, {
        $unset: {
            latest: 1
        }
    }, options);
    const result = JSON.parse(JSON.stringify(doc));
    const verificationToken = doc._verificationToken;
    // custom id type reset
    result.id = result._id;
    if (verificationToken) {
        result._verificationToken = verificationToken;
    }
    return result;
};

//# sourceMappingURL=createVersion.js.map