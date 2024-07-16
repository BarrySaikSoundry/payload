import { GraphQLEnumType } from 'graphql';
import formatName from '../utilities/formatName.js';
const buildLocaleInputType = (localization)=>{
    return new GraphQLEnumType({
        name: 'LocaleInputType',
        values: localization.localeCodes.reduce((values, locale)=>({
                ...values,
                [formatName(locale)]: {
                    value: locale
                }
            }), {})
    });
};
export default buildLocaleInputType;

//# sourceMappingURL=buildLocaleInputType.js.map