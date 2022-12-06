// ==UserScript==
// @name        DTF header
// @namespace   https://github.com/TentacleTenticals
// @match       https://dtf.ru/*
// @grant       none
// @version     1.0
// @author      Tentacle Tenticals
// @description Хеадер статей DTF. Используется для добавления новых кнопок
// @homepage https://github.com/TentacleTenticals/
// @license MIT
// ==/UserScript==
/* jshint esversion:8 */

class DtfHeader{
  constructor(path, where){
    if(document.getElementById('Dtf-header')) return;
    this.main=document.createElement('div');
    this.main.className='Dtf-header';
    this.main.id='Dtf-header';
    this.main.style=`
    display: flex;
    width: 100%;
    background-color: rgb(0 0 0);
    `;
    path.parentNode.insertBefore(this.main, where);
  }
}
