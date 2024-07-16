'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Modal, useModal } from '@faceless-ui/modal';
// TODO: abstract the `next/navigation` dependency out from this component
import { useRouter } from 'next/navigation.js';
import React from 'react';
import { Button } from '../../elements/Button/index.js';
import { useAuth } from '../../providers/Auth/index.js';
import { useConfig } from '../../providers/Config/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import './index.scss';
const baseClass = 'stay-logged-in';
export const stayLoggedInModalSlug = 'stay-logged-in';
export const StayLoggedInModal = ()=>{
    const { refreshCookie } = useAuth();
    const router = useRouter();
    const config = useConfig();
    const { admin: { routes: { logout: logoutRoute } }, routes: { admin } } = config;
    const { toggleModal } = useModal();
    const { t } = useTranslation();
    return /*#__PURE__*/ _jsx(Modal, {
        className: baseClass,
        slug: stayLoggedInModalSlug,
        children: /*#__PURE__*/ _jsxs("div", {
            className: `${baseClass}__wrapper`,
            children: [
                /*#__PURE__*/ _jsxs("div", {
                    className: `${baseClass}__content`,
                    children: [
                        /*#__PURE__*/ _jsx("h1", {
                            children: t('authentication:stayLoggedIn')
                        }),
                        /*#__PURE__*/ _jsx("p", {
                            children: t('authentication:youAreInactive')
                        })
                    ]
                }),
                /*#__PURE__*/ _jsxs("div", {
                    className: `${baseClass}__controls`,
                    children: [
                        /*#__PURE__*/ _jsx(Button, {
                            buttonStyle: "secondary",
                            onClick: ()=>{
                                toggleModal(stayLoggedInModalSlug);
                                router.push(`${admin}${logoutRoute}`);
                            },
                            children: t('authentication:logOut')
                        }),
                        /*#__PURE__*/ _jsx(Button, {
                            onClick: ()=>{
                                refreshCookie();
                                toggleModal(stayLoggedInModalSlug);
                            },
                            children: t('authentication:stayLoggedIn')
                        })
                    ]
                })
            ]
        })
    });
};

//# sourceMappingURL=index.js.map