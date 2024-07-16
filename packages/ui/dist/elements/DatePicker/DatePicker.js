'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import ReactDatePickerDefaultImport, { registerLocale } from 'react-datepicker';
const ReactDatePicker = ReactDatePickerDefaultImport.default || ReactDatePickerDefaultImport;
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarIcon } from '../../icons/Calendar/index.js';
import { XIcon } from '../../icons/X/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { getFormattedLocale } from './getFormattedLocale.js';
import './index.scss';
const baseClass = 'date-time-picker';
const DatePicker = (props)=>{
    const { displayFormat: customDisplayFormat, maxDate, maxTime, minDate, minTime, monthsToShow = 1, onChange: onChangeFromProps, overrides, pickerAppearance = 'default', placeholder: placeholderText, readOnly, timeFormat = 'h:mm aa', timeIntervals = 30, value } = props;
    // Use the user's AdminUI language preference for the locale
    const { i18n } = useTranslation();
    const datepickerLocale = getFormattedLocale(i18n.language);
    try {
        registerLocale(datepickerLocale, i18n.dateFNS);
    } catch (e) {
        console.warn(`Could not find DatePicker locale for ${i18n.language}`);
    }
    let dateFormat = customDisplayFormat;
    if (!customDisplayFormat) {
        // when no displayFormat is provided, determine format based on the picker appearance
        if (pickerAppearance === 'default') dateFormat = 'MM/dd/yyyy';
        else if (pickerAppearance === 'dayAndTime') dateFormat = 'MMM d, yyy h:mm a';
        else if (pickerAppearance === 'timeOnly') dateFormat = 'h:mm a';
        else if (pickerAppearance === 'dayOnly') dateFormat = 'MMM dd';
        else if (pickerAppearance === 'monthOnly') dateFormat = 'MMMM';
    }
    const onChange = (incomingDate)=>{
        const newDate = incomingDate;
        if (newDate instanceof Date && [
            'dayOnly',
            'default',
            'monthOnly'
        ].includes(pickerAppearance)) {
            const tzOffset = incomingDate.getTimezoneOffset() / 60;
            newDate.setHours(12 - tzOffset, 0);
        }
        if (typeof onChangeFromProps === 'function') onChangeFromProps(newDate);
    };
    const dateTimePickerProps = {
        customInputRef: 'ref',
        dateFormat,
        disabled: readOnly,
        maxDate,
        maxTime,
        minDate,
        minTime,
        monthsShown: Math.min(2, monthsToShow),
        onChange,
        placeholderText,
        popperPlacement: 'bottom-start',
        selected: value && new Date(value),
        showMonthYearPicker: pickerAppearance === 'monthOnly',
        showPopperArrow: false,
        showTimeSelect: pickerAppearance === 'dayAndTime' || pickerAppearance === 'timeOnly',
        timeFormat,
        timeIntervals,
        ...overrides
    };
    const classes = [
        baseClass,
        `${baseClass}__appearance--${pickerAppearance}`
    ].filter(Boolean).join(' ');
    return /*#__PURE__*/ _jsxs("div", {
        className: classes,
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: `${baseClass}__icon-wrap`,
                children: [
                    dateTimePickerProps.selected && /*#__PURE__*/ _jsx("button", {
                        className: `${baseClass}__clear-button`,
                        onClick: ()=>onChange(null),
                        type: "button",
                        children: /*#__PURE__*/ _jsx(XIcon, {})
                    }),
                    /*#__PURE__*/ _jsx(CalendarIcon, {})
                ]
            }),
            /*#__PURE__*/ _jsx("div", {
                className: `${baseClass}__input-wrapper`,
                children: /*#__PURE__*/ _jsx(ReactDatePicker, {
                    ...dateTimePickerProps,
                    dropdownMode: "select",
                    locale: datepickerLocale,
                    showMonthDropdown: true,
                    showYearDropdown: true
                })
            })
        ]
    });
};
// eslint-disable-next-line no-restricted-exports
export default DatePicker;

//# sourceMappingURL=DatePicker.js.map