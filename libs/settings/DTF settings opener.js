// ==UserScript==
// @name        DTF settings opener
// @namespace   https://github.com/TentacleTenticals
// @match       https://dtf.ru/*
// @grant       none
// @version     1.0
// @author      Tentacle Tenticals
// @description Открывает настройки DTF скриптов
// @homepage    https://github.com/TentacleTenticals/
// @license MIT
// ==/UserScript==
/* jshint esversion:8 */

new CssAppend('DTF-settingsOpener', `
.DTF-settingsOpener:hover .list {
  display: block;
}`)

class SettingsOpener{
  constructor(path){
    this.main=document.createElement('div');
    this.main.className='DTF-settingsOpener';
    this.main.id='DTF-settingsOpener';
    path.appendChild(this.main);
    
    this.header=document.createElement('div');
    this.header.className='header';
    this.header.textContent='🛠️';
    this.main.appendChild(this.header);
    
    this.list=document.createElement('div');
    this.list.className='list';
    this.list.style=`
      display: none;`;
    this.main.appendChild(this.list);
  }
}
