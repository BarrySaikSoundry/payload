import type { DefaultTranslationKeys, DefaultTranslationsObject, I18n, InitI18n, Language } from '../types.js';
/**
 * @function getTranslationString
 *
 * Gets a translation string from a translations object
 *
 * @returns string
 */
export declare const getTranslationString: <TTranslations = {
    authentication: {
        account: string;
        accountOfCurrentUser: string;
        accountVerified: string;
        alreadyActivated: string;
        alreadyLoggedIn: string;
        apiKey: string;
        authenticated: string;
        backToLogin: string;
        beginCreateFirstUser: string;
        changePassword: string;
        checkYourEmailForPasswordReset: string;
        confirmGeneration: string;
        confirmPassword: string;
        createFirstUser: string;
        emailNotValid: string;
        emailSent: string;
        emailVerified: string;
        enableAPIKey: string;
        failedToUnlock: string;
        forceUnlock: string;
        forgotPassword: string;
        forgotPasswordEmailInstructions: string;
        forgotPasswordUsernameInstructions: string;
        usernameNotValid: string;
        forgotPasswordQuestion: string;
        generate: string;
        generateNewAPIKey: string;
        generatingNewAPIKeyWillInvalidate: string;
        lockUntil: string;
        logBackIn: string;
        logOut: string;
        loggedIn: string;
        loggedInChangePassword: string;
        loggedOutInactivity: string;
        loggedOutSuccessfully: string;
        loggingOut: string;
        login: string;
        loginAttempts: string;
        loginUser: string;
        loginWithAnotherUser: string;
        logout: string;
        logoutSuccessful: string;
        logoutUser: string;
        newAPIKeyGenerated: string;
        newAccountCreated: string;
        newPassword: string;
        passed: string;
        passwordResetSuccessfully: string;
        resetPassword: string;
        resetPasswordExpiration: string;
        resetPasswordToken: string;
        resetYourPassword: string;
        stayLoggedIn: string;
        successfullyRegisteredFirstUser: string;
        successfullyUnlocked: string;
        tokenRefreshSuccessful: string;
        username: string;
        unableToVerify: string;
        verified: string;
        verifiedSuccessfully: string;
        verify: string;
        verifyUser: string;
        verifyYourEmail: string;
        youAreInactive: string;
        youAreReceivingResetPassword: string;
        youDidNotRequestPassword: string;
    };
    error: {
        accountAlreadyActivated: string;
        autosaving: string;
        correctInvalidFields: string;
        deletingFile: string;
        deletingTitle: string;
        emailOrPasswordIncorrect: string;
        followingFieldsInvalid_one: string;
        followingFieldsInvalid_other: string;
        incorrectCollection: string;
        invalidFileType: string;
        invalidFileTypeValue: string;
        loadingDocument: string;
        localesNotSaved_one: string;
        localesNotSaved_other: string;
        logoutFailed: string;
        missingEmail: string;
        missingIDOfDocument: string;
        missingIDOfVersion: string;
        missingRequiredData: string;
        noFilesUploaded: string;
        noMatchedField: string;
        noUser: string;
        notAllowedToAccessPage: string;
        notAllowedToPerformAction: string;
        notFound: string;
        previewing: string;
        problemUploadingFile: string;
        tokenInvalidOrExpired: string;
        tokenNotProvided: string;
        unPublishingDocument: string;
        unableToDeleteCount: string;
        unableToUpdateCount: string;
        unauthorized: string;
        unknown: string;
        unspecific: string;
        userEmailAlreadyRegistered: string;
        userLocked: string;
        usernameAlreadyRegistered: string;
        usernameOrPasswordIncorrect: string;
        valueMustBeUnique: string;
        verificationTokenInvalid: string;
    };
    fields: {
        addLabel: string;
        addLink: string;
        addNew: string;
        addNewLabel: string;
        addRelationship: string;
        addUpload: string;
        block: string;
        blockType: string;
        blocks: string;
        chooseBetweenCustomTextOrDocument: string;
        chooseDocumentToLink: string;
        chooseFromExisting: string;
        chooseLabel: string;
        collapseAll: string;
        customURL: string;
        editLabelData: string;
        editLink: string;
        editRelationship: string;
        enterURL: string;
        internalLink: string;
        itemsAndMore: string;
        labelRelationship: string;
        latitude: string;
        linkType: string;
        linkedTo: string;
        longitude: string;
        newLabel: string;
        openInNewTab: string;
        passwordsDoNotMatch: string;
        relatedDocument: string;
        relationTo: string;
        removeRelationship: string;
        removeUpload: string;
        saveChanges: string;
        searchForBlock: string;
        selectExistingLabel: string;
        selectFieldsToEdit: string;
        showAll: string;
        swapRelationship: string;
        swapUpload: string;
        textToDisplay: string;
        toggleBlock: string;
        uploadNewLabel: string;
    };
    general: {
        aboutToDelete: string;
        aboutToDeleteCount_many: string;
        aboutToDeleteCount_one: string;
        aboutToDeleteCount_other: string;
        addBelow: string;
        addFilter: string;
        adminTheme: string;
        and: string;
        applyChanges: string;
        ascending: string;
        automatic: string;
        backToDashboard: string;
        cancel: string;
        changesNotSaved: string;
        close: string;
        collapse: string;
        collections: string;
        columnToSort: string;
        columns: string;
        confirm: string;
        confirmDeletion: string;
        confirmDuplication: string;
        copied: string;
        copy: string;
        create: string;
        createNew: string;
        createNewLabel: string;
        created: string;
        createdAt: string;
        creating: string;
        creatingNewLabel: string;
        custom: string;
        dark: string;
        dashboard: string;
        delete: string;
        deletedCountSuccessfully: string;
        deletedSuccessfully: string;
        deleting: string;
        depth: string;
        descending: string;
        deselectAllRows: string;
        document: string;
        documents: string;
        duplicate: string;
        duplicateWithoutSaving: string;
        edit: string;
        editLabel: string;
        editing: string;
        editingLabel_many: string;
        editingLabel_one: string;
        editingLabel_other: string;
        email: string;
        emailAddress: string;
        enterAValue: string;
        error: string;
        errors: string;
        fallbackToDefaultLocale: string;
        false: string;
        filter: string;
        filterWhere: string;
        filters: string;
        globals: string;
        language: string;
        lastModified: string;
        leaveAnyway: string;
        leaveWithoutSaving: string;
        light: string;
        livePreview: string;
        loading: string;
        locale: string;
        locales: string;
        menu: string;
        moveDown: string;
        moveUp: string;
        newPassword: string;
        noFiltersSet: string;
        noLabel: string;
        noOptions: string;
        noResults: string;
        noValue: string;
        none: string;
        notFound: string;
        nothingFound: string;
        of: string;
        open: string;
        or: string;
        order: string;
        pageNotFound: string;
        password: string;
        payloadSettings: string;
        perPage: string;
        remove: string;
        reset: string;
        row: string;
        rows: string;
        save: string;
        saving: string;
        searchBy: string;
        selectAll: string;
        selectAllRows: string;
        selectValue: string;
        selectedCount: string;
        showAllLabel: string;
        sorryNotFound: string;
        sort: string;
        sortByLabelDirection: string;
        stayOnThisPage: string;
        submissionSuccessful: string;
        submit: string;
        submitting: string;
        success: string;
        successfullyCreated: string;
        successfullyDuplicated: string;
        thisLanguage: string;
        titleDeleted: string;
        true: string;
        unauthorized: string;
        unsavedChangesDuplicate: string;
        untitled: string;
        updatedAt: string;
        updatedCountSuccessfully: string;
        updatedSuccessfully: string;
        updating: string;
        uploading: string;
        user: string;
        users: string;
        value: string;
        welcome: string;
    };
    operators: {
        contains: string;
        equals: string;
        exists: string;
        intersects: string;
        isGreaterThan: string;
        isGreaterThanOrEqualTo: string;
        isIn: string;
        isLessThan: string;
        isLessThanOrEqualTo: string;
        isLike: string;
        isNotEqualTo: string;
        isNotIn: string;
        near: string;
        within: string;
    };
    upload: {
        addImage: string;
        crop: string;
        cropToolDescription: string;
        dragAndDrop: string;
        dragAndDropHere: string;
        editImage: string;
        fileName: string;
        fileSize: string;
        focalPoint: string;
        focalPointDescription: string;
        height: string;
        lessInfo: string;
        moreInfo: string;
        pasteURL: string;
        previewSizes: string;
        selectCollectionToBrowse: string;
        selectFile: string;
        setCropArea: string;
        setFocalPoint: string;
        sizes: string;
        sizesFor: string;
        width: string;
    };
    validation: {
        emailAddress: string;
        enterNumber: string;
        fieldHasNo: string;
        greaterThanMax: string;
        invalidInput: string;
        invalidSelection: string;
        invalidSelections: string;
        lessThanMin: string;
        limitReached: string;
        longerThanMin: string;
        notValidDate: string;
        required: string;
        requiresAtLeast: string;
        requiresNoMoreThan: string;
        requiresTwoNumbers: string;
        shorterThanMax: string;
        trueOrFalse: string;
        validUploadID: string;
    };
    version: {
        type: string;
        aboutToPublishSelection: string;
        aboutToRestore: string;
        aboutToRestoreGlobal: string;
        aboutToRevertToPublished: string;
        aboutToUnpublish: string;
        aboutToUnpublishSelection: string;
        autosave: string;
        autosavedSuccessfully: string;
        autosavedVersion: string;
        changed: string;
        compareVersion: string;
        confirmPublish: string;
        confirmRevertToSaved: string;
        confirmUnpublish: string;
        confirmVersionRestoration: string;
        currentDocumentStatus: string;
        currentDraft: string;
        currentPublishedVersion: string;
        draft: string;
        draftSavedSuccessfully: string;
        lastSavedAgo: string;
        noFurtherVersionsFound: string;
        noRowsFound: string;
        preview: string;
        previouslyPublished: string;
        problemRestoringVersion: string;
        publish: string;
        publishChanges: string;
        published: string;
        publishing: string;
        restoreThisVersion: string;
        restoredSuccessfully: string;
        restoring: string;
        revertToPublished: string;
        reverting: string;
        saveDraft: string;
        selectLocales: string;
        selectVersionToCompare: string;
        showLocales: string;
        showingVersionsFor: string;
        status: string;
        unpublish: string;
        unpublishing: string;
        version: string;
        versionCount_many: string;
        versionCount_none: string;
        versionCount_one: string;
        versionCount_other: string;
        versionCreatedOn: string;
        versionID: string;
        versions: string;
        viewingVersion: string;
        viewingVersionGlobal: string;
        viewingVersions: string;
        viewingVersionsGlobal: string;
    };
}, TTranslationKeys = "authentication:account" | "authentication:accountOfCurrentUser" | "authentication:accountVerified" | "authentication:alreadyActivated" | "authentication:alreadyLoggedIn" | "authentication:apiKey" | "authentication:authenticated" | "authentication:backToLogin" | "authentication:beginCreateFirstUser" | "authentication:changePassword" | "authentication:checkYourEmailForPasswordReset" | "authentication:confirmGeneration" | "authentication:confirmPassword" | "authentication:createFirstUser" | "authentication:emailNotValid" | "authentication:emailSent" | "authentication:emailVerified" | "authentication:enableAPIKey" | "authentication:failedToUnlock" | "authentication:forceUnlock" | "authentication:forgotPassword" | "authentication:forgotPasswordEmailInstructions" | "authentication:forgotPasswordUsernameInstructions" | "authentication:usernameNotValid" | "authentication:forgotPasswordQuestion" | "authentication:generate" | "authentication:generateNewAPIKey" | "authentication:generatingNewAPIKeyWillInvalidate" | "authentication:lockUntil" | "authentication:logBackIn" | "authentication:logOut" | "authentication:loggedIn" | "authentication:loggedInChangePassword" | "authentication:loggedOutInactivity" | "authentication:loggedOutSuccessfully" | "authentication:loggingOut" | "authentication:login" | "authentication:loginAttempts" | "authentication:loginUser" | "authentication:loginWithAnotherUser" | "authentication:logout" | "authentication:logoutSuccessful" | "authentication:logoutUser" | "authentication:newAPIKeyGenerated" | "authentication:newAccountCreated" | "authentication:newPassword" | "authentication:passed" | "authentication:passwordResetSuccessfully" | "authentication:resetPassword" | "authentication:resetPasswordExpiration" | "authentication:resetPasswordToken" | "authentication:resetYourPassword" | "authentication:stayLoggedIn" | "authentication:successfullyRegisteredFirstUser" | "authentication:successfullyUnlocked" | "authentication:tokenRefreshSuccessful" | "authentication:username" | "authentication:unableToVerify" | "authentication:verified" | "authentication:verifiedSuccessfully" | "authentication:verify" | "authentication:verifyUser" | "authentication:verifyYourEmail" | "authentication:youAreInactive" | "authentication:youAreReceivingResetPassword" | "authentication:youDidNotRequestPassword" | "error:accountAlreadyActivated" | "error:autosaving" | "error:correctInvalidFields" | "error:deletingFile" | "error:deletingTitle" | "error:emailOrPasswordIncorrect" | "error:incorrectCollection" | "error:invalidFileType" | "error:invalidFileTypeValue" | "error:loadingDocument" | "error:logoutFailed" | "error:missingEmail" | "error:missingIDOfDocument" | "error:missingIDOfVersion" | "error:missingRequiredData" | "error:noFilesUploaded" | "error:noMatchedField" | "error:noUser" | "error:notAllowedToAccessPage" | "error:notAllowedToPerformAction" | "error:notFound" | "error:previewing" | "error:problemUploadingFile" | "error:tokenInvalidOrExpired" | "error:tokenNotProvided" | "error:unPublishingDocument" | "error:unableToDeleteCount" | "error:unableToUpdateCount" | "error:unauthorized" | "error:unknown" | "error:unspecific" | "error:userEmailAlreadyRegistered" | "error:userLocked" | "error:usernameAlreadyRegistered" | "error:usernameOrPasswordIncorrect" | "error:valueMustBeUnique" | "error:verificationTokenInvalid" | "fields:block" | "fields:blocks" | "fields:addLabel" | "fields:addLink" | "fields:addNew" | "fields:addNewLabel" | "fields:addRelationship" | "fields:addUpload" | "fields:blockType" | "fields:chooseBetweenCustomTextOrDocument" | "fields:chooseDocumentToLink" | "fields:chooseFromExisting" | "fields:chooseLabel" | "fields:collapseAll" | "fields:customURL" | "fields:editLabelData" | "fields:editLink" | "fields:editRelationship" | "fields:enterURL" | "fields:internalLink" | "fields:itemsAndMore" | "fields:labelRelationship" | "fields:latitude" | "fields:linkType" | "fields:linkedTo" | "fields:longitude" | "fields:newLabel" | "fields:openInNewTab" | "fields:passwordsDoNotMatch" | "fields:relatedDocument" | "fields:relationTo" | "fields:removeRelationship" | "fields:removeUpload" | "fields:saveChanges" | "fields:searchForBlock" | "fields:selectExistingLabel" | "fields:selectFieldsToEdit" | "fields:showAll" | "fields:swapRelationship" | "fields:swapUpload" | "fields:textToDisplay" | "fields:toggleBlock" | "fields:uploadNewLabel" | "general:of" | "general:language" | "general:error" | "general:newPassword" | "general:notFound" | "general:unauthorized" | "general:aboutToDelete" | "general:addBelow" | "general:addFilter" | "general:adminTheme" | "general:and" | "general:applyChanges" | "general:ascending" | "general:automatic" | "general:backToDashboard" | "general:cancel" | "general:changesNotSaved" | "general:close" | "general:collapse" | "general:collections" | "general:columnToSort" | "general:columns" | "general:confirm" | "general:confirmDeletion" | "general:confirmDuplication" | "general:copied" | "general:copy" | "general:create" | "general:createNew" | "general:createNewLabel" | "general:created" | "general:createdAt" | "general:creating" | "general:creatingNewLabel" | "general:custom" | "general:dark" | "general:dashboard" | "general:delete" | "general:deletedCountSuccessfully" | "general:deletedSuccessfully" | "general:deleting" | "general:depth" | "general:descending" | "general:deselectAllRows" | "general:document" | "general:documents" | "general:duplicate" | "general:duplicateWithoutSaving" | "general:edit" | "general:editLabel" | "general:editing" | "general:email" | "general:emailAddress" | "general:enterAValue" | "general:errors" | "general:fallbackToDefaultLocale" | "general:false" | "general:filter" | "general:filterWhere" | "general:filters" | "general:globals" | "general:lastModified" | "general:leaveAnyway" | "general:leaveWithoutSaving" | "general:light" | "general:livePreview" | "general:loading" | "general:locale" | "general:locales" | "general:menu" | "general:moveDown" | "general:moveUp" | "general:noFiltersSet" | "general:noLabel" | "general:noOptions" | "general:noResults" | "general:noValue" | "general:none" | "general:nothingFound" | "general:open" | "general:or" | "general:order" | "general:pageNotFound" | "general:password" | "general:payloadSettings" | "general:perPage" | "general:remove" | "general:reset" | "general:row" | "general:rows" | "general:save" | "general:saving" | "general:searchBy" | "general:selectAll" | "general:selectAllRows" | "general:selectValue" | "general:selectedCount" | "general:showAllLabel" | "general:sorryNotFound" | "general:sort" | "general:sortByLabelDirection" | "general:stayOnThisPage" | "general:submissionSuccessful" | "general:submit" | "general:submitting" | "general:success" | "general:successfullyCreated" | "general:successfullyDuplicated" | "general:thisLanguage" | "general:titleDeleted" | "general:true" | "general:unsavedChangesDuplicate" | "general:untitled" | "general:updatedAt" | "general:updatedCountSuccessfully" | "general:updatedSuccessfully" | "general:updating" | "general:uploading" | "general:user" | "general:users" | "general:value" | "general:welcome" | "operators:contains" | "operators:equals" | "operators:exists" | "operators:intersects" | "operators:near" | "operators:within" | "operators:isGreaterThan" | "operators:isGreaterThanOrEqualTo" | "operators:isIn" | "operators:isLessThan" | "operators:isLessThanOrEqualTo" | "operators:isLike" | "operators:isNotEqualTo" | "operators:isNotIn" | "upload:addImage" | "upload:crop" | "upload:cropToolDescription" | "upload:dragAndDrop" | "upload:dragAndDropHere" | "upload:editImage" | "upload:fileName" | "upload:fileSize" | "upload:focalPoint" | "upload:focalPointDescription" | "upload:height" | "upload:lessInfo" | "upload:moreInfo" | "upload:pasteURL" | "upload:previewSizes" | "upload:selectCollectionToBrowse" | "upload:selectFile" | "upload:setCropArea" | "upload:setFocalPoint" | "upload:sizes" | "upload:sizesFor" | "upload:width" | "validation:emailAddress" | "validation:enterNumber" | "validation:fieldHasNo" | "validation:greaterThanMax" | "validation:invalidInput" | "validation:invalidSelection" | "validation:invalidSelections" | "validation:lessThanMin" | "validation:limitReached" | "validation:longerThanMin" | "validation:notValidDate" | "validation:required" | "validation:requiresAtLeast" | "validation:requiresNoMoreThan" | "validation:requiresTwoNumbers" | "validation:shorterThanMax" | "validation:trueOrFalse" | "validation:validUploadID" | "version:version" | "version:type" | "version:aboutToPublishSelection" | "version:aboutToRestore" | "version:aboutToRestoreGlobal" | "version:aboutToRevertToPublished" | "version:aboutToUnpublish" | "version:aboutToUnpublishSelection" | "version:autosave" | "version:autosavedSuccessfully" | "version:autosavedVersion" | "version:changed" | "version:compareVersion" | "version:confirmPublish" | "version:confirmRevertToSaved" | "version:confirmUnpublish" | "version:confirmVersionRestoration" | "version:currentDocumentStatus" | "version:currentDraft" | "version:currentPublishedVersion" | "version:draft" | "version:draftSavedSuccessfully" | "version:lastSavedAgo" | "version:noFurtherVersionsFound" | "version:noRowsFound" | "version:preview" | "version:previouslyPublished" | "version:problemRestoringVersion" | "version:publish" | "version:publishChanges" | "version:published" | "version:publishing" | "version:restoreThisVersion" | "version:restoredSuccessfully" | "version:restoring" | "version:revertToPublished" | "version:reverting" | "version:saveDraft" | "version:selectLocales" | "version:selectVersionToCompare" | "version:showLocales" | "version:showingVersionsFor" | "version:status" | "version:unpublish" | "version:unpublishing" | "version:versionCount_none" | "version:versionCreatedOn" | "version:versionID" | "version:versions" | "version:viewingVersion" | "version:viewingVersionGlobal" | "version:viewingVersions" | "version:viewingVersionsGlobal" | "error:followingFieldsInvalid" | "error:localesNotSaved" | "general:aboutToDeleteCount" | "general:editingLabel" | "version:versionCount">({ count, key, translations, }: {
    count?: number;
    key: TTranslationKeys;
    translations: Language<TTranslations>["translations"];
}) => string;
/**
 * @function t
 *
 * Merges config defined translations with translations passed in as an argument
 * returns a function that can be used to translate a string
 *
 * @returns string
 */
export declare function t<TTranslations = DefaultTranslationsObject, TTranslationKeys = DefaultTranslationKeys>({ key, translations, vars, }: {
    key: TTranslationKeys;
    translations?: Language<TTranslations>['translations'];
    vars?: Record<string, any>;
}): string;
export declare const initI18n: (args: {
    context: "api" | "client";
} & Parameters<InitI18n>[0]) => Promise<I18n>;
//# sourceMappingURL=init.d.ts.map