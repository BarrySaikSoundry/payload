'use client';
import { useId } from 'react';
import { useEditDepth } from '../../providers/EditDepth/index.js';
import { formatDrawerSlug } from './index.js';
export const useDrawerSlug = (slug)=>{
    const uuid = useId();
    const editDepth = useEditDepth();
    return formatDrawerSlug({
        slug: `${slug}-${uuid}`,
        depth: editDepth
    });
};

//# sourceMappingURL=useDrawerSlug.js.map