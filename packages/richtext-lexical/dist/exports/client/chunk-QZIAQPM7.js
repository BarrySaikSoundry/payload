import{useLexicalComposerContext as m}from"@lexical/react/LexicalComposerContext.js";import{createContext as y,useContext as T,useMemo as R,useRef as g,useState as l}from"react";import{jsx as M}from"react/jsx-runtime";function h(){return Math.random().toString(36).substring(2,12)+Math.random().toString(36).substring(2,12)}var p=y({editorConfig:null,field:null,uuid:null}),b=({children:i,editorConfig:s,editorContainerRef:c,fieldProps:u,parentContext:r})=>{let[C]=m(),[a]=l(h()),e=g(new Map),[f,E]=l(null),n=g(new Set),x=R(()=>({blurEditor:t=>{n.current.clear()},childrenEditors:e,editor:C,editorConfig:s,editorContainerRef:c,field:u,focusEditor:t=>{let o=t.uuid;n.current.has(o)||(n.current.add(o),E(t),r?.uuid&&r.focusEditor(t),e.current.forEach((d,v)=>{d.focusEditor(t)}),n.current.clear())},focusedEditor:f,parentEditor:r,registerChild:(t,o)=>{if(!e.current.has(t)){let d=new Map(e.current);d.set(t,o),e.current=d}},unregisterChild:t=>{if(e.current.has(t)){let o=new Map(e.current);o.delete(t),e.current=o}},uuid:a}),[C,e,s,c,u,f,r,a]);return M(p.Provider,{value:x,children:i})},F=()=>{let i=T(p);if(i===void 0)throw new Error("useEditorConfigContext must be used within an EditorConfigProvider");return i};export{b as a,F as b};
//# sourceMappingURL=chunk-QZIAQPM7.js.map