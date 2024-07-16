import formatName from './formatName.js';
const formatOptions = (field)=>{
    return field.options.reduce((values, option)=>{
        if (typeof option === 'object') {
            return {
                ...values,
                [formatName(option.value)]: {
                    value: option.value
                }
            };
        }
        return {
            ...values,
            [formatName(option)]: {
                value: option
            }
        };
    }, {});
};
export default formatOptions;

//# sourceMappingURL=formatOptions.js.map