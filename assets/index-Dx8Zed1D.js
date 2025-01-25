(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=i(n);fetch(n.href,r)}})();const p={items:".sortable__item",handle:".sortable__handle",duration:150,cacheDuration:750};function c(t,e,i,s=""){const n=parseInt(getComputedStyle(t.parentElement).gap),r=e.height+n,a=[{transform:`translateY(${s}${r}px)`},{transform:"translateY(0)"}];t.animate(a,{duration:i,easing:"ease"})}function o(...t){c(...t)}function d(...t){c(...t,"-")}function u(t){const e=t.querySelector(this.settings.handle);e&&(t.setAttribute("draggable","false"),e.addEventListener("mousedown",()=>{t.setAttribute("draggable","true")}),e.addEventListener("mouseup",()=>{t.setAttribute("draggable","false")}),e.addEventListener("focus",()=>{t.setAttribute("draggable","true")}),e.addEventListener("blur",()=>{t.setAttribute("draggable","false")}),e.addEventListener("keydown",i=>{let s=null;switch(i.key){case"ArrowUp":if(s=t.previousElementSibling,s){const n=t.getBoundingClientRect(),r=s.getBoundingClientRect();s.before(t),o(t,r,this.settings.duration),d(s,n,this.settings.duration),e.focus(),this.maybeUpdate(!0)}return;case"ArrowDown":if(s=t.nextElementSibling,s){const n=t.getBoundingClientRect(),r=s.getBoundingClientRect();s.after(t),o(s,n,this.settings.duration),d(t,r,this.settings.duration),e.focus(),this.maybeUpdate(!0)}return;default:return}}))}function h(t){t.addEventListener("dragstart",()=>{this.list.classList.add("event-dragging"),t.classList.add("is-dragging"),this.dragging=t}),t.addEventListener("dragend",()=>{this.list.classList.remove("event-dragging"),t.classList.remove("is-dragging"),t.setAttribute("draggable","false"),this.dragging.querySelector(this.settings.handle).focus(),this.dragging=null,this.maybeUpdate()}),t.addEventListener("dragenter",()=>{if(t===this.dragging||t.getAnimations().length)return;const e=this.dragging.getBoundingClientRect(),i=t.getBoundingClientRect();this.dragging.getBoundingClientRect().top>t.getBoundingClientRect().top+t.getBoundingClientRect().height/2?(t.before(this.dragging),o(this.dragging,i,this.settings.duration),d(t,e,this.settings.duration)):(t.after(this.dragging),o(t,e,this.settings.duration),d(this.dragging,i,this.settings.duration)),this.hasUpdated=!0}),t.addEventListener("dragover",e=>{e.preventDefault()}),t.addEventListener("drop",e=>{e.preventDefault()})}function m(t){this.cacheItem=t,setTimeout(()=>{this.cacheItem=null},this.settings.cacheDuration)}function l(t,e){return t.clientX>e.left&&t.clientX<e.right&&t.clientY>e.top&&t.clientY<e.bottom}function f(t){const e=t.querySelector(this.settings.handle);e.addEventListener("touchstart",()=>{this.list.classList.add("event-touching"),t.classList.add("is-touching"),this.dragging=t}),e.addEventListener("touchmove",i=>{i.preventDefault();const s=this.list.getBoundingClientRect();if(l(i.changedTouches[0],s)){const n=[...this.items].find(g=>g!=this.dragging&&!g.getAnimations().length&&l(i.changedTouches[0],g.getBoundingClientRect()));if(!n||n===this.cacheItem)return;const r=this.dragging.getBoundingClientRect(),a=n.getBoundingClientRect();this.dragging.getBoundingClientRect().top>n.getBoundingClientRect().top+n.getBoundingClientRect().height/2?(n.before(this.dragging),o(this.dragging,a,this.settings.duration),d(n,r,this.settings.duration)):(n.after(this.dragging),o(n,r,this.settings.duration),d(this.dragging,a,this.settings.duration)),m.call(this,n),this.hasUpdated=!0}}),e.addEventListener("touchend",()=>{this.list.classList.remove("event-touching"),t.classList.remove("is-touching"),this.dragging.querySelector(this.settings.handle).focus(),this.dragging=null,this.maybeUpdate()}),e.addEventListener("touchcancel",()=>{this.list.classList.remove("event-touching"),t.classList.remove("is-touching"),this.dragging.querySelector(this.settings.handle).focus(),this.dragging=null,this.maybeUpdate()})}function v(t,e=0){typeof t.timeoutID=="number"&&clearTimeout(t.timeoutID),t.timeoutID=setTimeout(()=>{const i=Array.from(t.list.querySelectorAll(t.settings.items));let s=[];for(let n=0;n<t.items.length;n++)i.findIndex(a=>a==t.items[n])<0&&s.push(n);s.reverse().forEach(n=>{t.items.splice(n,1)}),i.forEach(n=>{t.items.findIndex(a=>a==n)<0&&(t.items.push(n),u.call(t,n),h.call(t,n),f.call(t,n))})},e)}function b(t){const e={...t};return e.id=e.list.id,e.items=Array.from(e.list.querySelectorAll(e.settings.items)),e.dragging=null,e.cacheItem=null,e.hasUpdated=!1,e.maybeUpdate=(i=!1)=>{(e.hasUpdated||i)&&(e.hasUpdated=!1,e.items.sort((s,n)=>s===n?0:s.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_PRECEDING?1:-1),e.onUpdated.call(e,e))},e.items.forEach(i=>{u.call(e,i),h.call(e,i),f.call(e,i)}),e.refresh=()=>v(e),e}function E(t,e){e={...p,...e};const i=document.getElementById(t);if(i){const{onUpdate:s,...n}=e;return b({list:i,onUpdated:s,settings:n})}else throw new Error(`Sortable could not find list with ID of "${t}"`)}const L=E("sortable-list",{onUpdate(t){console.log("onUpdate >",t)}});console.log(L);
