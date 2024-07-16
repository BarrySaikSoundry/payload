/**
 * Used to name database enums and collections
 * Returns the collection or enum name for a given entity
 */ export const getDBName = ({ config: { name, slug }, config, target = 'dbName', versions = false })=>{
    let result;
    let custom = config[target];
    if (!custom && target === 'enumName') {
        custom = config['dbName'];
    }
    if (custom) {
        result = typeof custom === 'function' ? custom({}) : custom;
    } else {
        result = name ?? slug;
    }
    if (versions) result = `_${result}_versions`;
    return result;
};

//# sourceMappingURL=getDBName.js.map