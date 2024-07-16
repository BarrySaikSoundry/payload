'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useTranslation } from '../../providers/Translation/index.js';
import { Button } from '../Button/index.js';
import './index.scss';
const handleDragOver = (e)=>{
    e.preventDefault();
    e.stopPropagation();
};
const baseClass = 'dropzone';
export const Dropzone = ({ className, mimeTypes, onChange, onPasteUrlClick })=>{
    const dropRef = React.useRef(null);
    const [dragging, setDragging] = React.useState(false);
    const inputRef = React.useRef(null);
    const { t } = useTranslation();
    const handlePaste = React.useCallback((e)=>{
        e.preventDefault();
        e.stopPropagation();
        if (e.clipboardData.files && e.clipboardData.files.length > 0) {
            onChange(e.clipboardData.files);
        }
    }, [
        onChange
    ]);
    const handleDragEnter = React.useCallback((e)=>{
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    }, []);
    const handleDragLeave = React.useCallback((e)=>{
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    }, []);
    const handleDrop = React.useCallback((e)=>{
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onChange(e.dataTransfer.files);
            setDragging(false);
            e.dataTransfer.clearData();
        }
    }, [
        onChange
    ]);
    const handleFileSelection = React.useCallback((e)=>{
        if (e.target.files && e.target.files.length > 0) {
            onChange(e.target.files);
        }
    }, [
        onChange
    ]);
    React.useEffect(()=>{
        const div = dropRef.current;
        if (div) {
            div.addEventListener('dragenter', handleDragEnter);
            div.addEventListener('dragleave', handleDragLeave);
            div.addEventListener('dragover', handleDragOver);
            div.addEventListener('drop', handleDrop);
            div.addEventListener('paste', handlePaste);
            return ()=>{
                div.removeEventListener('dragenter', handleDragEnter);
                div.removeEventListener('dragleave', handleDragLeave);
                div.removeEventListener('dragover', handleDragOver);
                div.removeEventListener('drop', handleDrop);
                div.removeEventListener('paste', handlePaste);
            };
        }
        return ()=>null;
    }, [
        handleDragEnter,
        handleDragLeave,
        handleDrop,
        handlePaste
    ]);
    const classes = [
        baseClass,
        className,
        dragging ? 'dragging' : ''
    ].filter(Boolean).join(' ');
    return /*#__PURE__*/ _jsxs("div", {
        className: classes,
        ref: dropRef,
        children: [
            /*#__PURE__*/ _jsx(Button, {
                buttonStyle: "secondary",
                className: `${baseClass}__file-button`,
                onClick: ()=>{
                    inputRef.current.click();
                },
                size: "small",
                children: t('upload:selectFile')
            }),
            /*#__PURE__*/ _jsx(Button, {
                buttonStyle: "secondary",
                className: `${baseClass}__file-button`,
                onClick: onPasteUrlClick,
                size: "small",
                children: t('upload:pasteURL')
            }),
            /*#__PURE__*/ _jsx("input", {
                accept: mimeTypes?.join(','),
                className: `${baseClass}__hidden-input`,
                onChange: handleFileSelection,
                ref: inputRef,
                type: "file"
            }),
            /*#__PURE__*/ _jsxs("p", {
                className: `${baseClass}__label`,
                children: [
                    t('general:or'),
                    " ",
                    t('upload:dragAndDrop')
                ]
            })
        ]
    });
};

//# sourceMappingURL=index.js.map