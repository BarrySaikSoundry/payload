'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { Drawer } from '@payloadcms/ui';
import React from 'react';
import { DrawerContent } from './DrawerContent.js';
/**
 * This FieldsDrawer component can be used to easily create a Drawer that contains a form with fields within your feature.
 * The fields are taken directly from the schema map based on your `featureKey` and `schemaPathSuffix`. Thus, this can only
 * be used if you provide your field schema inside the `generateSchemaMap` prop of your feature.server.ts.
 */ export const FieldsDrawer = ({ className, data, drawerSlug, drawerTitle, featureKey, handleDrawerSubmit, schemaPathSuffix })=>{
    // The Drawer only renders its children (and itself) if it's open. Thus, by extracting the main content
    // to DrawerContent, this should be faster
    return /*#__PURE__*/ _jsx(Drawer, {
        className: className,
        slug: drawerSlug,
        title: drawerTitle ?? '',
        children: /*#__PURE__*/ _jsx(DrawerContent, {
            data: data,
            featureKey: featureKey,
            handleDrawerSubmit: handleDrawerSubmit,
            schemaPathSuffix: schemaPathSuffix
        })
    });
};

//# sourceMappingURL=Drawer.js.map