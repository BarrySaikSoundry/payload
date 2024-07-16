import { error, info } from '../utils/log.js';
export function validateTemplate(templateName) {
    const validTemplates = getValidTemplates();
    if (!validTemplates.map((t)=>t.name).includes(templateName)) {
        error(`'${templateName}' is not a valid template.`);
        info(`Valid templates: ${validTemplates.map((t)=>t.name).join(', ')}`);
        return false;
    }
    return true;
}
export function getValidTemplates() {
    return [
        {
            name: 'blank',
            type: 'starter',
            description: 'Blank 3.0 Template',
            url: 'https://github.com/payloadcms/payload/templates/blank-3.0#beta'
        },
        {
            name: 'website',
            type: 'starter',
            description: 'Website Template',
            url: 'https://github.com/payloadcms/payload/templates/website#beta'
        }
    ];
}

//# sourceMappingURL=templates.js.map