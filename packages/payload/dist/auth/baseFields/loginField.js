import { email } from '../../fields/validations.js';
export default ((field)=>{
    const formattedFields = [
        {
            name: 'email',
            type: 'email',
            admin: {
                components: {
                    Field: field === 'username' ? undefined : ()=>null
                }
            },
            label: ({ t })=>t('general:email'),
            required: true,
            unique: field === 'email' ? true : false,
            validate: email
        }
    ];
    if (field === 'username') {
        formattedFields.push({
            name: 'username',
            type: 'text',
            admin: {
                components: {
                    Field: ()=>null
                }
            },
            label: ({ t })=>t('authentication:username'),
            required: true,
            unique: true
        });
    }
    return formattedFields;
});

//# sourceMappingURL=loginField.js.map