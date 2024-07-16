import { doesLineHeightAffectElement } from './doesLineHeightAffectElement.js';
export function setHandlePosition(targetElem, handleElem, anchorElem, leftOffset = 0) {
    if (!targetElem) {
        handleElem.style.opacity = '0';
        handleElem.style.transform = 'translate(-10000px, -10000px)';
        return;
    }
    const targetRect = targetElem.getBoundingClientRect();
    const targetStyle = window.getComputedStyle(targetElem);
    const floatingElemRect = handleElem.getBoundingClientRect();
    const anchorElementRect = anchorElem.getBoundingClientRect();
    let top;
    const shouldDisplayHandleInCenter = targetRect.height < 60;
    if (!shouldDisplayHandleInCenter) {
        // No need to let line height affect the re-positioning of the floating element if line height has no
        // visual effect on the element. Otherwise, the floating element will be positioned incorrectly.
        const actualLineHeight = doesLineHeightAffectElement(targetElem) ? parseInt(targetStyle.lineHeight, 10) : 0;
        top = targetRect.top + (actualLineHeight - floatingElemRect.height) / 2 - anchorElementRect.top - 1 // 1px inaccuracy
        ;
    } else {
        top = targetRect.top - floatingElemRect.height / 2 - anchorElementRect.top + targetRect.height / 2 - 1 // 1px inaccuracy
        ;
    }
    const left = leftOffset;
    handleElem.style.opacity = '1';
    handleElem.style.transform = `translate(${left}px, ${top}px)`;
}

//# sourceMappingURL=setHandlePosition.js.map