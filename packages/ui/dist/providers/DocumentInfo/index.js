'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { notFound } from 'next/navigation.js';
import { reduceFieldsToValues } from 'payload/shared';
import * as qs from 'qs-esm';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { formatDocTitle } from '../../utilities/formatDocTitle.js';
import { getFormState } from '../../utilities/getFormState.js';
import { hasSavePermission as getHasSavePermission } from '../../utilities/hasSavePermission.js';
import { isEditing as getIsEditing } from '../../utilities/isEditing.js';
import { useAuth } from '../Auth/index.js';
import { useConfig } from '../Config/index.js';
import { useLocale } from '../Locale/index.js';
import { usePreferences } from '../Preferences/index.js';
import { useTranslation } from '../Translation/index.js';
const Context = /*#__PURE__*/ createContext({});
export const useDocumentInfo = ()=>useContext(Context);
export const DocumentInfoProvider = ({ children, ...props })=>{
    const { id, collectionSlug, docPermissions: docPermissionsFromProps, globalSlug, hasPublishPermission: hasPublishPermissionFromProps, hasSavePermission: hasSavePermissionFromProps, initialData: initialDataFromProps, initialState: initialStateFromProps, onLoadError, onSave: onSaveFromProps } = props;
    const { admin: { dateFormat }, collections, globals, routes: { api }, serverURL } = useConfig();
    const collectionConfig = collections.find((c)=>c.slug === collectionSlug);
    const globalConfig = globals.find((g)=>g.slug === globalSlug);
    const docConfig = collectionConfig || globalConfig;
    const { i18n } = useTranslation();
    const [documentTitle, setDocumentTitle] = useState(()=>{
        if (!initialDataFromProps) return '';
        return formatDocTitle({
            collectionConfig,
            data: {
                ...initialDataFromProps,
                id
            },
            dateFormat,
            fallback: id?.toString(),
            globalConfig,
            i18n
        });
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState(initialDataFromProps);
    const [initialState, setInitialState] = useState(initialStateFromProps);
    const [publishedDoc, setPublishedDoc] = useState(null);
    const [versions, setVersions] = useState(null);
    const [docPermissions, setDocPermissions] = useState(docPermissionsFromProps);
    const [hasSavePermission, setHasSavePermission] = useState(hasSavePermissionFromProps);
    const [hasPublishPermission, setHasPublishPermission] = useState(hasPublishPermissionFromProps);
    const isInitializing = initialState === undefined || data === undefined;
    const hasInitializedDocPermissions = useRef(false);
    const [unpublishedVersions, setUnpublishedVersions] = useState(null);
    const { getPreference, setPreference } = usePreferences();
    const { permissions } = useAuth();
    const { code: locale } = useLocale();
    const prevLocale = useRef(locale);
    const versionsConfig = docConfig?.versions;
    const baseURL = `${serverURL}${api}`;
    let slug;
    let preferencesKey;
    if (globalSlug) {
        slug = globalSlug;
        preferencesKey = `global-${slug}`;
    }
    if (collectionSlug) {
        slug = collectionSlug;
        if (id) {
            preferencesKey = `collection-${slug}-${id}`;
        }
    }
    const isEditing = getIsEditing({
        id,
        collectionSlug,
        globalSlug
    });
    const operation = isEditing ? 'update' : 'create';
    const shouldFetchVersions = Boolean(versionsConfig && docPermissions?.readVersions?.permission);
    const getVersions = useCallback(async ()=>{
        let versionFetchURL;
        let publishedFetchURL;
        let unpublishedVersionJSON = null;
        let versionJSON = null;
        let shouldFetch = true;
        const versionParams = {
            depth: 0,
            where: {
                and: []
            }
        };
        const publishedVersionParams = {
            depth: 0,
            locale: locale || undefined,
            where: {
                and: [
                    {
                        or: [
                            {
                                _status: {
                                    equals: 'published'
                                }
                            },
                            {
                                _status: {
                                    exists: false
                                }
                            }
                        ]
                    }
                ]
            }
        };
        if (globalSlug) {
            versionFetchURL = `${baseURL}/globals/${globalSlug}/versions`;
            publishedFetchURL = `${baseURL}/globals/${globalSlug}?${qs.stringify(publishedVersionParams)}`;
        }
        if (collectionSlug) {
            versionFetchURL = `${baseURL}/${collectionSlug}/versions`;
            publishedVersionParams.where.and.push({
                id: {
                    equals: id
                }
            });
            publishedFetchURL = `${baseURL}/${collectionSlug}?${qs.stringify(publishedVersionParams)}`;
            if (!id) {
                shouldFetch = false;
            }
            versionParams.where.and.push({
                parent: {
                    equals: id
                }
            });
        }
        if (shouldFetch) {
            let publishedJSON;
            if (versionsConfig?.drafts) {
                publishedJSON = await fetch(publishedFetchURL, {
                    credentials: 'include',
                    headers: {
                        'Accept-Language': i18n.language
                    }
                }).then((res)=>res.json());
                if (collectionSlug) {
                    publishedJSON = publishedJSON?.docs?.[0];
                }
            }
            if (shouldFetchVersions) {
                versionJSON = await fetch(`${versionFetchURL}?${qs.stringify(versionParams)}`, {
                    credentials: 'include',
                    headers: {
                        'Accept-Language': i18n.language
                    }
                }).then((res)=>res.json());
                if (publishedJSON?.updatedAt) {
                    const newerVersionParams = {
                        ...versionParams,
                        where: {
                            ...versionParams.where,
                            and: [
                                ...versionParams.where.and,
                                {
                                    updatedAt: {
                                        greater_than: publishedJSON?.updatedAt
                                    }
                                }
                            ]
                        }
                    };
                    // Get any newer versions available
                    const newerVersionRes = await fetch(`${versionFetchURL}?${qs.stringify(newerVersionParams)}`, {
                        credentials: 'include',
                        headers: {
                            'Accept-Language': i18n.language
                        }
                    });
                    if (newerVersionRes.status === 200) {
                        unpublishedVersionJSON = await newerVersionRes.json();
                    }
                }
            }
            setPublishedDoc(publishedJSON);
            setVersions(versionJSON);
            setUnpublishedVersions(unpublishedVersionJSON);
        }
    }, [
        i18n,
        globalSlug,
        collectionSlug,
        id,
        baseURL,
        locale,
        versionsConfig,
        shouldFetchVersions
    ]);
    const getDocPermissions = React.useCallback(async (data)=>{
        const params = {
            locale: locale || undefined
        };
        const newIsEditing = getIsEditing({
            id: data?.id,
            collectionSlug,
            globalSlug
        });
        if (newIsEditing) {
            const docAccessURL = collectionSlug ? `/${collectionSlug}/access/${data.id}` : globalSlug ? `/globals/${globalSlug}/access` : null;
            if (docAccessURL) {
                const res = await fetch(`${serverURL}${api}${docAccessURL}?${qs.stringify(params)}`, {
                    credentials: 'include',
                    headers: {
                        'Accept-Language': i18n.language
                    }
                });
                const json = await res.json();
                const publishedAccessJSON = await fetch(`${serverURL}${api}${docAccessURL}?${qs.stringify(params)}`, {
                    body: JSON.stringify({
                        data: {
                            ...data || {},
                            _status: 'published'
                        }
                    }),
                    credentials: 'include',
                    headers: {
                        'Accept-Language': i18n.language
                    },
                    method: 'POST'
                }).then((res)=>res.json());
                setDocPermissions(json);
                setHasSavePermission(getHasSavePermission({
                    collectionSlug,
                    docPermissions: json,
                    globalSlug,
                    isEditing: newIsEditing
                }));
                setHasPublishPermission(publishedAccessJSON?.update?.permission);
            }
        } else {
            // when creating new documents, there is no permissions saved for this document yet
            // use the generic entity permissions instead
            const newDocPermissions = collectionSlug ? permissions?.collections?.[collectionSlug] : permissions?.globals?.[globalSlug];
            setDocPermissions(newDocPermissions);
            setHasSavePermission(getHasSavePermission({
                collectionSlug,
                docPermissions: newDocPermissions,
                globalSlug,
                isEditing: newIsEditing
            }));
        }
    }, [
        serverURL,
        api,
        permissions,
        i18n.language,
        locale,
        collectionSlug,
        globalSlug
    ]);
    const getDocPreferences = useCallback(()=>{
        return getPreference(preferencesKey);
    }, [
        getPreference,
        preferencesKey
    ]);
    const setDocFieldPreferences = useCallback(async (path, fieldPreferences)=>{
        const allPreferences = await getDocPreferences();
        if (preferencesKey) {
            try {
                await setPreference(preferencesKey, {
                    ...allPreferences,
                    fields: {
                        ...allPreferences?.fields || {},
                        [path]: {
                            ...allPreferences?.fields?.[path],
                            ...fieldPreferences
                        }
                    }
                });
            } catch (e) {
                console.error(e) // eslint-disable-line no-console
                ;
            }
        }
    }, [
        setPreference,
        preferencesKey,
        getDocPreferences
    ]);
    const onSave = React.useCallback(async (json)=>{
        if (typeof onSaveFromProps === 'function') {
            void onSaveFromProps(json);
        }
        const docPreferences = await getDocPreferences();
        const newData = collectionSlug ? json.doc : json.result;
        const newState = await getFormState({
            apiRoute: api,
            body: {
                id,
                collectionSlug,
                data: newData,
                docPreferences,
                globalSlug,
                locale,
                operation,
                schemaPath: collectionSlug || globalSlug
            },
            serverURL
        });
        setInitialState(newState);
        setData(newData);
        await getDocPermissions(newData);
    }, [
        api,
        collectionSlug,
        getDocPreferences,
        globalSlug,
        id,
        operation,
        locale,
        onSaveFromProps,
        serverURL,
        getDocPermissions
    ]);
    useEffect(()=>{
        const abortController = new AbortController();
        const localeChanged = locale !== prevLocale.current;
        if (initialStateFromProps === undefined || initialDataFromProps === undefined || localeChanged) {
            if (localeChanged) prevLocale.current = locale;
            const getInitialState = async ()=>{
                setIsError(false);
                setIsLoading(true);
                try {
                    const result = await getFormState({
                        apiRoute: api,
                        body: {
                            id,
                            collectionSlug,
                            globalSlug,
                            locale,
                            operation,
                            schemaPath: collectionSlug || globalSlug
                        },
                        onError: onLoadError,
                        serverURL,
                        signal: abortController.signal
                    });
                    setData(reduceFieldsToValues(result, true));
                    setInitialState(result);
                } catch (err) {
                    if (!abortController.signal.aborted) {
                        if (typeof onLoadError === 'function') {
                            void onLoadError();
                        }
                        setIsError(true);
                        setIsLoading(false);
                    }
                }
                setIsLoading(false);
            };
            void getInitialState();
        }
        return ()=>{
            abortController.abort();
        };
    }, [
        api,
        operation,
        collectionSlug,
        serverURL,
        id,
        globalSlug,
        locale,
        onLoadError,
        initialDataFromProps,
        initialStateFromProps
    ]);
    useEffect(()=>{
        void getVersions();
    }, [
        getVersions
    ]);
    useEffect(()=>{
        setDocumentTitle(formatDocTitle({
            collectionConfig,
            data: {
                ...data,
                id
            },
            dateFormat,
            fallback: id?.toString(),
            globalConfig,
            i18n
        }));
    }, [
        collectionConfig,
        data,
        dateFormat,
        i18n,
        id,
        globalConfig
    ]);
    useEffect(()=>{
        const loadDocPermissions = async ()=>{
            const docPermissions = docPermissionsFromProps;
            const hasSavePermission = hasSavePermissionFromProps;
            const hasPublishPermission = hasPublishPermissionFromProps;
            if (!docPermissions || hasSavePermission === undefined || hasSavePermission === null || hasPublishPermission === undefined || hasPublishPermission === null) {
                await getDocPermissions(data);
            }
        };
        if (!hasInitializedDocPermissions.current && data && (collectionSlug || globalSlug)) {
            hasInitializedDocPermissions.current = true;
            void loadDocPermissions();
        }
    }, [
        getDocPermissions,
        docPermissionsFromProps,
        hasSavePermissionFromProps,
        hasPublishPermissionFromProps,
        setDocPermissions,
        collectionSlug,
        globalSlug,
        data
    ]);
    if (isError) notFound();
    const value = {
        ...props,
        docConfig,
        docPermissions,
        getDocPermissions,
        getDocPreferences,
        getVersions,
        hasPublishPermission,
        hasSavePermission,
        initialData: data,
        initialState,
        isInitializing,
        isLoading,
        onSave,
        publishedDoc,
        setDocFieldPreferences,
        setDocumentTitle,
        title: documentTitle,
        unpublishedVersions,
        versions
    };
    return /*#__PURE__*/ _jsx(Context.Provider, {
        value: value,
        children: children
    });
};

//# sourceMappingURL=index.js.map