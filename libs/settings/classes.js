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
  constructor({path, type, name, value, pattern, min, max, step, checked, disabled, required, auto, onchange, onfocus, onblur, text, iText, n}){
    this.div=document.createElement('div');
    path.appendChild(this.div);
    this.input=document.createElement('input');
    this.input.className='input';
    this.input.name=name;
    this.input.type=type;
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
    this.main=document.createElement('select');
    path.appendChild(this.main);

    options.forEach(e => {
      new Option({
        path: this.main,
        text: e
      })
    })
    this.main.value=value;

    this.label=document.createElement('label');
    this.label.textContent=label;
    path.appendChild(this.label);
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
