'use client';
import { jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React, { useEffect, useState } from 'react';
import { useIntersect } from '../../../../../hooks/useIntersect.js';
import { useConfig } from '../../../../../providers/Config/index.js';
import { useTranslation } from '../../../../../providers/Translation/index.js';
import { canUseDOM } from '../../../../../utilities/canUseDOM.js';
import { formatDocTitle } from '../../../../../utilities/formatDocTitle.js';
import { useListRelationships } from '../../../RelationshipProvider/index.js';
import './index.scss';
const baseClass = 'relationship-cell';
const totalToShow = 3;
export const RelationshipCell = ({ cellData, label, relationTo })=>{
    const config = useConfig();
    const { collections, routes } = config;
    const [intersectionRef, entry] = useIntersect();
    const [values, setValues] = useState([]);
    const { documents, getRelationships } = useListRelationships();
    const [hasRequested, setHasRequested] = useState(false);
    const { i18n, t } = useTranslation();
    const isAboveViewport = canUseDOM ? entry?.boundingClientRect?.top < window.innerHeight : false;
    useEffect(()=>{
        if ((cellData || typeof cellData === 'number') && isAboveViewport && !hasRequested) {
            const formattedValues = [];
            const arrayCellData = Array.isArray(cellData) ? cellData : [
                cellData
            ];
            arrayCellData.slice(0, arrayCellData.length < totalToShow ? arrayCellData.length : totalToShow).forEach((cell)=>{
                if (typeof cell === 'object' && 'relationTo' in cell && 'value' in cell) {
                    formattedValues.push(cell);
                }
                if ((typeof cell === 'number' || typeof cell === 'string') && typeof relationTo === 'string') {
                    formattedValues.push({
                        relationTo,
                        value: cell
                    });
                }
            });
            getRelationships(formattedValues);
            setHasRequested(true);
            setValues(formattedValues);
        }
    }, [
        cellData,
        relationTo,
        collections,
        isAboveViewport,
        routes.api,
        hasRequested,
        getRelationships
    ]);
    useEffect(()=>{
        if (hasRequested) {
            setHasRequested(false);
        }
    }, [
        cellData
    ]);
    return /*#__PURE__*/ _jsxs("div", {
        className: baseClass,
        ref: intersectionRef,
        children: [
            values.map(({ relationTo, value }, i)=>{
                const document = documents[relationTo][value];
                const relatedCollection = collections.find(({ slug })=>slug === relationTo);
                const label = formatDocTitle({
                    collectionConfig: relatedCollection,
                    data: document || null,
                    dateFormat: config.admin.dateFormat,
                    fallback: `${t('general:untitled')} - ID: ${value}`,
                    i18n
                });
                return /*#__PURE__*/ _jsxs(React.Fragment, {
                    children: [
                        document === false && `${t('general:untitled')} - ID: ${value}`,
                        document === null && `${t('general:loading')}...`,
                        document ? label : null,
                        values.length > i + 1 && ', '
                    ]
                }, i);
            }),
            Array.isArray(cellData) && cellData.length > totalToShow && t('fields:itemsAndMore', {
                count: cellData.length - totalToShow,
                items: ''
            }),
            values.length === 0 && t('general:noLabel', {
                label: getTranslation(label || '', i18n)
            })
        ]
    });
};

//# sourceMappingURL=index.js.map