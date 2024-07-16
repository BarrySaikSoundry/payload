export function debounce(func, wait) {
    let timeout = null;
    return function(...args) {
        const later = ()=>{
            clearTimeout(timeout);
            timeout = null;
            func(...args);
        };
        clearTimeout(timeout);
        timeout = window.setTimeout(later, wait);
    };
}

//# sourceMappingURL=debounce.js.map