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

// Функция инициализации скрипта
function init(name, id, settings, func){
  settings ? mainSettings = mergeSettings(defaultSettings, settings) : mainSettings = defaultSettings;
  if(!document.getElementById('stg-DTF-feeds')) new SettingsItem(name, id);
  func();
  console.log(`[Init] Инициализация скрипта успешно выполнена.`, mainSettings);
};
