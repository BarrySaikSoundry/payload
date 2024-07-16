import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { WithServerSideProps } from '../WithServerSideProps/index.js';
/**
 * If you are passing dynamic props or function props to this component,
 * you should instead use the <RenderCustomClientComponent/>
 */ export const RenderCustomComponent = (props)=>{
    const { CustomComponent, DefaultComponent, componentProps, serverOnlyProps } = props;
    if (CustomComponent) {
        return /*#__PURE__*/ _jsx(WithServerSideProps, {
            Component: CustomComponent,
            serverOnlyProps: serverOnlyProps,
            ...componentProps
        });
    }
    if (DefaultComponent) {
        return /*#__PURE__*/ _jsx(WithServerSideProps, {
            Component: DefaultComponent,
            serverOnlyProps: serverOnlyProps,
            ...componentProps
        });
    }
    return null;
};

//# sourceMappingURL=index.js.map