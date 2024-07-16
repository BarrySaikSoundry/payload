import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { buildStateFromSchema } from '@payloadcms/ui/forms/buildStateFromSchema';
import React from 'react';
import { CreateFirstUserClient } from './index.client.js';
export { generateCreateFirstUserMetadata } from './meta.js';
export const CreateFirstUserView = async ({ initPageResult })=>{
    const { req, req: { payload: { config: { admin: { user: userSlug } } } } } = initPageResult;
    const fields = [
        {
            name: 'email',
            type: 'email',
            label: req.t('general:emailAddress'),
            required: true
        },
        {
            name: 'password',
            type: 'text',
            label: req.t('general:password'),
            required: true
        },
        {
            name: 'confirm-password',
            type: 'text',
            label: req.t('authentication:confirmPassword'),
            required: true
        }
    ];
    const formState = await buildStateFromSchema({
        fieldSchema: fields,
        operation: 'create',
        preferences: {
            fields: {}
        },
        req
    });
    return /*#__PURE__*/ _jsxs("div", {
        className: "create-first-user",
        children: [
            /*#__PURE__*/ _jsx("h1", {
                children: req.t('general:welcome')
            }),
            /*#__PURE__*/ _jsx("p", {
                children: req.t('authentication:beginCreateFirstUser')
            }),
            /*#__PURE__*/ _jsx(CreateFirstUserClient, {
                initialState: formState,
                userSlug: userSlug
            })
        ]
    });
};

//# sourceMappingURL=index.js.map