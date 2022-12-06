// ==UserScript==
// @name        DTF page load detector
// @namespace   https://github.com/TentacleTenticals/dtf-libs
// @match       https://dtf.ru/*
// @grant       none
// @version     1.0
// @author      Tentacle Tenticals
// @description Детектор полной загрузки страницы DTF. Используется для запуска функций
// @homepage https://github.com/TentacleTenticals/dtf-libs
// @license MIT
// ==/UserScript==
/* jshint esversion:8 */

function onPageLoad(run){
  {
  const log = console.log.bind(console)
  console.log = (...args) => {
    if(Array.isArray(args)){
      if(args[0]){
        if(typeof args[0] === 'string'){
          if(args[0].match(/\[ Air \] Ready.*/)){
            run();
          }
        }
      }
    }
    log(...args);
  }}
}
