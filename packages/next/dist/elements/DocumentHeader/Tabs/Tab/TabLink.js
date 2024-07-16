'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useSearchParams } from '@payloadcms/ui';
import LinkImport from 'next/link.js';
import { useParams, usePathname } from 'next/navigation.js';
import React from 'react';
const Link = LinkImport.default || LinkImport;
export const DocumentTabLink = ({ adminRoute, ariaLabel, baseClass, children, href: hrefFromProps, isActive: isActiveFromProps, newTab })=>{
    const pathname = usePathname();
    const params = useParams();
    const { searchParams } = useSearchParams();
    const locale = 'locale' in searchParams && typeof searchParams.locale === 'string' ? searchParams.locale : undefined;
    const [entityType, entitySlug, segmentThree, segmentFour, ...rest] = params.segments || [];
    const isCollection = entityType === 'collections';
    let docPath = `${adminRoute}/${isCollection ? 'collections' : 'globals'}/${entitySlug}`;
    if (isCollection && segmentThree) {
        // doc ID
        docPath += `/${segmentThree}`;
    }
    const href = `${docPath}${hrefFromProps}`;
    // separated the two so it doesn't break checks against pathname
    const hrefWithLocale = `${href}${locale ? `?locale=${locale}` : ''}`;
    const isActive = href === docPath && pathname === docPath || href !== docPath && pathname.startsWith(href) || isActiveFromProps;
    return /*#__PURE__*/ _jsx("li", {
        "aria-label": ariaLabel,
        className: [
            baseClass,
            isActive && `${baseClass}--active`
        ].filter(Boolean).join(' '),
        children: /*#__PURE__*/ _jsx(Link, {
            className: `${baseClass}__link`,
            href: !isActive || href !== pathname ? hrefWithLocale : '',
            ...newTab && {
                rel: 'noopener noreferrer',
                target: '_blank'
            },
            tabIndex: isActive ? -1 : 0,
            children: children
        })
    });
};

//# sourceMappingURL=TabLink.js.map