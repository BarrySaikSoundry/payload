import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { buildVersionCollectionFields, buildVersionGlobalFields } from 'payload';
import buildCollectionSchema from './models/buildCollectionSchema.js';
import { buildGlobalModel } from './models/buildGlobalModel.js';
import buildSchema from './models/buildSchema.js';
import getBuildQueryPlugin from './queries/buildQuery.js';
import { getDBName } from './utilities/getDBName.js';
export const init = function init() {
    this.payload.config.collections.forEach((collection)=>{
        const schema = buildCollectionSchema(collection, this.payload.config);
        if (collection.versions) {
            const versionModelName = getDBName({
                config: collection,
                versions: true
            });
            const versionCollectionFields = buildVersionCollectionFields(collection);
            const versionSchema = buildSchema(this.payload.config, versionCollectionFields, {
                disableUnique: true,
                draftsEnabled: true,
                indexSortableFields: this.payload.config.indexSortableFields,
                options: {
                    minimize: false,
                    timestamps: false
                }
            });
            versionSchema.plugin(paginate, {
                useEstimatedCount: true
            }).plugin(getBuildQueryPlugin({
                collectionSlug: collection.slug,
                versionsFields: versionCollectionFields
            }));
            const model = mongoose.model(versionModelName, versionSchema, this.autoPluralization === true ? undefined : versionModelName);
            // this.payload.versions[collection.slug] = model;
            this.versions[collection.slug] = model;
        }
        const model = mongoose.model(getDBName({
            config: collection
        }), schema, this.autoPluralization === true ? undefined : collection.slug);
        this.collections[collection.slug] = model;
    });
    const model = buildGlobalModel(this.payload.config);
    this.globals = model;
    this.payload.config.globals.forEach((global)=>{
        if (global.versions) {
            const versionModelName = getDBName({
                config: global,
                versions: true
            });
            const versionGlobalFields = buildVersionGlobalFields(global);
            const versionSchema = buildSchema(this.payload.config, versionGlobalFields, {
                disableUnique: true,
                draftsEnabled: true,
                indexSortableFields: this.payload.config.indexSortableFields,
                options: {
                    minimize: false,
                    timestamps: false
                }
            });
            versionSchema.plugin(paginate, {
                useEstimatedCount: true
            }).plugin(getBuildQueryPlugin({
                versionsFields: versionGlobalFields
            }));
            const versionsModel = mongoose.model(versionModelName, versionSchema, versionModelName);
            this.versions[global.slug] = versionsModel;
        }
    });
};

//# sourceMappingURL=init.js.map