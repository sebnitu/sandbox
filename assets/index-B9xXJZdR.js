var R=t=>{throw TypeError(t)};var D=(t,n,s)=>n.has(t)||R("Cannot "+s);var d=(t,n,s)=>(D(t,n,"read from private field"),s?s.call(t):n.get(t)),m=(t,n,s)=>n.has(t)?R("Cannot add the same private member more than once"):n instanceof WeakSet?n.add(t):n.set(t,s),f=(t,n,s,e)=>(D(t,n,"write to private field"),e?e.call(t,s):n.set(t,s),s);(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))e(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&e(r)}).observe(document,{childList:!0,subtree:!0});function s(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function e(i){if(i.ep)return;i.ep=!0;const a=s(i);fetch(i.href,a)}})();const p=document.querySelector(".todo-list"),F=p.querySelectorAll(".todo"),j=150,K=750;let l=null,I=null,h=!1;F.forEach(t=>{const n=t.querySelector(".todo__handle");n&&(t.setAttribute("draggable","false"),n.addEventListener("mousedown",()=>{t.setAttribute("draggable","true")}),n.addEventListener("mouseup",()=>{t.setAttribute("draggable","false")}),n.addEventListener("focus",()=>{t.setAttribute("draggable","true")}),n.addEventListener("blur",()=>{t.setAttribute("draggable","false")})),n.addEventListener("keydown",s=>{let e=null;switch(s.key){case"ArrowUp":if(e=t.previousElementSibling,e){const i=t.getBoundingClientRect(),a=e.getBoundingClientRect();e.before(t),E(t,a),L(e,i),n.focus()}return;case"ArrowDown":if(e=t.nextElementSibling,e){const i=t.getBoundingClientRect(),a=e.getBoundingClientRect();e.after(t),E(e,i),L(t,a),n.focus()}return;default:return}}),t.addEventListener("dragstart",()=>{p.classList.add("event-dragging"),t.classList.add("is-dragging"),l=t}),t.addEventListener("dragend",()=>{const s=l.querySelector(".todo__handle");p.classList.remove("event-dragging"),t.classList.remove("is-dragging"),l=null,h&&(console.log("Save order"),s&&s.focus(),n&&t.setAttribute("draggable","false"),h=!1)}),t.addEventListener("dragenter",()=>{if(t===l||t.getAnimations().length)return;const s=l.getBoundingClientRect(),e=t.getBoundingClientRect();l.getBoundingClientRect().top>t.getBoundingClientRect().top+t.getBoundingClientRect().height/2?(t.before(l),E(l,e),L(t,s)):(t.after(l),E(t,s),L(l,e)),h=!0}),t.addEventListener("dragover",s=>{s.preventDefault()}),t.addEventListener("drop",s=>{s.preventDefault();const e=l.querySelector(".todo__handle");console.log("Save order"),e&&e.focus(),n&&t.setAttribute("draggable","false"),h=!1}),n.addEventListener("touchstart",()=>{console.log("touchstart"),p.classList.add("event-touching"),t.classList.add("is-touching"),l=t}),n.addEventListener("touchmove",s=>{s.preventDefault();const e=p.getBoundingClientRect();if(P(s.changedTouches[0],e)){const i=[...F].find(w=>w!=l&&!w.getAnimations().length&&P(s.changedTouches[0],w.getBoundingClientRect()));if(!i||i===I)return;const a=l.getBoundingClientRect(),r=i.getBoundingClientRect();l.getBoundingClientRect().top>i.getBoundingClientRect().top+i.getBoundingClientRect().height/2?(i.before(l),E(l,r),L(i,a)):(i.after(l),E(i,a),L(l,r)),H(i),h=!0}}),n.addEventListener("touchend",s=>{console.log("touchend");const e=l.querySelector(".todo__handle");p.classList.remove("event-touching"),t.classList.remove("is-touching"),l=null,h&&(console.log("Save order"),e&&e.focus(),h=!1)}),n.addEventListener("touchcancel",s=>{console.log("touchcancel",s);const e=l.querySelector(".todo__handle");p.classList.remove("event-touching"),t.classList.remove("is-touching"),l=null,h&&(console.log("Save order"),e&&e.focus(),h=!1)})});function H(t){I=t,setTimeout(()=>{I=null},K)}function P(t,n){return t.clientX>n.left&&t.clientX<n.right&&t.clientY>n.top&&t.clientY<n.bottom}function E(...t){M(...t)}function L(...t){M(...t,"-")}function M(t,n,s=""){const e=parseInt(getComputedStyle(t.parentElement).gap),i=n.height+e,a=[{transform:`translateY(${s}${i}px)`},{transform:"translateY(0)"}];t.animate(a,{duration:j,easing:"ease"})}var u;class Y{constructor(n,s){m(this,u);this.value=n,f(this,u,s),this.mql=null}get handler(){return d(this,u)}set handler(n){this.mql&&this.mql.removeEventListener("change",d(this,u)),f(this,u,n)}mount(n,s){return n&&(this.value=n),s&&f(this,u,s),this.value?(this.mql=window.matchMedia(`(min-width: ${this.value})`),this.mql.addEventListener("change",d(this,u)),d(this,u).call(this,this.mql),this):this}unmount(){return this.mql?(this.mql.removeEventListener("change",d(this,u)),this.value=null,f(this,u,null),this.mql=null,this):this}}u=new WeakMap;class J{constructor(){this.collection=[]}async register(n){return await this.deregister(n),this.collection.push(n),this.collection}async deregister(n){const s=this.collection.findIndex(e=>e===n);if(s>=0){const e=this.collection[s];Object.getOwnPropertyNames(e).forEach(i=>{delete e[i]}),this.collection.splice(s,1)}return this.collection}async registerCollection(n){return await Promise.all(Array.from(n,s=>{this.register(s)})),this.collection}async deregisterCollection(){for(;this.collection.length>0;)await this.deregister(this.collection[0]);return this.collection}get(n,s="id"){return this.collection.find(e=>e[s]===n)}}const o={inert:":not([inert]):not([inert] *)",negTabIndex:':not([tabindex^="-"])',disabled:":not(:disabled)"},U=[`a[href]${o.inert}${o.negTabIndex}`,`area[href]${o.inert}${o.negTabIndex}`,`input:not([type="hidden"]):not([type="radio"])${o.inert}${o.negTabIndex}${o.disabled}`,`input[type="radio"]${o.inert}${o.negTabIndex}${o.disabled}`,`select${o.inert}${o.negTabIndex}${o.disabled}`,`textarea${o.inert}${o.negTabIndex}${o.disabled}`,`button${o.inert}${o.negTabIndex}${o.disabled}`,`details${o.inert} > summary:first-of-type${o.negTabIndex}`,`iframe${o.inert}${o.negTabIndex}`,`audio[controls]${o.inert}${o.negTabIndex}`,`video[controls]${o.inert}${o.negTabIndex}`,`[contenteditable]${o.inert}${o.negTabIndex}`,`[tabindex]${o.inert}${o.negTabIndex}`];var $,b,v;class X{constructor(n=null,s="[data-focus]"){m(this,$);m(this,b);m(this,v);this.el=n,this.selectorFocus=s,f(this,b,G.bind(this)),f(this,v,z.bind(this))}get focusable(){return d(this,$)}set focusable(n){f(this,$,n),d(this,$).length?(document.removeEventListener("keydown",d(this,v)),document.addEventListener("keydown",d(this,b))):(document.removeEventListener("keydown",d(this,b)),document.addEventListener("keydown",d(this,v)))}get focusableFirst(){return this.focusable[0]}get focusableLast(){return this.focusable[this.focusable.length-1]}mount(n,s){n&&(this.el=n),s&&(this.selectorFocus=s),this.focusable=this.getFocusable(),this.focus()}unmount(){this.el=null,this.focusable=[],document.removeEventListener("keydown",d(this,b)),document.removeEventListener("keydown",d(this,v))}focus(n=this.el,s=this.selectorFocus){(n.querySelector(s)||n).focus()}getFocusable(n=this.el){const s=[],e=document.activeElement,i=n.scrollTop;return n.querySelectorAll(U.join(",")).forEach(r=>{r.focus(),document.activeElement===r&&s.push(r)}),n.scrollTop=i,e.focus(),s}}$=new WeakMap,b=new WeakMap,v=new WeakMap;function G(t){(t.key==="Tab"||t.keyCode===9)&&(t.shiftKey?(document.activeElement===this.focusableFirst||document.activeElement===this.el)&&(t.preventDefault(),this.focusableLast.focus()):(document.activeElement===this.focusableLast||document.activeElement===this.el)&&(t.preventDefault(),this.focusableFirst.focus()))}function z(t){(t.key==="Tab"||t.keyCode===9)&&t.preventDefault()}function _(){return getComputedStyle(document.body).getPropertyValue("--vb-prefix").trim()}function Q(t,n=document.body){if(t.slice(0,2)!=="--"){const e=_();e&&(t=`${e}${t}`),t=`--${t}`}const s=getComputedStyle(n).getPropertyValue(t).trim();if(s)return s;throw new Error(`CSS variable "${t}" was not found!`)}function W(t,n){const e=(t.getAttribute(`data-${n}`)||"").replace(/'/g,'"');return e?JSON.parse(e):{}}function Z(t,n=!0){const s=localStorage.getItem(t),e=s?JSON.parse(s):{};return{get(i){return i?e[i]:e},set(i,a){return a?e[i]=a:delete e[i],n&&localStorage.setItem(t,JSON.stringify(e)),e}}}function q(t,n,s,e="transition-duration"){return new Promise(i=>{if(typeof e=="string"){const a=Q(e,t),r=!!a.includes("ms");e=parseFloat(a)*(r?1:1e3)}t.classList.remove(n.finish),t.classList.add(s.start),setTimeout(()=>{t.classList.add(s.finish),t.classList.remove(s.start),i(t)},e)})}function tt(t,n){n&&document.querySelectorAll(n).forEach(e=>{t?e.style.overflow="hidden":e.style.removeProperty("overflow")})}function et(t,n){n&&document.querySelectorAll(n).forEach(e=>{t?(e.inert=!0,e.setAttribute("aria-hidden",!0)):(e.inert=null,e.removeAttribute("aria-hidden"))})}function A(t,n){et(!!t,n.selectorInert),tt(!!t,n.selectorOverflow)}const st={autoMount:!1,dataOpen:"drawer-open",dataClose:"drawer-close",dataToggle:"drawer-toggle",dataBreakpoint:"drawer-breakpoint",dataConfig:"drawer-config",selectorDrawer:".drawer",selectorDialog:".drawer__dialog",selectorScreen:".drawer",selectorFocus:"[data-focus]",selectorInert:null,selectorOverflow:"body",stateOpened:"is-opened",stateOpening:"is-opening",stateClosing:"is-closing",stateClosed:"is-closed",classModal:"drawer_modal",breakpoints:null,customEventPrefix:"drawer:",eventListeners:!0,store:!0,storeKey:"VB:DrawerState",setTabindex:!0,transition:!0,transitionDuration:"drawer-transition-duration"};function nt(t){t.store==="opened"?t.open(!1,!1):t.store==="closed"?t.close(!1,!1):t.store==="indeterminate"?t.state="indeterminate":t.el.classList.contains(t.getSetting("stateOpened"))?t.open(!1,!1):t.el.classList.contains(t.getSetting("stateClosed"))?t.close(!1,!1):t.state="indeterminate"}async function it(t){t.store==="opened"?await t.open(!1,!1):t.store==="closed"?await t.close(!1,!1):t.store==="indeterminate"?t.state!="indeterminate"&&(t.state="indeterminate"):(t.state!=t.inlineState&&(t.state=t.inlineState),t.inlineState==="opened"?await t.open(!1,!1):t.inlineState==="closed"&&await t.close(!1,!1))}function ot(t){const n=_(),s=t.getAttribute(`data-${this.settings.dataBreakpoint}`);return this.settings.breakpoints&&this.settings.breakpoints[s]?this.settings.breakpoints[s]:getComputedStyle(document.body).getPropertyValue(`--${n}breakpoint-${s}`).trim()?getComputedStyle(document.body).getPropertyValue(`--${n}breakpoint-${s}`).trim():s}function S(t){const n=typeof t=="string"?this.get(t):this.get(t.id);if(n)return n;throw new Error(`Drawer not found in collection with id of "${t.id||t}".`)}function V(t){t.state==="opened"?t.mode==="modal"?this.focusTrap.mount(t.dialog,this.settings.selectorFocus):this.focusTrap.focus(t.dialog,this.settings.selectorFocus):(t.trigger&&(t.trigger.focus(),t.trigger=null),this.focusTrap.unmount())}async function at(t){const n=t.target.closest(`
    [data-${this.settings.dataOpen}],
    [data-${this.settings.dataToggle}],
    [data-${this.settings.dataClose}]
  `);if(n){t.preventDefault(),n.matches(`[data-${this.settings.dataToggle}]`)&&n.getAttribute(`data-${this.settings.dataToggle}`).trim().split(" ").forEach(e=>{const i=S.call(this,e);return i.trigger=n,i.toggle()}),n.matches(`[data-${this.settings.dataOpen}]`)&&n.getAttribute(`data-${this.settings.dataOpen}`).trim().split(" ").forEach(e=>{const i=S.call(this,e);return i.trigger=n,i.open()}),n.matches(`[data-${this.settings.dataClose}]`)&&n.getAttribute(`data-${this.settings.dataClose}`).trim().split(" ").forEach(e=>{if(e){const i=S.call(this,e);return i.trigger=n,i.close()}else{const i=t.target.closest(this.settings.selectorDrawer);if(i)return this.close(i)}});return}if(this.activeModal&&t.target.matches(this.settings.selectorScreen))return this.close(this.activeModal.id)}function rt(t){if(t.key==="Escape"&&this.activeModal)return this.close(this.activeModal)}async function O(t,n=!0){const s=this.collection.findIndex(e=>e.id===t.id);if(s>=0){const e=this.collection[s];n&&e.state==="opened"&&await e.close(!1),this.store.set(e.id),e.unmountBreakpoint(),Object.getOwnPropertyNames(e).forEach(i=>{delete e[i]}),this.collection.splice(s,1)}return this.collection}async function B(t,n,s=!0){const e=S.call(this,t),i={...this.settings,...e.settings};return n!==void 0&&(i.transition=n),(e.state==="closed"||e.state==="indeterminate")&&(e.state="opening",i.transition?await q(e.el,{start:i.stateClosing,finish:i.stateClosed},{start:i.stateOpening,finish:i.stateOpened},i.transitionDuration):(e.el.classList.add(i.stateOpened),e.el.classList.remove(i.stateClosed)),e.state="opened",e.mode==="modal"&&A(!0,i),s&&V.call(this,e),e.el.dispatchEvent(new CustomEvent(i.customEventPrefix+"opened",{detail:this,bubbles:!0}))),e}async function x(t,n,s=!0){const e=S.call(this,t),i={...this.settings,...e.settings};return n!==void 0&&(i.transition=n),(e.state==="opened"||e.state==="indeterminate")&&(e.state="closing",document.activeElement.blur(),i.transition?await q(e.el,{start:i.stateOpening,finish:i.stateOpened},{start:i.stateClosing,finish:i.stateClosed},i.transitionDuration):(e.el.classList.add(i.stateClosed),e.el.classList.remove(i.stateOpened)),e.state="closed",e.mode==="modal"&&A(!1,i),s&&V.call(this,e),e.el.dispatchEvent(new CustomEvent(i.customEventPrefix+"closed",{detail:this,bubbles:!0}))),e}async function N(t,n,s){const e=S.call(this,t);return e.state==="closed"?B.call(this,e,n,s):x.call(this,e,n,s)}function lt(t){switch(t.mode){case"inline":return ct.call(this,t);case"modal":return dt.call(this,t);default:throw new Error(`"${t.mode}" is not a valid drawer mode.`)}}async function ct(t){return t.el.classList.remove(t.getSetting("classModal")),t.dialog.removeAttribute("aria-modal"),A(!1,{...this.settings,...t.settings}),this.focusTrap.unmount(),await it(t),t.el.dispatchEvent(new CustomEvent(t.getSetting("customEventPrefix")+"switchMode",{detail:this,bubbles:!0})),t}async function dt(t){return t.el.classList.add(t.getSetting("classModal")),t.dialog.setAttribute("aria-modal","true"),await x.call(this,t,!1,!1),t.el.dispatchEvent(new CustomEvent(t.getSetting("customEventPrefix")+"switchMode",{detail:this,bubbles:!0})),t}async function ut(t,n={}){await O.call(this,t,!1);const s=this,e=new Y;let i,a="indeterminate";const r={id:t.id,el:t,dialog:null,trigger:null,settings:{...W(t,this.settings.dataConfig),...n},inlineState:"indeterminate",get breakpoint(){return ot.call(s,t)},get store(){return s.store.get(this.id)},get mode(){return i},set mode(c){i=c,lt.call(s,this)},get state(){return a},set state(c){a=c,this.mode==="inline"&&c!="opening"&&c!="closing"&&(this.inlineState=c,this.getSetting("store")&&s.store.set(this.id,c)),c==="indeterminate"&&(this.el.classList.remove(this.getSetting("stateOpened")),this.el.classList.remove(this.getSetting("stateOpening")),this.el.classList.remove(this.getSetting("stateClosed")),this.el.classList.remove(this.getSetting("stateClosing")))},open(c,g){return B.call(s,this,c,g)},close(c,g){return x.call(s,this,c,g)},toggle(c,g){return N.call(s,this,c,g)},deregister(){return O.call(s,this)},mountBreakpoint(){const c=this.breakpoint,g=this.handleBreakpoint.bind(this);return e.mount(c,g),this},unmountBreakpoint(){return e.unmount(),this},handleBreakpoint(c){const g=c.matches?"inline":"modal";return this.mode!=g&&(this.mode=g),this},getSetting(c){return c in this.settings?this.settings[c]:s.settings[c]}};this.collection.push(r);const w=t.querySelector(r.getSetting("selectorDialog"));return r.dialog=w||t,r.getSetting("setTabindex")&&r.dialog.setAttribute("tabindex","-1"),await nt(r),r.inlineState=r.state,r.mode=t.classList.contains(r.getSetting("classModal"))?"modal":"inline",r.breakpoint&&r.mountBreakpoint(),r}var C,T;class gt extends J{constructor(s){super();m(this,C);m(this,T);this.defaults=st,this.settings={...this.defaults,...s},this.focusTrap=new X,this.store=Z(this.settings.storeKey,this.settings.store),f(this,C,at.bind(this)),f(this,T,rt.bind(this)),this.settings.autoMount&&this.mount()}get activeModal(){return this.collection.find(s=>s.state==="opened"&&s.mode==="modal")}async mount(s=null){s&&(this.settings={...this.settings,...s});const e=document.querySelectorAll(this.settings.selectorDrawer);return await this.registerCollection(e),this.settings.eventListeners&&this.mountEventListeners(),this}async unmount(){return await this.deregisterCollection(),this.settings.eventListeners&&this.unmountEventListeners(),this}mountEventListeners(){document.addEventListener("click",d(this,C),!1),document.addEventListener("keydown",d(this,T),!1)}unmountEventListeners(){document.removeEventListener("click",d(this,C),!1),document.removeEventListener("keydown",d(this,T),!1)}register(s,e={}){let i=typeof s=="string"?document.getElementById(s):s;return i?ut.call(this,i,e):Promise.reject(new Error(`Failed to register; drawer not found with ID of: "${s.id||s}".`))}deregister(s){let e=this.get(s.id||s);return e?O.call(this,e):Promise.reject(new Error(`Failed to deregister; drawer does not exist in collection with ID of: "${s.id||s}".`))}open(s,e,i){return B.call(this,s,e,i)}close(s,e,i){return x.call(this,s,e,i)}toggle(s,e,i){return N.call(this,s,e,i)}}C=new WeakMap,T=new WeakMap;const k=new gt({autoMount:!0});k.mount().then(()=>k.register("aside-drawer",{classModal:"aside_modal",store:!1})).then(()=>{window.drawer=k});const y=document.querySelector(".layout__content");y.addEventListener("click",t=>{t.target===y&&y.focus()});
