import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { WithServerSideProps as WithServerSidePropsGeneric } from '../../../elements/WithServerSideProps/index.js';
import { mapCollections } from './collections.js';
import { mapGlobals } from './globals.js';
export const buildComponentMap = (args)=>{
    const { DefaultEditView, DefaultListView, children, i18n, payload, readOnly } = args;
    const config = payload.config;
    const WithServerSideProps = ({ Component, ...rest })=>{
        return /*#__PURE__*/ _jsx(WithServerSidePropsGeneric, {
            Component: Component,
            serverOnlyProps: {
                i18n,
                payload
            },
            ...rest
        });
    };
    const collections = mapCollections({
        DefaultEditView,
        DefaultListView,
        WithServerSideProps,
        collections: config.collections,
        config,
        i18n,
        readOnly
    });
    const globals = mapGlobals({
        args: {
            DefaultEditView,
            WithServerSideProps,
            config,
            globals: config.globals,
            i18n,
            readOnly
        }
    });
    const NestProviders = ({ children, providers })=>{
        const Component = providers[0];
        if (providers.length > 1) {
            return /*#__PURE__*/ _jsx(Component, {
                children: /*#__PURE__*/ _jsx(NestProviders, {
                    providers: providers.slice(1),
                    children: children
                })
            });
        }
        return /*#__PURE__*/ _jsx(Component, {
            children: children
        });
    };
    const LogoutButtonComponent = config.admin?.components?.logout?.Button;
    const LogoutButton = LogoutButtonComponent ? /*#__PURE__*/ _jsx(WithServerSideProps, {
        Component: LogoutButtonComponent
    }) : null;
    const IconComponent = config.admin?.components?.graphics?.Icon;
    const Icon = IconComponent ? /*#__PURE__*/ _jsx(WithServerSideProps, {
        Component: IconComponent
    }) : null;
    return {
        componentMap: {
            Icon,
            LogoutButton,
            actions: config.admin?.components?.actions?.map((Component, i)=>/*#__PURE__*/ _jsx(WithServerSideProps, {
                    Component: Component
                }, i)),
            collections,
            globals
        },
        wrappedChildren: Array.isArray(config.admin?.components?.providers) && config.admin?.components?.providers.length > 0 ? /*#__PURE__*/ _jsx(NestProviders, {
            providers: config.admin?.components?.providers,
            children: children
        }) : children
    };
};

//# sourceMappingURL=index.js.map