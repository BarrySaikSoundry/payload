import { flattenTopLevelFields } from 'payload';
import { fieldAffectsData, fieldIsPresentationalOnly } from 'payload/shared';
export const getLocalizedSortProperty = ({ config, fields: incomingFields, locale, result: incomingResult, segments: incomingSegments })=>{
    // If localization is not enabled, accept exactly
    // what is sent in
    if (!config.localization) {
        return incomingSegments.join('.');
    }
    // Flatten incoming fields (row, etc)
    const fields = flattenTopLevelFields(incomingFields);
    const segments = [
        ...incomingSegments
    ];
    // Retrieve first segment, and remove from segments
    const firstSegment = segments.shift();
    // Attempt to find a matched field
    const matchedField = fields.find((field)=>fieldAffectsData(field) && field.name === firstSegment);
    if (matchedField && !fieldIsPresentationalOnly(matchedField)) {
        let nextFields;
        const remainingSegments = [
            ...segments
        ];
        let localizedSegment = matchedField.name;
        if (matchedField.localized) {
            // Check to see if next segment is a locale
            if (segments.length > 0) {
                const nextSegmentIsLocale = config.localization.localeCodes.includes(remainingSegments[0]);
                // If next segment is locale, remove it from remaining segments
                // and use it to localize the current segment
                if (nextSegmentIsLocale) {
                    const nextSegment = remainingSegments.shift();
                    localizedSegment = `${matchedField.name}.${nextSegment}`;
                }
            } else {
                // If no more segments, but field is localized, use default locale
                localizedSegment = `${matchedField.name}.${locale}`;
            }
        }
        // If there are subfields, pass them through
        if (matchedField.type === 'tab' || matchedField.type === 'group' || matchedField.type === 'array') {
            nextFields = matchedField.fields;
        }
        if (matchedField.type === 'blocks') {
            nextFields = matchedField.blocks.reduce((flattenedBlockFields, block)=>{
                return [
                    ...flattenedBlockFields,
                    ...block.fields.filter((blockField)=>fieldAffectsData(blockField) && blockField.name !== 'blockType' && blockField.name !== 'blockName' || !fieldAffectsData(blockField))
                ];
            }, []);
        }
        const result = incomingResult ? `${incomingResult}.${localizedSegment}` : localizedSegment;
        if (nextFields) {
            return getLocalizedSortProperty({
                config,
                fields: nextFields,
                locale,
                result,
                segments: remainingSegments
            });
        }
        return result;
    }
    return incomingSegments.join('.');
};

//# sourceMappingURL=getLocalizedSortProperty.js.map