'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useModal } from '@faceless-ui/modal';
import React, { forwardRef, useRef, useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { editDrawerSlug } from '../../elements/Upload/index.js';
import { PlusIcon } from '../../icons/Plus/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { Button } from '../Button/index.js';
import './index.scss';
const baseClass = 'edit-upload';
const Input = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { name, onChange, value } = props;
    return /*#__PURE__*/ _jsxs("div", {
        className: `${baseClass}__input`,
        children: [
            name,
            /*#__PURE__*/ _jsx("input", {
                name: name,
                onChange: (e)=>onChange(e.target.value),
                ref: ref,
                type: "number",
                value: value
            })
        ]
    });
});
const defaultCrop = {
    height: 100,
    heightPixels: 0,
    unit: '%',
    width: 100,
    widthPixels: 0,
    x: 0,
    y: 0
};
export const EditUpload = ({ fileName, fileSrc, imageCacheTag, initialCrop, initialFocalPoint, onSave, showCrop, showFocalPoint })=>{
    const { closeModal } = useModal();
    const { t } = useTranslation();
    const [crop, setCrop] = useState(()=>({
            ...defaultCrop,
            ...initialCrop
        }));
    const defaultFocalPosition = {
        x: 50,
        y: 50
    };
    const [focalPosition, setFocalPosition] = useState(()=>({
            ...defaultFocalPosition,
            ...initialFocalPoint
        }));
    const [checkBounds, setCheckBounds] = useState(false);
    const [originalHeight, setOriginalHeight] = useState(0);
    const [originalWidth, setOriginalWidth] = useState(0);
    const focalWrapRef = useRef(undefined);
    const imageRef = useRef(undefined);
    const cropRef = useRef(undefined);
    const heightRef = useRef(null);
    const widthRef = useRef(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const onImageLoad = (e)=>{
        setOriginalHeight(e.currentTarget.naturalHeight);
        setOriginalWidth(e.currentTarget.naturalWidth);
        setImageLoaded(true);
    };
    const fineTuneCrop = ({ dimension, value })=>{
        const intValue = parseInt(value);
        if (dimension === 'width' && intValue >= originalWidth) return null;
        if (dimension === 'height' && intValue >= originalHeight) return null;
        const percentage = 100 * (intValue / (dimension === 'width' ? originalWidth : originalHeight));
        if (percentage === 100 || percentage === 0) return null;
        setCrop({
            ...crop,
            [dimension]: percentage
        });
    };
    const fineTuneFocalPosition = ({ coordinate, value })=>{
        const intValue = parseInt(value);
        if (intValue >= 0 && intValue <= 100) {
            setFocalPosition((prevPosition)=>({
                    ...prevPosition,
                    [coordinate]: intValue
                }));
        }
    };
    const saveEdits = ()=>{
        if (typeof onSave === 'function') onSave({
            crop: crop ? {
                ...crop,
                heightPixels: Number(heightRef.current?.value ?? crop.heightPixels),
                widthPixels: Number(widthRef.current?.value ?? crop.widthPixels)
            } : undefined,
            focalPosition
        });
        closeModal(editDrawerSlug);
    };
    const onDragEnd = React.useCallback(({ x, y })=>{
        setFocalPosition({
            x,
            y
        });
        setCheckBounds(false);
    }, []);
    const centerFocalPoint = ()=>{
        const containerRect = focalWrapRef.current.getBoundingClientRect();
        const boundsRect = showCrop ? cropRef.current.getBoundingClientRect() : imageRef.current.getBoundingClientRect();
        const xCenter = (boundsRect.left - containerRect.left + boundsRect.width / 2) / containerRect.width * 100;
        const yCenter = (boundsRect.top - containerRect.top + boundsRect.height / 2) / containerRect.height * 100;
        setFocalPosition({
            x: xCenter,
            y: yCenter
        });
    };
    const fileSrcToUse = imageCacheTag ? `${fileSrc}?${imageCacheTag}` : fileSrc;
    return /*#__PURE__*/ _jsxs("div", {
        className: baseClass,
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: `${baseClass}__header`,
                children: [
                    /*#__PURE__*/ _jsxs("h2", {
                        title: `${t('general:editing')} ${fileName}`,
                        children: [
                            t('general:editing'),
                            " ",
                            fileName
                        ]
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: `${baseClass}__actions`,
                        children: [
                            /*#__PURE__*/ _jsx(Button, {
                                "aria-label": t('general:cancel'),
                                buttonStyle: "secondary",
                                className: `${baseClass}__cancel`,
                                onClick: ()=>closeModal(editDrawerSlug),
                                children: t('general:cancel')
                            }),
                            /*#__PURE__*/ _jsx(Button, {
                                "aria-label": t('general:applyChanges'),
                                buttonStyle: "primary",
                                className: `${baseClass}__save`,
                                disabled: !imageLoaded,
                                onClick: saveEdits,
                                children: t('general:applyChanges')
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: `${baseClass}__toolWrap`,
                children: [
                    /*#__PURE__*/ _jsx("div", {
                        className: `${baseClass}__crop`,
                        children: /*#__PURE__*/ _jsxs("div", {
                            className: `${baseClass}__focal-wrapper`,
                            ref: focalWrapRef,
                            style: {
                                aspectRatio: `${originalWidth / originalHeight}`
                            },
                            children: [
                                showCrop ? /*#__PURE__*/ _jsx(ReactCrop, {
                                    className: `${baseClass}__reactCrop`,
                                    crop: crop,
                                    onChange: (_, c)=>setCrop(c),
                                    onComplete: ()=>setCheckBounds(true),
                                    renderSelectionAddon: ()=>{
                                        return /*#__PURE__*/ _jsx("div", {
                                            className: `${baseClass}__crop-window`,
                                            ref: cropRef
                                        });
                                    },
                                    children: /*#__PURE__*/ _jsx("img", {
                                        alt: t('upload:setCropArea'),
                                        onLoad: onImageLoad,
                                        ref: imageRef,
                                        src: fileSrcToUse
                                    })
                                }) : /*#__PURE__*/ _jsx("img", {
                                    alt: t('upload:setFocalPoint'),
                                    onLoad: onImageLoad,
                                    ref: imageRef,
                                    src: fileSrcToUse
                                }),
                                showFocalPoint && /*#__PURE__*/ _jsx(DraggableElement, {
                                    boundsRef: showCrop ? cropRef : imageRef,
                                    checkBounds: showCrop ? checkBounds : false,
                                    className: `${baseClass}__focalPoint`,
                                    containerRef: focalWrapRef,
                                    initialPosition: focalPosition,
                                    onDragEnd: onDragEnd,
                                    setCheckBounds: showCrop ? setCheckBounds : false,
                                    children: /*#__PURE__*/ _jsx(PlusIcon, {})
                                })
                            ]
                        })
                    }),
                    (showCrop || showFocalPoint) && /*#__PURE__*/ _jsxs("div", {
                        className: `${baseClass}__sidebar`,
                        children: [
                            showCrop && /*#__PURE__*/ _jsxs("div", {
                                className: `${baseClass}__groupWrap`,
                                children: [
                                    /*#__PURE__*/ _jsx("div", {
                                        children: /*#__PURE__*/ _jsxs("div", {
                                            className: `${baseClass}__titleWrap`,
                                            children: [
                                                /*#__PURE__*/ _jsx("h3", {
                                                    children: t('upload:crop')
                                                }),
                                                /*#__PURE__*/ _jsx(Button, {
                                                    buttonStyle: "none",
                                                    className: `${baseClass}__reset`,
                                                    onClick: ()=>setCrop({
                                                            height: 100,
                                                            heightPixels: originalHeight,
                                                            unit: '%',
                                                            width: 100,
                                                            widthPixels: originalWidth,
                                                            x: 0,
                                                            y: 0
                                                        }),
                                                    children: t('general:reset')
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ _jsx("span", {
                                        className: `${baseClass}__description`,
                                        children: t('upload:cropToolDescription')
                                    }),
                                    /*#__PURE__*/ _jsxs("div", {
                                        className: `${baseClass}__inputsWrap`,
                                        children: [
                                            /*#__PURE__*/ _jsx(Input, {
                                                name: `${t('upload:width')} (px)`,
                                                onChange: (value)=>fineTuneCrop({
                                                        dimension: 'width',
                                                        value
                                                    }),
                                                ref: widthRef,
                                                value: (crop.width / 100 * originalWidth).toFixed(0)
                                            }),
                                            /*#__PURE__*/ _jsx(Input, {
                                                name: `${t('upload:height')} (px)`,
                                                onChange: (value)=>fineTuneCrop({
                                                        dimension: 'height',
                                                        value
                                                    }),
                                                ref: heightRef,
                                                value: (crop.height / 100 * originalHeight).toFixed(0)
                                            })
                                        ]
                                    })
                                ]
                            }),
                            showFocalPoint && /*#__PURE__*/ _jsxs("div", {
                                className: `${baseClass}__groupWrap`,
                                children: [
                                    /*#__PURE__*/ _jsx("div", {
                                        children: /*#__PURE__*/ _jsxs("div", {
                                            className: `${baseClass}__titleWrap`,
                                            children: [
                                                /*#__PURE__*/ _jsx("h3", {
                                                    children: t('upload:focalPoint')
                                                }),
                                                /*#__PURE__*/ _jsx(Button, {
                                                    buttonStyle: "none",
                                                    className: `${baseClass}__reset`,
                                                    onClick: centerFocalPoint,
                                                    children: t('general:reset')
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ _jsx("span", {
                                        className: `${baseClass}__description`,
                                        children: t('upload:focalPointDescription')
                                    }),
                                    /*#__PURE__*/ _jsxs("div", {
                                        className: `${baseClass}__inputsWrap`,
                                        children: [
                                            /*#__PURE__*/ _jsx(Input, {
                                                name: "X %",
                                                onChange: (value)=>fineTuneFocalPosition({
                                                        coordinate: 'x',
                                                        value
                                                    }),
                                                value: focalPosition.x.toFixed(0)
                                            }),
                                            /*#__PURE__*/ _jsx(Input, {
                                                name: "Y %",
                                                onChange: (value)=>fineTuneFocalPosition({
                                                        coordinate: 'y',
                                                        value
                                                    }),
                                                value: focalPosition.y.toFixed(0)
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
const DraggableElement = ({ boundsRef, checkBounds, children, className, containerRef, initialPosition = {
    x: 50,
    y: 50
}, onDragEnd, setCheckBounds })=>{
    const [position, setPosition] = useState({
        x: initialPosition.x,
        y: initialPosition.y
    });
    const [isDragging, setIsDragging] = useState(false);
    const dragRef = useRef(undefined);
    const getCoordinates = React.useCallback((mouseXArg, mouseYArg, recenter)=>{
        const containerRect = containerRef.current.getBoundingClientRect();
        const boundsRect = boundsRef.current.getBoundingClientRect();
        const mouseX = mouseXArg ?? boundsRect.left;
        const mouseY = mouseYArg ?? boundsRect.top;
        const xOutOfBounds = mouseX < boundsRect.left || mouseX > boundsRect.right;
        const yOutOfBounds = mouseY < boundsRect.top || mouseY > boundsRect.bottom;
        let x = (mouseX - containerRect.left) / containerRect.width * 100;
        let y = (mouseY - containerRect.top) / containerRect.height * 100;
        const xCenter = (boundsRect.left - containerRect.left + boundsRect.width / 2) / containerRect.width * 100;
        const yCenter = (boundsRect.top - containerRect.top + boundsRect.height / 2) / containerRect.height * 100;
        if (xOutOfBounds || yOutOfBounds) {
            setIsDragging(false);
            if (mouseX < boundsRect.left) {
                x = (boundsRect.left - containerRect.left) / containerRect.width * 100;
            } else if (mouseX > boundsRect.right) {
                x = (containerRect.width - (containerRect.right - boundsRect.right)) / containerRect.width * 100;
            }
            if (mouseY < boundsRect.top) {
                y = (boundsRect.top - containerRect.top) / containerRect.height * 100;
            } else if (mouseY > boundsRect.bottom) {
                y = (containerRect.height - (containerRect.bottom - boundsRect.bottom)) / containerRect.height * 100;
            }
            if (recenter) {
                x = xOutOfBounds ? xCenter : x;
                y = yOutOfBounds ? yCenter : y;
            }
        }
        return {
            x,
            y
        };
    }, [
        boundsRef,
        containerRef
    ]);
    const handleMouseDown = (event)=>{
        event.preventDefault();
        setIsDragging(true);
    };
    const handleMouseMove = (event)=>{
        if (!isDragging) return null;
        const { x, y } = getCoordinates(event.clientX, event.clientY);
        setPosition({
            x,
            y
        });
    };
    const onDrop = ()=>{
        setIsDragging(false);
        onDragEnd(position);
    };
    React.useEffect(()=>{
        if (isDragging || !dragRef.current) return;
        if (checkBounds) {
            const { height, left, top, width } = dragRef.current.getBoundingClientRect();
            const { x, y } = getCoordinates(left + width / 2, top + height / 2, true);
            onDragEnd({
                x,
                y
            });
            setPosition({
                x,
                y
            });
            setCheckBounds(false);
            return;
        }
    }, [
        getCoordinates,
        isDragging,
        checkBounds,
        setCheckBounds,
        position.x,
        position.y,
        onDragEnd
    ]);
    React.useEffect(()=>{
        setPosition({
            x: initialPosition.x,
            y: initialPosition.y
        });
    }, [
        initialPosition.x,
        initialPosition.y
    ]);
    return /*#__PURE__*/ _jsxs("div", {
        className: [
            `${baseClass}__draggable-container`,
            isDragging && `${baseClass}__draggable-container--dragging`
        ].filter(Boolean).join(' '),
        onMouseMove: handleMouseMove,
        children: [
            /*#__PURE__*/ _jsx("button", {
                className: [
                    `${baseClass}__draggable`,
                    className
                ].filter(Boolean).join(' '),
                onMouseDown: handleMouseDown,
                onMouseUp: onDrop,
                ref: dragRef,
                style: {
                    left: `${position.x}%`,
                    top: `${position.y}%`
                },
                type: "button",
                children: children
            }),
            /*#__PURE__*/ _jsx("div", {})
        ]
    });
};

//# sourceMappingURL=index.js.map