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

class Input {
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
}

class Select {
  constructor({path, label, value, options}){
    this.div=document.createElement('div');
    path.appendChild(this.div);
    this.main=document.createElement('select');
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
}
class Option{
  constructor({path, text}){
    this.main=document.createElement('option');
    this.main.textContent=text;
    path.appendChild(this.main);
  }
}

class Field {
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
        value: e.value,
        options: e.options
      })
    })
    return this.field;
  }
}

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

function hexConverter(hex) {
  return `${parseInt(hex.substr(1,2), 16)} ${parseInt(hex.substr(3,2), 16)} ${parseInt(hex.substr(5,2), 16)}`
}
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
}
function rgbaConverter(rgb, opacity){
  return `(${rgb} / ${opacity})`
}

function fieldDisable(target){
  target.disabled = true;
  target.classList.toggle('show');
}
