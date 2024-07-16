'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import AnimateHeightImport from 'react-animate-height';
import { ChevronIcon } from '../../icons/Chevron/index.js';
import { usePreferences } from '../../providers/Preferences/index.js';
import { useNav } from '../Nav/context.js';
import './index.scss';
const AnimateHeight = AnimateHeightImport.default || AnimateHeightImport;
const baseClass = 'nav-group';
export const NavGroup = ({ children, label })=>{
    const [collapsed, setCollapsed] = useState(true);
    const [animate, setAnimate] = useState(false);
    const { getPreference, setPreference } = usePreferences();
    const { navOpen } = useNav();
    const preferencesKey = `collapsed-${label}-groups`;
    useEffect(()=>{
        if (label) {
            const setCollapsedFromPreferences = async ()=>{
                const preferences = await getPreference(preferencesKey) || [];
                setCollapsed(preferences.indexOf(label) !== -1);
            };
            void setCollapsedFromPreferences();
        }
    }, [
        getPreference,
        label,
        preferencesKey
    ]);
    if (label) {
        const toggleCollapsed = async ()=>{
            setAnimate(true);
            let preferences = await getPreference(preferencesKey) || [];
            if (collapsed) {
                preferences = preferences.filter((preference)=>label !== preference);
            } else {
                preferences.push(label);
            }
            void setPreference(preferencesKey, preferences);
            setCollapsed(!collapsed);
        };
        return /*#__PURE__*/ _jsxs("div", {
            className: [
                `${baseClass}`,
                `${label}`,
                collapsed && `${baseClass}--collapsed`
            ].filter(Boolean).join(' '),
            id: `nav-group-${label}`,
            children: [
                /*#__PURE__*/ _jsxs("button", {
                    className: [
                        `${baseClass}__toggle`,
                        `${baseClass}__toggle--${collapsed ? 'collapsed' : 'open'}`
                    ].filter(Boolean).join(' '),
                    onClick: toggleCollapsed,
                    tabIndex: !navOpen ? -1 : 0,
                    type: "button",
                    children: [
                        /*#__PURE__*/ _jsx("div", {
                            className: `${baseClass}__label`,
                            children: label
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: `${baseClass}__indicator`,
                            children: /*#__PURE__*/ _jsx(ChevronIcon, {
                                className: `${baseClass}__indicator`,
                                direction: !collapsed ? 'up' : undefined
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ _jsx(AnimateHeight, {
                    duration: animate ? 200 : 0,
                    height: collapsed ? 0 : 'auto',
                    children: /*#__PURE__*/ _jsx("div", {
                        className: `${baseClass}__content`,
                        children: children
                    })
                })
            ]
        });
    }
    return /*#__PURE__*/ _jsx(React.Fragment, {
        children: children
    });
};

//# sourceMappingURL=index.js.map