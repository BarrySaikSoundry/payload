export const getFormState = async (args)=>{
    const { apiRoute, body, onError, serverURL, signal, token } = args;
    const res = await fetch(`${serverURL}${apiRoute}/form-state`, {
        body: JSON.stringify(body),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...token ? {
                Authorization: `JWT ${token}`
            } : {}
        },
        method: 'POST',
        signal
    });
    const json = await res.json();
    if (res.ok) {
        return json;
    } else {
        if (typeof onError === 'function') {
            void onError(json);
        }
    }
    return body?.formState;
};

//# sourceMappingURL=getFormState.js.map