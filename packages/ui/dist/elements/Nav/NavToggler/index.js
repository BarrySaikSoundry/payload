'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useWindowInfo } from '@faceless-ui/window-info';
import React from 'react';
import { usePreferences } from '../../../providers/Preferences/index.js';
import { useTranslation } from '../../../providers/Translation/index.js';
import { useNav } from '../context.js';
import './index.scss';
const baseClass = 'nav-toggler';
export const NavToggler = (props)=>{
    const { id, children, className, tabIndex = 0 } = props;
    const { t } = useTranslation();
    const { setPreference } = usePreferences();
    const { navOpen, setNavOpen } = useNav();
    const { breakpoints: { l: largeBreak } } = useWindowInfo();
    return /*#__PURE__*/ _jsx("button", {
        "aria-label": `${navOpen ? t('general:close') : t('general:open')} ${t('general:menu')}`,
        className: [
            baseClass,
            navOpen && `${baseClass}--is-open`,
            className
        ].filter(Boolean).join(' '),
        id: id,
        onClick: async ()=>{
            setNavOpen(!navOpen);
            // only when the user explicitly toggles the nav on desktop do we want to set the preference
            // this is because the js may open or close the nav based on the window size, routing, etc
            if (!largeBreak) {
                await setPreference('nav', {
                    open: !navOpen
                });
            }
        },
        tabIndex: tabIndex,
        type: "button",
        children: children
    });
};

//# sourceMappingURL=index.js.map