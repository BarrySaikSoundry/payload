import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { redirect } from 'next/navigation.js';
import React from 'react';
import { Logo } from '../../elements/Logo/index.js';
export const verifyBaseClass = 'verify';
export { generateVerifyMetadata } from './meta.js';
export const Verify = async ({ initPageResult, params, searchParams })=>{
    // /:collectionSlug/verify/:token
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [collectionSlug, verify, token] = params.segments;
    const { locale, permissions, req } = initPageResult;
    const { i18n, payload: { config }, payload, user } = req;
    const { routes: { admin: adminRoute } } = config;
    let textToRender;
    try {
        await req.payload.verifyEmail({
            collection: collectionSlug,
            token
        });
        return redirect(`${adminRoute}/login`);
    } catch (e) {
        // already verified
        if (e?.status === 202) redirect(`${adminRoute}/login`);
        textToRender = req.t('authentication:unableToVerify');
    }
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: `${verifyBaseClass}__brand`,
                children: /*#__PURE__*/ _jsx(Logo, {
                    i18n: i18n,
                    locale: locale,
                    params: params,
                    payload: payload,
                    permissions: permissions,
                    searchParams: searchParams,
                    user: user
                })
            }),
            /*#__PURE__*/ _jsx("h2", {
                children: textToRender
            })
        ]
    });
};

//# sourceMappingURL=index.js.map