// ==UserScript==
// @name        DTF indexedDB
// @namespace   https://github.com/TentacleTenticals/dtf-libs
// @match       https://dtf.ru/*
// @grant       none
// @version     1.0
// @author      Tentacle Tenticals
// @description База данных DTF. Используется для хранения настроек скриптов и т.п
// @homepage https://github.com/TentacleTenticals/dtf-libs
// @license MIT
// ==/UserScript==
/* jshint esversion:8 */

async function connectDB(db, resolve, reject) {
  return new Promise((resolve, reject) => {  
    var req = indexedDB.open(db.name, db.version);
    req.onsuccess = (ev) => {
      console.log('[connectDB] Success!');   
      db.connect = ev.target.result;
      resolve({status:'success', type:'connect', msg:`[connectDB] Успешно установлено соединение с датабазой.`});
    }
    req.onupgradeneeded = (event) => {
      console.log('[connectDB] Upgrade!');
      db.connect = event.target.result;
      db.init = 1;
      if (!db.connect.objectStoreNames.contains(db.store)) {
        var store = db.connect.createObjectStore(db.store, { keyPath: db.key });
        store.transaction.oncomplete = (e) => {
          resolve({status:'success', type:'key writing', msg:`[createDB] ${db.name}, задача по записи ключа в базу данных успешно завершена.`});
        }
        store.transaction.onerror = (event) => {
          reject({status:'fail', msg:`[createDB] ${db.name}, ${event.request.errorCode}`});
        };
      }else{
        resolve({status:'sucess', msg:'key already here'})
      }
      // resolve({status:'success', type:'create/update', msg:`[connectDB] База данных успешно создана/обновлена до новой версии.`});
    }
    req.onerror = (e) => {
      console.log('[connectDB] Error!');
      reject({status:'fail', msg:e});
    }
  });
}
function createDB(db, data) {
  return new Promise((resolve, reject) => {
    if (!db.init) {
      resolve({status:'fail', type:'init', msg:`[createDB] ${db.name}, база данных не инициализирована.`})
    }
    if (!db.connect.objectStoreNames.contains(db.store)) {
      var store = db.connect.createObjectStore(db.store, { keyPath: db.key });
      store.transaction.oncomplete = (e) => {
        resolve({status:'success', type:'key writing', msg:`[createDB] ${db.name}, задача по записи ключа в базу данных успешно завершена.`});
      }
      store.transaction.onerror = (event) => {
        reject({status:'fail', msg:`[createDB] ${db.name}, ${event.request.errorCode}`});
      };
    }else{
      resolve({status:'sucess', msg:'key already here'})
    }
      // var trx = db.connect.transaction(db.store, "readwrite").objectStore(db.store);
      // // db.data.map(row => trx.add(row));
      // trx.add(data);
  });
}
function addToDB(db, data) {
  return new Promise((resolve, reject) => {
    var trx = db.connect.transaction([db.store], "readwrite").objectStore(db.store);
    // newData.map(row => trx.add(row));
    trx.add(data);
    resolve({status:'success', type:'data writing', msg:`[addToDB] ${db.store}, задача по добавлению настроек в базу данных успешно завершена.`});
    trx.onerror = (e) => {
      reject(e);
    }
  });
};
async function readDB(db, key) {
  return new Promise((resolve, reject) => {
    var trx = db.connect.transaction([db.store], "readonly").objectStore(db.store);
    trx = trx.get(key);
    trx.onsuccess = (e) => {
      if (!e.target.result) {
        reject({status:'fail', type:'data search', msg:`[readDB] ${db.store}, id:${key} не найден!`});
      }else
      {
        console.log(`Запись в базе данных ${db.name} по id:${key} успешно найдена.`)
        resolve({status:'success', type:'data search', msg:`Запись в базе данных ${db.name} по id:${key} успешно найдена.`, data:e.target.result});
      }
    }
    trx.onerror = (e) => {
      reject(e);
    }
  });
}
function updateDataInDB(db, key, update) {
  return new Promise((resolve, reject) => {
    var trx = db.connect.transaction([db.store], "readwrite").objectStore(db.store);
    var req = trx.get(key);
    req.onsuccess = (e) => {
      if(e.target.result) {
        // console.log('RES', e.target.result)
        var data = e.target.result;
        Array.from(Object.keys(update)).map((i) => {
          data[i] = update[i];
        });
        var upd = trx.put(data);
        upd.onsuccess = (e) => {
          console.log(upd)
          resolve({status:'success', type:'data update', msg:`[updateDataInDB] ${db.name}, успешно обновлена запись по id:${key}.`});
        }
      }else
      {
        resolve({status:'fail', type:'data update', msg:`[updateDataInDB] ${db.store}, id:${key} не найден!`});
      }
    } 
    trx.onerror = (e) => {
      reject(e);
    }
  });
}
function deleteFromDB(db, key) {
  return new Promise((resolve, reject) => {
    var trx = db.connect.transaction([db.store], "readwrite").objectStore(db.store);
    var req = trx.delete(key);
    console.log(`[deleteFromDB] ${db.name}, начата попытка удаления записи по id:${key}.`);
    req.onsuccess = () => {
      resolve({status:'success', type:'data deleting', msg:`[delDB] ${db.name}, запись под id:${key} успешно удалена.`});
    }
    trx.onerror = (e) => {
      reject(e);
    }
  });
}

