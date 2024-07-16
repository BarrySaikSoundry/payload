import mongoose from 'mongoose';
import getBuildQueryPlugin from '../queries/buildQuery.js';
import buildSchema from './buildSchema.js';
export const buildGlobalModel = (config)=>{
    if (config.globals && config.globals.length > 0) {
        const globalsSchema = new mongoose.Schema({}, {
            discriminatorKey: 'globalType',
            minimize: false,
            timestamps: true
        });
        globalsSchema.plugin(getBuildQueryPlugin());
        const Globals = mongoose.model('globals', globalsSchema, 'globals');
        Object.values(config.globals).forEach((globalConfig)=>{
            const globalSchema = buildSchema(config, globalConfig.fields, {
                options: {
                    minimize: false
                }
            });
            Globals.discriminator(globalConfig.slug, globalSchema);
        });
        return Globals;
    }
    return null;
};

//# sourceMappingURL=buildGlobalModel.js.map