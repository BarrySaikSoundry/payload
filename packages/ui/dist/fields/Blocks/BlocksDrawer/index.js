'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useModal } from '@faceless-ui/modal';
import { getTranslation } from '@payloadcms/translations';
import React, { useEffect, useState } from 'react';
import { Drawer } from '../../../elements/Drawer/index.js';
import { ThumbnailCard } from '../../../elements/ThumbnailCard/index.js';
import { DefaultBlockImage } from '../../../graphics/DefaultBlockImage/index.js';
import { useTranslation } from '../../../providers/Translation/index.js';
import { BlockSearch } from './BlockSearch/index.js';
import './index.scss';
const baseClass = 'blocks-drawer';
const getBlockLabel = (block, i18n)=>{
    if (typeof block.labels.singular === 'string') return block.labels.singular.toLowerCase();
    if (typeof block.labels.singular === 'object') {
        return getTranslation(block.labels.singular, i18n).toLowerCase();
    }
    return '';
};
export const BlocksDrawer = (props)=>{
    const { addRow, addRowIndex, blocks, drawerSlug, labels } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBlocks, setFilteredBlocks] = useState(blocks);
    const { closeModal, isModalOpen } = useModal();
    const { i18n, t } = useTranslation();
    useEffect(()=>{
        if (!isModalOpen) {
            setSearchTerm('');
        }
    }, [
        isModalOpen
    ]);
    useEffect(()=>{
        const searchTermToUse = searchTerm.toLowerCase();
        const matchingBlocks = blocks?.reduce((matchedBlocks, block)=>{
            const blockLabel = getBlockLabel(block, i18n);
            if (blockLabel.includes(searchTermToUse)) matchedBlocks.push(block);
            return matchedBlocks;
        }, []);
        setFilteredBlocks(matchingBlocks);
    }, [
        searchTerm,
        blocks,
        i18n
    ]);
    return /*#__PURE__*/ _jsxs(Drawer, {
        slug: drawerSlug,
        title: t('fields:addLabel', {
            label: getTranslation(labels.singular, i18n)
        }),
        children: [
            /*#__PURE__*/ _jsx(BlockSearch, {
                setSearchTerm: setSearchTerm
            }),
            /*#__PURE__*/ _jsx("div", {
                className: `${baseClass}__blocks-wrapper`,
                children: /*#__PURE__*/ _jsx("ul", {
                    className: `${baseClass}__blocks`,
                    children: filteredBlocks?.map((block, index)=>{
                        const { slug, imageAltText, imageURL, labels: blockLabels } = block;
                        return /*#__PURE__*/ _jsx("li", {
                            className: `${baseClass}__block`,
                            children: /*#__PURE__*/ _jsx(ThumbnailCard, {
                                alignLabel: "center",
                                label: getTranslation(blockLabels?.singular, i18n),
                                onClick: ()=>{
                                    addRow(addRowIndex, slug);
                                    closeModal(drawerSlug);
                                },
                                thumbnail: imageURL ? /*#__PURE__*/ _jsx("img", {
                                    alt: imageAltText,
                                    src: imageURL
                                }) : /*#__PURE__*/ _jsx("div", {
                                    className: `${baseClass}__default-image`,
                                    children: /*#__PURE__*/ _jsx(DefaultBlockImage, {})
                                })
                            })
                        }, index);
                    })
                })
            })
        ]
    });
};

//# sourceMappingURL=index.js.map