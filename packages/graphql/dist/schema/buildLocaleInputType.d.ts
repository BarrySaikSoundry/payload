import type { GraphQLScalarType } from 'graphql';
import type { SanitizedLocalizationConfig } from 'payload';
import { GraphQLEnumType } from 'graphql';
declare const buildLocaleInputType: (localization: SanitizedLocalizationConfig) => GraphQLEnumType | GraphQLScalarType;
export default buildLocaleInputType;
//# sourceMappingURL=buildLocaleInputType.d.ts.map