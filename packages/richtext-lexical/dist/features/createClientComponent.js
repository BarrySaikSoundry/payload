'use client';
import { useLexicalFeature } from '../utilities/useLexicalFeature.js';
/**
 * Utility function to create a client component for the client feature
 */ export const createClientComponent = (clientFeature)=>{
    return (props)=>{
        useLexicalFeature(props.featureKey, clientFeature(props));
        return null;
    };
};

//# sourceMappingURL=createClientComponent.js.map