async function settingsLoader(db) {
  if(!db.indexedDB){
    console.log('Ваш браузер не поддерживает базу данных `indexedDB`, которую использует данный скрипт для хранения настроек.\nБудет использоваться дефолтный список настроек...если вы всё же хотите использовать свои собственные настройки, отредактируйте скрипт, импортировав в него свои настройки.');
    return init(false, initCfg);
  }else
  {
    if(!(await indexedDB.databases()).map(ind => ind.name).includes(db.name)){
      console.log(`[indexedDB] Базы данных ${db.name} не найдено. Будут использованы дефолтные настройки.`);
      // connectDB(db)
      // .then(() => {
      //   createDB(db, {...db.data, settings:defaultSettings}).then(res => {
      //     console.log(res)
      //   })
      // })
        return init(false, initCfg);
    }else{
      console.log(`[indexedDB] База данных ${db.name} существует. Сейчас я проверю её на наличие сохранённых настроек.`);
      connectDB(db)
      .then(() => {
        readDB(db, 'settings').then(res => {
          if(res.status === 'fail'){
            console.log(`[indexedDB] База данных ${db.name} существует, но нет сохранённых настроек. Будут использованы дефолтные настройки.`);
            init(false, initCfg);
          }else
          {
            console.log(`[indexedDB] В базе данных ${db.name} найдены сохранённые настройки, загружаю их.`);
            init(res.data.settings, initCfg);
          }
        }).catch(err => {
          console.log(err)
          console.log(`[indexedDB] Произошла ошибка, или база данных ${db.name} существует, но нет сохранённых настроек. Будут использованы дефолтные настройки.`);
          init(false, initCfg);
          // connectDB(db)
          // .then(() => {
          //     addToDB(db, {...db.data, settings:defaultSettings}).then(res => {
          //       console.log(res)
          //     }).catch(err => {
          //       console.log(err)
          //   })
          // })
        })
      }).catch(err => console.log(err));
    }
  }
}
function settingsUpdater(db, settings){
  if(!db.indexedDB){
    console.log('Ваш браузер не поддерживает базу данных `indexedDB`, которую использует данный скрипт для хранения настроек.\nБудет использоваться дефолтный список настроек...если вы всё же хотите использовать свои собственные настройки, отредактируйте скрипт, импортировав в него свои настройки.');
    return
  }else
  {
    connectDB(db)
    .then(() => {
      readDB(db, 'settings').then(res => {
        if(res.status === 'success' && res.type === 'data search'){
          console.log(`В базе данных ${db.name} найдены сохранённые настройки. Будет выполнено обновление.`);
          updateDataInDB(db, 'settings', {...db.data, settings:settings}).then(res => {
            console.log('Upddated', res.status);
            init(settings, initCfg);
          }).catch(err => console.log(err))
        }
      }).catch(err => {
        if(err.status === 'fail'){
          console.log(`База данных ${db.name} существует, но не сохранённые настройки. Будут сохранены новые настройки.`);
          connectDB(db).then(res => {
            addToDB(db, {...db.data, settings:settings}).then(res => {
              console.log(res)
              init(settings, initCfg);
            }).catch(err => {
              console.log(err)
            });
          });
        }
      })
    }).catch(err => console.log(err));
  }
}
function mergeSettings(def, sav){
  let tg = {};
  for(let item in def){
      if(typeof(def[item]) === 'object'){
          tg[item] = {};
          for(let i2 in def[item]){
              if(typeof(def[item][i2]) === 'object'){
                  tg[item][i2] = {};
                  for(let i3 in def[item][i2]){
                      if(typeof(def[item][i3]) === 'object'){
                          tg[item][i2][i3] = {};
                      }else
                      if((typeof def[item][i2][i3]).match(/string|number|symbol|array|boolean/)){
                          sav[item][i2] ? (sav[item][i2][i3] === undefined ? tg[item][i2][i3] = def[item][i2][i3] : tg[item][i2][i3] = sav[item][i2][i3]) : tg[item][i2][i3] = def[item][i2][i3];
                      }
                  }
              }else
              if((typeof def[item][i2]).match(/string|number|symbol|array|boolean/)){
                  sav[item] ? (sav[item][i2] === undefined ? tg[item][i2] = def[item][i2] : tg[item][i2] = sav[item][i2]) : tg[item][i2] = def[item][i2];
              }
          }
      }else
      if(typeof(def[item]) === 'string'){
          sav[item] === undefined ? tg[item] = def[item] : tg[item] = sav[item];
      }
  }
  console.log(`[Init] Настройки успешно совмещены`, tg);
  return tg;
}
