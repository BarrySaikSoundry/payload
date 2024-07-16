"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useLivePreview", {
    enumerable: true,
    get: function() {
        return useLivePreview;
    }
});
const _livepreview = require("@payloadcms/live-preview");
const _vue = require("vue");
const useLivePreview = (props)=>{
    const { apiRoute, depth, initialData, serverURL } = props;
    const data = (0, _vue.ref)(initialData);
    const isLoading = (0, _vue.ref)(true);
    const hasSentReadyMessage = (0, _vue.ref)(false);
    const onChange = (mergedData)=>{
        data.value = mergedData;
        isLoading.value = false;
    };
    let subscription;
    (0, _vue.onMounted)(()=>{
        subscription = (0, _livepreview.subscribe)({
            apiRoute,
            callback: onChange,
            depth,
            initialData,
            serverURL
        });
        if (!hasSentReadyMessage.value) {
            hasSentReadyMessage.value = true;
            (0, _livepreview.ready)({
                serverURL
            });
        }
    });
    (0, _vue.onUnmounted)(()=>{
        (0, _livepreview.unsubscribe)(subscription);
    });
    return {
        data,
        isLoading
    };
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFJlZiB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgcmVhZHksIHN1YnNjcmliZSwgdW5zdWJzY3JpYmUgfSBmcm9tICdAcGF5bG9hZGNtcy9saXZlLXByZXZpZXcnXG5pbXBvcnQgeyBvbk1vdW50ZWQsIG9uVW5tb3VudGVkLCByZWYgfSBmcm9tICd2dWUnXG5cbi8qKlxuICogVnVlIGNvbXBvc2FibGUgdG8gaW1wbGVtZW50IFBheWxvYWQgQ01TIExpdmUgUHJldmlldy5cbiAqXG4gKiB7QGxpbmsgaHR0cHM6Ly9wYXlsb2FkY21zLmNvbS9kb2NzL2xpdmUtcHJldmlldy9mcm9udGVuZCBWaWV3IHRoZSBkb2N1bWVudGF0aW9ufVxuICovXG5leHBvcnQgY29uc3QgdXNlTGl2ZVByZXZpZXcgPSA8VD4ocHJvcHM6IHtcbiAgYXBpUm91dGU/OiBzdHJpbmdcbiAgZGVwdGg/OiBudW1iZXJcbiAgaW5pdGlhbERhdGE6IFRcbiAgc2VydmVyVVJMOiBzdHJpbmdcbn0pOiB7XG4gIGRhdGE6IFJlZjxUPlxuICBpc0xvYWRpbmc6IFJlZjxib29sZWFuPlxufSA9PiB7XG4gIGNvbnN0IHsgYXBpUm91dGUsIGRlcHRoLCBpbml0aWFsRGF0YSwgc2VydmVyVVJMIH0gPSBwcm9wc1xuICBjb25zdCBkYXRhID0gcmVmKGluaXRpYWxEYXRhKSBhcyBSZWY8VD5cbiAgY29uc3QgaXNMb2FkaW5nID0gcmVmKHRydWUpXG4gIGNvbnN0IGhhc1NlbnRSZWFkeU1lc3NhZ2UgPSByZWYoZmFsc2UpXG5cbiAgY29uc3Qgb25DaGFuZ2UgPSAobWVyZ2VkRGF0YTogVCkgPT4ge1xuICAgIGRhdGEudmFsdWUgPSBtZXJnZWREYXRhXG4gICAgaXNMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgfVxuXG4gIGxldCBzdWJzY3JpcHRpb246IChldmVudDogTWVzc2FnZUV2ZW50KSA9PiB2b2lkXG5cbiAgb25Nb3VudGVkKCgpID0+IHtcbiAgICBzdWJzY3JpcHRpb24gPSBzdWJzY3JpYmUoe1xuICAgICAgYXBpUm91dGUsXG4gICAgICBjYWxsYmFjazogb25DaGFuZ2UsXG4gICAgICBkZXB0aCxcbiAgICAgIGluaXRpYWxEYXRhLFxuICAgICAgc2VydmVyVVJMLFxuICAgIH0pXG5cbiAgICBpZiAoIWhhc1NlbnRSZWFkeU1lc3NhZ2UudmFsdWUpIHtcbiAgICAgIGhhc1NlbnRSZWFkeU1lc3NhZ2UudmFsdWUgPSB0cnVlXG5cbiAgICAgIHJlYWR5KHtcbiAgICAgICAgc2VydmVyVVJMLFxuICAgICAgfSlcbiAgICB9XG4gIH0pXG5cbiAgb25Vbm1vdW50ZWQoKCkgPT4ge1xuICAgIHVuc3Vic2NyaWJlKHN1YnNjcmlwdGlvbilcbiAgfSlcblxuICByZXR1cm4ge1xuICAgIGRhdGEsXG4gICAgaXNMb2FkaW5nLFxuICB9XG59XG4iXSwibmFtZXMiOlsidXNlTGl2ZVByZXZpZXciLCJwcm9wcyIsImFwaVJvdXRlIiwiZGVwdGgiLCJpbml0aWFsRGF0YSIsInNlcnZlclVSTCIsImRhdGEiLCJyZWYiLCJpc0xvYWRpbmciLCJoYXNTZW50UmVhZHlNZXNzYWdlIiwib25DaGFuZ2UiLCJtZXJnZWREYXRhIiwidmFsdWUiLCJzdWJzY3JpcHRpb24iLCJvbk1vdW50ZWQiLCJzdWJzY3JpYmUiLCJjYWxsYmFjayIsInJlYWR5Iiwib25Vbm1vdW50ZWQiLCJ1bnN1YnNjcmliZSJdLCJtYXBwaW5ncyI6Ijs7OzsrQkFVYUE7OztlQUFBQTs7OzZCQVJpQztxQkFDRjtBQU9yQyxNQUFNQSxpQkFBaUIsQ0FBSUM7SUFTaEMsTUFBTSxFQUFFQyxRQUFRLEVBQUVDLEtBQUssRUFBRUMsV0FBVyxFQUFFQyxTQUFTLEVBQUUsR0FBR0o7SUFDcEQsTUFBTUssT0FBT0MsSUFBQUEsUUFBRyxFQUFDSDtJQUNqQixNQUFNSSxZQUFZRCxJQUFBQSxRQUFHLEVBQUM7SUFDdEIsTUFBTUUsc0JBQXNCRixJQUFBQSxRQUFHLEVBQUM7SUFFaEMsTUFBTUcsV0FBVyxDQUFDQztRQUNoQkwsS0FBS00sS0FBSyxHQUFHRDtRQUNiSCxVQUFVSSxLQUFLLEdBQUc7SUFDcEI7SUFFQSxJQUFJQztJQUVKQyxJQUFBQSxjQUFTLEVBQUM7UUFDUkQsZUFBZUUsSUFBQUEsc0JBQVMsRUFBQztZQUN2QmI7WUFDQWMsVUFBVU47WUFDVlA7WUFDQUM7WUFDQUM7UUFDRjtRQUVBLElBQUksQ0FBQ0ksb0JBQW9CRyxLQUFLLEVBQUU7WUFDOUJILG9CQUFvQkcsS0FBSyxHQUFHO1lBRTVCSyxJQUFBQSxrQkFBSyxFQUFDO2dCQUNKWjtZQUNGO1FBQ0Y7SUFDRjtJQUVBYSxJQUFBQSxnQkFBVyxFQUFDO1FBQ1ZDLElBQUFBLHdCQUFXLEVBQUNOO0lBQ2Q7SUFFQSxPQUFPO1FBQ0xQO1FBQ0FFO0lBQ0Y7QUFDRiJ9