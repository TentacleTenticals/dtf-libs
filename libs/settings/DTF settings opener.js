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

let style = `
.DTF-settingsOpener {
  top: 19px;
  right: 257px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-wrap: nowrap;
  z-index: 1000;
  color: rgb(0 0 0);
  padding: 2px 2px 2px 2px;
  line-height: unset;
  font-size: 19px;
  background: rgb(255 255 255);
  box-shadow: 0px 0px 2px 1px rgb(0 0 0);
}
.DTF-settingsOpener .label {
  display: none;
  position: absolute;
  float: left;
  font-size: 12px;
  text-align: center;
  top: 5px;
  left: 5px;
}
.DTF-settingsOpener:hover .label {
  display: block;
}
.DTF-settingsOpener .list {
  display: none;
  background: rgb(255,255,255);
  color: rbg(0,0,0);
}
.DTF-settingsOpener:hover .list,
.DTF-settingsOpener .list:hover {
  display: block;
  background: rgb(255,255,255);
  margin-top: 3px;
  padding: 1px 3px 3px 3px;
  box-shadow: 0px 0px 2px 1px rgb(0 0 0);
}
.DTF-settingsOpener .list .btn {
  background: rgb(216 234 249);
  font-size: 13px;
  border: 1px solid rgb(0 0 0);
  border-radius: 3px;
  padding: 1px 3px 1px 3px;
  cursor: pointer;
}
.DTF-settingsOpener .list .btn:hover {
  background: rgb(203 232 255);
}

.DTF-settings {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 115;
  background: rgb(255 255 255);
  padding: 3px;
  max-width: 50%;
}
.DTF-settings fieldset {
  border: 1px solid black;
  margin: 5px 0px 5px 0px;
  padding: 3px;
}`;

new CssAppend('DTF-settingsOpener', style);

class SettingsOpener{
  constructor(path){
    if(document.getElementById('DTF-settingsOpener')) return;
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
    this.main.appendChild(this.list);
  }
}
