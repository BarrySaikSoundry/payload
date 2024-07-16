'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useIntersect } from '../../hooks/useIntersect.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { RenderField } from './RenderField.js';
import './index.scss';
const baseClass = 'render-fields';
export const RenderFields = (props)=>{
    const { className, fieldMap, forceRender, indexPath, margins, path, permissions, schemaPath } = props;
    const { i18n } = useTranslation();
    const [hasRendered, setHasRendered] = React.useState(Boolean(forceRender));
    const [intersectionRef, entry] = useIntersect({
        rootMargin: '1000px'
    }, Boolean(forceRender));
    const isIntersecting = Boolean(entry?.isIntersecting);
    const isAboveViewport = entry?.boundingClientRect?.top < 0;
    const shouldRender = forceRender || isIntersecting || isAboveViewport;
    React.useEffect(()=>{
        if (shouldRender && !hasRendered) {
            setHasRendered(true);
        }
    }, [
        shouldRender,
        hasRendered
    ]);
    if (!fieldMap || Array.isArray(fieldMap) && fieldMap.length === 0) {
        return null;
    }
    if (!i18n) {
        console.error('Need to implement i18n when calling RenderFields') // eslint-disable-line no-console
        ;
    }
    if (fieldMap) {
        return /*#__PURE__*/ _jsx("div", {
            className: [
                baseClass,
                className,
                margins && `${baseClass}--margins-${margins}`,
                margins === false && `${baseClass}--margins-none`
            ].filter(Boolean).join(' '),
            ref: intersectionRef,
            children: hasRendered && fieldMap?.map((f, fieldIndex)=>{
                const { type, CustomField, custom, disabled, fieldComponentProps, fieldComponentProps: { readOnly }, isHidden } = f;
                const forceRenderChildren = typeof forceRender === 'number' && fieldIndex <= forceRender || true;
                const name = 'name' in f ? f.name : undefined;
                return /*#__PURE__*/ _jsx(RenderField, {
                    CustomField: CustomField,
                    custom: custom,
                    disabled: disabled,
                    fieldComponentProps: {
                        ...fieldComponentProps,
                        forceRender: forceRenderChildren
                    },
                    indexPath: indexPath !== undefined ? `${indexPath}.${fieldIndex}` : `${fieldIndex}`,
                    isHidden: isHidden,
                    name: name,
                    path: path,
                    permissions: permissions?.[name],
                    readOnly: readOnly,
                    schemaPath: schemaPath,
                    siblingPermissions: permissions,
                    type: type
                }, fieldIndex);
            })
        });
    }
    return null;
};

//# sourceMappingURL=index.js.map