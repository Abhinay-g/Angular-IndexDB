import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { DexieService } from './core/dexie.service';
import * as CryptoJS from 'crypto-js';
export interface Todo {
  title: string;
  done: boolean;
}

export interface TodoWithID extends Todo {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  key = CryptoJS.enc.Utf8.parse('7061737323313233');

  iv = CryptoJS.enc.Utf8.parse('7061737323313233');
  table: Dexie.Table<any, number>;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('todos');
  }

  getAll() {
    return new Promise((resolve, reject) => {
      const ol: Array<TodoWithID> = [];
      this.table.toArray().then(res => {
        console.log(res);
        const dedata = this.decryptData(res);
        // const un = <TodoWithID>Object.assign(dedata, { 'id': 11 });
        // const un:TodoWithID={

        // }

        ol.push(<TodoWithID>un);
        console.log(ol);

        // for (const i of dedata) {
        //   console.log(i);
        //   const n = Object.assign({}, i, i['key']);
        //   console.log(n);
        //   ol.push(n);
        // }
      });
      resolve(ol);
    });
  }

  add(dataip) {
    const edata = this.encryptData(dataip);
    console.log(edata.toString());

    return this.table.add({ data: edata.toString() });
  }

  update(id, data) {
    return this.table.update(id, data);
  }

  remove(id) {
    return this.table.delete(id);
  }
  encryptData(data: any) {
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(JSON.stringify(data)), this.key,
      {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    return encrypted;
  }
  decryptData(data: any) {
    const metadata: any[] = [];
    const decrypted: any = CryptoJS.AES.decrypt(data[0].data, this.key, {
      keySize: 128 / 8,
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    const json = decrypted.toString(CryptoJS.enc.Utf8);
    console.log(json);
    // metadata.push({ key: json.key, metadata: json.metadata, error: json.error });
    metadata.push(json);
    return metadata;
  }
}
