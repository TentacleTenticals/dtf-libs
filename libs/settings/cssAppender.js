// ==UserScript==
// @name        DTF css appender
// @namespace   https://github.com/TentacleTenticals/dtf-libs
// @match       https://dtf.ru/*
// @grant       none
// @version     1.0
// @author      Tentacle Tenticals
// @description Класс для добавления CSS
// @homepage    https://github.com/TentacleTenticals/dtf-libs
// @license MIT
// ==/UserScript==
/* jshint esversion:8 */

class CssAppend{
  constructor(title, css){
    this.css=document.createElement('style');
    this.css.title=title;
    this.css.textContent=css;
    document.body.appendChild(this.css);
  }
}
