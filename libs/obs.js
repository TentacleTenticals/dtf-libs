// ==UserScript==
// @name        DTF observer
// @namespace   https://github.com/TentacleTenticals/dtf-libs
// @match       https://dtf.ru/*
// @grant       none
// @version     1.0
// @author      Tentacle Tenticals
// @description Обсервер DTF
// @homepage https://github.com/TentacleTenticals/dtf-libs
// @license MIT
// ==/UserScript==
/* jshint esversion:8 */

let obs;
function observer({target, search, msg, func}){
  if(!target) return;
  let o;
  const callback = (mutationList, o) => {
    for(const mutation of mutationList){
      if(mutation.type === 'childList'){
        if(!mutation.target.classList > 0) return;
        if(!mutation.target.classList.value.match(search)) return;
          for(let i = 0, arr = mutation.addedNodes; i < arr.length; i++){
            func(arr[i]);
          }
      }
    }
  };
  o = new MutationObserver(callback);
  o.observe(target, {attributes: true, childList: true, subtree: true});
  console.log(msg);
  return o;
}
