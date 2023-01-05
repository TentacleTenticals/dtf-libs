// ==UserScript==
// @name        DTF settings classes
// @namespace   https://github.com/TentacleTenticals/dtf-libs
// @match       https://dtf.ru/*
// @grant       none
// @version     1.0
// @author      Tentacle Tenticals
// @description Классы настроек DTF скриптов. Используются для меню настроек
// @homepage https://github.com/TentacleTenticals/dtf-libs
// @license MIT
// ==/UserScript==
/* jshint esversion:8 */

let style = `
.DTF-settingsOpener {
  top: 19px;
  right: 257px;
  position: fixed;
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
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 115;
  background: rgb(255 255 255);
  padding: 3px;
  max-width: 50%;
  box-shadow: 0px 0px 2px 1px rgb(0 0 0);
}
.DTF-settings input {
  width: max-content;
}
.DTF-settings fieldset {
  border: 1px solid black;
  margin: 5px 0px 5px 0px;
  padding: 3px;
}`;

new CSS(false, style);

// Активация при загрузке страницы
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
};

// Класс для добавления CSS
class Css{
  constructor(title, style){
    this.css=document.createElement('style');
    title ? this.css.title=title : '';
    this.css.textContent=style;
    document.body.appendChild(this.css);
  }
};

// Класс открытия настроек
class SettingsOpener{
  constructor(){
    if(document.getElementById('DTF-settingsOpener')) return;
    this.main=document.createElement('div');
    this.main.className='DTF-settingsOpener';
    this.main.id='DTF-settingsOpener';
    document.body.appendChild(this.main);

    this.label=document.createElement('div');
    this.label.className='label';
    this.label.textContent='Настройки скриптов';
    this.main.appendChild(this.label);

    this.header=document.createElement('div');
    this.header.className='header';
    this.header.textContent='🛠️';
    this.main.appendChild(this.header);

    this.list=document.createElement('div');
    this.list.className='list';
    this.main.appendChild(this.list);
  }
};
// Итем класса открытия настроек
class SettingsItem{
  constructor(name, id){
    this.main=document.createElement('button');
    this.main.className='btn';
    this.main.id=`stg-DTF-${id}`;
    this.main.textContent=name;
    this.main.onclick=() => {
      new Settings();
    }
    document.getElementById('DTF-settingsOpener').children[2].appendChild(this.main);
  }
};

// Классы построения настроек
class Input{
  constructor({path, type, name, id, value, pattern, min, max, step, checked, disabled, required, auto, onchange, onfocus, onblur, text, iText, n}){
    this.div=document.createElement('div');
    path.appendChild(this.div);
    this.input=document.createElement('input');
    this.input.className='input';
    this.input.name=name;
    this.input.type=type;
    id ? this.input.id=id : '';
    required ? this.input.setAttribute('required', '') : '';
    checked ? this.input.checked=checked : '';
    disabled ? this.input.disabled=true : '';
    value ? this.input.value=value : '';
    pattern ? this.input.pattern=pattern : '';
    min ? this.input.min=min : '';
    max ? this.input.max=max : '';
    step ? this.input.step=step : '';
    auto ? this.input.autocomplete=auto : '';
    onchange ? this.input.onchange=onchange : '';
    onfocus ? this.input.onfocus=onfocus : '';
    onblur ? this.input.onblur=onblur : '';
    this.div.appendChild(this.input);

    this.inputName=document.createElement('label');
    this.inputName.className='input-label';
    text ? this.inputName.textContent=text : this.inputName.innerHTML=iText;
    this.div.appendChild(this.inputName);
    if(n) new NewLine(path)

    return this.input;
  }
};
class Select{
  constructor({path, label, name, value, options}){
    this.div=document.createElement('div');
    path.appendChild(this.div);
    this.main=document.createElement('select');
    this.main.name=name;
    this.div.appendChild(this.main);

    options.forEach(e => {
      new Option({
        path: this.main,
        text: e
      })
    })
    this.main.value=value;

    this.label=document.createElement('label');
    this.label.textContent=label;
    this.div.appendChild(this.label);
  }
};
class Option{
  constructor({path, text}){
    this.main=document.createElement('option');
    this.main.textContent=text;
    path.appendChild(this.main);
  }
};
class Field{
  constructor({path, groupName, legend, items, select, style}){
    this.field=document.createElement('fieldset');
    this.field.groupName=this.field.setAttribute('groupName', groupName);
    if(style) this.field.style=style;
    path.appendChild(this.field);

    if(legend){
      this.legend=document.createElement('legend');
      this.legend.textContent=legend;
      this.legend.onclick=() => {
        this.field.classList.toggle('show');
      }
      this.field.appendChild(this.legend);
    }

    items.forEach(e => {
      new Input({
        path: this.field,
        type: e.type,
        name: e.name,
        value: e.value,
        number: e.number,
        min: e.min,
        max: e.max,
        step: e.step,
        checked: e.checked,
        text: e.text,
        iText: e.iText,
        onchange: e.onchange,
        num: e.num
      })
    })

    if(select) select.forEach(e => {
      new Select({
        path: this.field,
        label: e.label,
        name: e.name,
        value: e.value,
        options: e.options
      })
    })
    return this.field;
  }
};
function fieldDisable(target){
  target.disabled = true;
  target.classList.toggle('show');
};

function getSettings(){
  let o = {};
  for(let i = 0, arr = document.querySelectorAll(`fieldset`); i < arr.length; i++){
    // console.log(arr)
    o[arr[i].getAttribute('groupName')] ? '' : o[arr[i].getAttribute('groupName')] = {};
    for(let item = 0, a = arr[i].children; item < a.length; item++){
      a[item].children[0] ? (a[item].children[0].tagName.match(/INPUT|SELECT/) ? o[arr[i].getAttribute('groupName')][a[item].children[0].name] = (a[item].children[0].type === 'checkbox' ? a[item].children[0].checked : a[item].children[0].value) : '') : '';
    }
  }
  return o;
}

// Функции для работы с CSS
function hexConverter(hex) {
  return `${parseInt(hex.substr(1,2), 16)} ${parseInt(hex.substr(3,2), 16)} ${parseInt(hex.substr(5,2), 16)}`
};
function rgbConverter(rgb) {
  rgb = rgb.split(' ');
  let color = {
    r: (+rgb[0]).toString(16),
    g: (+rgb[1]).toString(16),
    b: (+rgb[2]).toString(16)
  }

  if (color.r.length == 1)
    color.r = "0" + color.r;
  if (color.g.length == 1)
    color.g = "0" + color.g;
  if (color.b.length == 1)
    color.b = "0" + color.b;

  return `#${color.r}${color.g}${color.b}`;
};
function rgbaConverter(rgb, opacity){
  return `(${rgb} / ${opacity})`
};

// Функция инициализации скрипта
function init(settings, s){
  settings ? mainSettings = mergeSettings(defaultSettings, settings) : mainSettings = defaultSettings;
  new SettingsOpener();
  if(!document.getElementById(`stg-DTF-${s.id}`)) new SettingsItem(s.name, s.id);
  s.func();
  console.log(`[Init] Инициализация скрипта успешно выполнена.`, mainSettings);
};
