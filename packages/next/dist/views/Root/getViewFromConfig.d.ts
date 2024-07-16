import type { AdminViewComponent, SanitizedConfig } from 'payload';
import type { initPage } from '../../utilities/initPage/index.js';
export declare const getViewFromConfig: ({ adminRoute, config, currentRoute, searchParams, segments, }: {
    adminRoute: any;
    config: SanitizedConfig;
    currentRoute: string;
    searchParams: {
        [key: string]: string | string[];
    };
    segments: string[];
}) => {
    DefaultView: AdminViewComponent;
    initPageOptions: Parameters<typeof initPage>[0];
    templateClassName: string;
    templateType: "default" | "minimal";
};
//# sourceMappingURL=getViewFromConfig.d.ts.map