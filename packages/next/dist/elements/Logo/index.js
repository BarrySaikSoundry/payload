import { jsx as _jsx } from "react/jsx-runtime";
import { PayloadLogo, RenderCustomComponent } from '@payloadcms/ui/shared';
import React from 'react';
export const Logo = (props)=>{
    const { i18n, locale, params, payload, permissions, searchParams, user } = props;
    const { admin: { components: { graphics: { Logo: CustomLogo } = {
        Logo: undefined
    } } = {} } = {} } = payload.config;
    return /*#__PURE__*/ _jsx(RenderCustomComponent, {
        CustomComponent: CustomLogo,
        DefaultComponent: PayloadLogo,
        serverOnlyProps: {
            i18n,
            locale,
            params,
            payload,
            permissions,
            searchParams,
            user
        }
    });
};

//# sourceMappingURL=index.js.map