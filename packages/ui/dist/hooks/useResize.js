'use client';
import { useEffect, useState } from 'react';
export const useResize = (element)=>{
    const [size, setSize] = useState();
    useEffect(()=>{
        let observer// eslint-disable-line
        ;
        if (element) {
            observer = new ResizeObserver((entries)=>{
                entries.forEach((entry)=>{
                    const { contentBoxSize, contentRect } = entry;
                    let newWidth = 0;
                    let newHeight = 0;
                    if (contentBoxSize) {
                        const newSize = Array.isArray(contentBoxSize) ? contentBoxSize[0] : contentBoxSize;
                        if (newSize) {
                            const { blockSize, inlineSize } = newSize;
                            newWidth = inlineSize;
                            newHeight = blockSize;
                        }
                    } else if (contentRect) {
                        // see note above for why this block is needed
                        const { height, width } = contentRect;
                        newWidth = width;
                        newHeight = height;
                    }
                    setSize({
                        height: newHeight,
                        width: newWidth
                    });
                });
            });
            observer.observe(element);
        }
        return ()=>{
            if (observer) {
                observer.unobserve(element);
            }
        };
    }, [
        element
    ]);
    return {
        size
    };
};

//# sourceMappingURL=useResize.js.map