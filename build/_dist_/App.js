import t,{useState as o,useRef as m,useEffect as E}from"../web_modules/react.js";import p from"./ScratchIt.min.js";import n from"./images/brush_big.png.proxy.js";import _ from"./images/tile_klaver.png.proxy.js";import"./App.css.proxy.js";const u=50;function f({tile:e}){const r=m(),[s,l]=o(!1),a=()=>l(!0);return E(()=>{const c=_,i=n;p(r.current,c,i,a,u)},[e.id]),t.createElement("div",{ref:r,className:"grid__tile"},s?"REVEALED":null,e.id)}function R({tiles:e}){return t.createElement("div",{className:"grid"},t.createElement("img",{style:{display:"none"},src:n}),t.createElement("img",{style:{display:"none"},src:_}),e.map((r,s)=>t.createElement(f,{key:s,tile:r})))}function d({tiles:e}){return t.createElement(R,{tiles:e})}export default d;
