import { Injectable } from '@angular/core';
import { Demand } from '../models/demand';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class DemandsService {

  constructor(public db: AngularFireDatabase) { }

  addNewRequest(load) {
    this.db.list('/requests').push(load);
  }

  markAsFinished(key) {
    this.db.list('/requests').update(key, {Responded: true});
  }

  markAsNotFinished(key) {
    this.db.list('/requests').update(key, {Responded: false});
  }

  // deleteRequest(key) {
  //   this.db.list('/requests').remove(key);
  // }
  toArchive(item) {
    // const keyless = Object.keys(item).reduce((obj, key) => {
    //   if ( key !== 'key') {
    //       obj[key] = item[key];
    //   }
    //   return obj;
    // }, {});
    // this.db.list('/archived').push(keyless);
    // console.log(item, item.key, keyless);
    this.db.list('/requests').update(item.key, {IsArchived: true});
  }

  toActive(item) {
    this.db.list('/requests').update(item.key, {IsArchived: false});
  }

  updateRequest(key, request) {
    this.db.list('/requests').update(key, request);
  }
}
