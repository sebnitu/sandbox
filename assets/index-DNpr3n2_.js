import"https://unpkg.com/feather-icons";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();const c=document.querySelector(".sortable"),f=c.querySelectorAll(".sortable__item"),y=150;let o=null,i=!1;f.forEach(e=>{e.addEventListener("click",()=>{e.classList.contains("is-clicked")||(e.classList.add("is-clicked"),setTimeout(()=>{e.classList.remove("is-clicked")},1e3))});const t=e.querySelector(".sortable__handle");t&&(e.setAttribute("draggable","false"),t.addEventListener("mousedown",()=>{e.setAttribute("draggable","true")}),t.addEventListener("mouseup",()=>{e.setAttribute("draggable","false")}),t.addEventListener("focus",()=>{e.setAttribute("draggable","true")}),t.addEventListener("blur",()=>{e.setAttribute("draggable","false")})),e.addEventListener("dragstart",()=>{c.classList.add("event-dragging"),e.classList.add("is-dragging"),o=e}),e.addEventListener("dragend",()=>{c.classList.remove("event-dragging"),e.classList.remove("is-dragging"),o=null,i&&(console.log("Save order"),t&&e.setAttribute("draggable","false"),i=!1)}),e.addEventListener("dragenter",()=>{if(e===o||e.getAnimations().length)return;const s=o.getBoundingClientRect(),a=e.getBoundingClientRect();o.getBoundingClientRect().top>e.getBoundingClientRect().top+e.getBoundingClientRect().height/2?(e.before(o),d(o,s,a),g(e,a,s)):(e.after(o),d(e,a,s),g(o,s,a)),i=!0}),e.addEventListener("dragover",s=>{s.preventDefault()}),e.addEventListener("drop",s=>{s.preventDefault(),console.log("Save order"),t&&e.setAttribute("draggable","false"),i=!1}),t.addEventListener("touchstart",()=>{console.log("touchstart"),c.classList.add("event-dragging"),e.classList.add("is-dragging"),o=e}),t.addEventListener("touchmove",s=>{s.preventDefault(),E(s.changedTouches[0]);const a=c.getBoundingClientRect();if(p(s.changedTouches[0],a)){const n=[...f].find(u=>p(s.changedTouches[0],u.getBoundingClientRect()));if(!n)return;const r=o.getBoundingClientRect(),l=n.getBoundingClientRect();o.getBoundingClientRect().top>n.getBoundingClientRect().top+n.getBoundingClientRect().height/2?(n.before(o),d(o,r,l),g(n,l,r)):(n.after(o),d(n,l,r),g(o,r,l)),i=!0}}),t.addEventListener("touchend",s=>{console.log("touchend"),c.classList.remove("event-dragging"),e.classList.remove("is-dragging"),o=null,i&&(console.log("Save order"),e.setAttribute("draggable","false"),i=!1)}),t.addEventListener("touchcancel",s=>{console.log("touchcancel",s),c.classList.remove("event-dragging"),e.classList.remove("is-dragging"),o=null,i&&(console.log("Save order"),e.setAttribute("draggable","false"),i=!1)})});function p(e,t){return e.clientX>t.left&&e.clientX<t.right&&e.clientY>t.top&&e.clientY<t.bottom}function d(...e){L(...e)}function g(...e){L(...e,"-")}function L(e,t,s,a=""){const n=e.offsetWidth+parseInt(getComputedStyle(e.parentElement).gap),r=e.offsetHeight+parseInt(getComputedStyle(e.parentElement).gap);let l=h(t.left-s.left,n),u=h(t.top-s.top,r);const b=[{transform:`translate3D(${a}${l}px, ${a}${u}px, 0)`},{transform:"translate3d(0, 0, 0)"}];e.animate(b,{duration:y,easing:"ease"})}function h(e,t){return e=Math.abs(e),e>t?t:e}const v=document.querySelector(".crosshair");function E(e){v.style.top=e.clientY+"px",v.style.left=e.clientX+"px"}feather.replace();