'use client';
import { createContext, useContext } from 'react';
import { createContext as createSelectorContext, useContextSelector, useContext as useFullContext } from 'use-context-selector';
const FormContext = createContext({});
const FormWatchContext = createContext({});
const SubmittedContext = createContext(false);
const ProcessingContext = createContext(false);
const ModifiedContext = createContext(false);
const InitializingContext = createContext(false);
const FormFieldsContext = createSelectorContext([
    {},
    ()=>null
]);
/**
 * Get the state of the form, can be used to submit & validate the form.
 *
 * @see https://payloadcms.com/docs/admin/hooks#useform
 */ const useForm = ()=>useContext(FormContext);
const useWatchForm = ()=>useContext(FormWatchContext);
const useFormSubmitted = ()=>useContext(SubmittedContext);
const useFormProcessing = ()=>useContext(ProcessingContext);
const useFormModified = ()=>useContext(ModifiedContext);
const useFormInitializing = ()=>useContext(InitializingContext);
/**
 * Get and set the value of a form field based on a selector
 *
 * @see https://payloadcms.com/docs/admin/hooks#useformfields
 */ const useFormFields = (selector)=>useContextSelector(FormFieldsContext, selector);
/**
 * Get the state of all form fields.
 *
 * @see https://payloadcms.com/docs/admin/hooks#useallformfields
 */ const useAllFormFields = ()=>useFullContext(FormFieldsContext);
export { FormContext, FormFieldsContext, FormWatchContext, InitializingContext, ModifiedContext, ProcessingContext, SubmittedContext, useAllFormFields, useForm, useFormFields, useFormInitializing, useFormModified, useFormProcessing, useFormSubmitted, useWatchForm,  };

//# sourceMappingURL=context.js.map