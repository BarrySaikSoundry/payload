'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, useAuth, useTranslation } from '@payloadcms/ui';
import LinkImport from 'next/link.js';
import React, { Fragment, useEffect } from 'react';
const Link = LinkImport.default || LinkImport;
export const LogoutClient = (props)=>{
    const { adminRoute, inactivity, redirect } = props;
    const [isLoggingOut, setIsLoggingOut] = React.useState(undefined);
    const { logOut } = useAuth();
    const { t } = useTranslation();
    useEffect(()=>{
        if (!isLoggingOut) {
            setIsLoggingOut(true);
            logOut();
        }
    }, [
        isLoggingOut,
        logOut
    ]);
    if (isLoggingOut) {
        return /*#__PURE__*/ _jsxs(Fragment, {
            children: [
                inactivity && /*#__PURE__*/ _jsx("h2", {
                    children: t('authentication:loggedOutInactivity')
                }),
                !inactivity && /*#__PURE__*/ _jsx("h2", {
                    children: t('authentication:loggedOutSuccessfully')
                }),
                /*#__PURE__*/ _jsx(Button, {
                    Link: Link,
                    buttonStyle: "secondary",
                    el: "link",
                    url: `${adminRoute}/login${redirect && redirect.length > 0 ? `?redirect=${encodeURIComponent(redirect)}` : ''}`,
                    children: t('authentication:logBackIn')
                })
            ]
        });
    }
    return /*#__PURE__*/ _jsx(Fragment, {
        children: t('authentication:loggingOut')
    });
};

//# sourceMappingURL=LogoutClient.js.map