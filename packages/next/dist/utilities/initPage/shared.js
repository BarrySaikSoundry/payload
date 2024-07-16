const authRouteKeys = [
    'createFirstUser',
    'forgot',
    'login',
    'logout',
    'forgot',
    'inactivity',
    'unauthorized',
    'reset'
];
export const isAdminRoute = (route, adminRoute)=>{
    return route.startsWith(adminRoute);
};
export const isAdminAuthRoute = (config, route, adminRoute)=>{
    const authRoutes = config.admin?.routes ? Object.entries(config.admin.routes).filter(([key])=>authRouteKeys.includes(key)).map(([_, value])=>value) : [];
    return authRoutes.some((r)=>route.replace(adminRoute, '').startsWith(r));
};

//# sourceMappingURL=shared.js.map