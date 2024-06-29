import"https://unpkg.com/feather-icons";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const d=document.querySelector(".sortable"),v=document.querySelectorAll(".sortable__item"),L=150;let o=null,l=!1;v.forEach(e=>{const n=e.querySelector(".sortable__handle");n&&(e.setAttribute("draggable","false"),n.addEventListener("mousedown",()=>{e.setAttribute("draggable","true")}),n.addEventListener("mouseup",()=>{e.setAttribute("draggable","false")})),e.addEventListener("click",()=>{e.classList.contains("is-clicked")||(e.classList.add("is-clicked"),setTimeout(()=>{e.classList.remove("is-clicked")},1e3))}),e.addEventListener("dragstart",()=>{d.classList.add("event-dragging"),e.classList.add("is-dragging"),o=e}),e.addEventListener("dragend",()=>{d.classList.remove("event-dragging"),e.classList.remove("is-dragging"),o=null,l&&(console.log("Save order"),n&&e.setAttribute("draggable","false"),l=!1)}),e.addEventListener("dragenter",()=>{if(e===o||e.getAnimations().length)return;const t=o.getBoundingClientRect(),a=e.getBoundingClientRect();o.getBoundingClientRect().top>e.getBoundingClientRect().top+e.getBoundingClientRect().height/2?(e.before(o),c(o,t,a),g(e,a,t)):(e.after(o),c(e,a,t),g(o,t,a)),l=!0}),e.addEventListener("dragover",t=>{t.preventDefault()}),e.addEventListener("drop",t=>{t.preventDefault(),console.log("Save order"),n&&e.setAttribute("draggable","false"),l=!1}),n.addEventListener("touchstart",t=>{console.log("touchstart",t,t.clientX,t.clientY),e.setAttribute("draggable","true"),d.classList.add("event-dragging"),e.classList.add("is-dragging"),o=e}),n.addEventListener("touchend",t=>{console.log("touchend",t,t.clientX,t.clientY),e.setAttribute("draggable","false"),d.classList.remove("event-dragging"),e.classList.remove("is-dragging"),o=null,l&&(console.log("Save order"),l=!1)}),n.addEventListener("touchmove",t=>{t.preventDefault(),console.log("touchmove")}),n.addEventListener("touchcancel",()=>{console.log("touchcancel")})});function c(...e){f(...e)}function g(...e){f(...e,"-")}function f(e,n,t,a=""){const r=e.offsetWidth+parseInt(getComputedStyle(e.parentElement).gap),s=e.offsetHeight+parseInt(getComputedStyle(e.parentElement).gap);let i=u(Math.abs(n.left-t.left),r),p=u(Math.abs(n.top-t.top),s);const h=[{transform:`translate3D(${a}${i}px, ${a}${p}px, 0)`},{transform:"translate3d(0, 0, 0)"}];e.animate(h,{duration:L,easing:"ease"})}function u(e,n){return e>n?n:e}feather.replace();
