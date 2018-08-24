import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DemandsService } from '../service/demands.service';
import { Demand } from '../models/demand';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  showResponded: Boolean = false;
  showOverdue: Boolean = false;
  requestList: Observable<Demand[]>;
  archiveList: Observable<Demand[]>;
  editState: Boolean = false;
  requestToEdit: Demand;
  showArchived: Boolean = false;
  // term = 30;

  constructor(public db: AngularFireDatabase, public service: DemandsService, public dialog: MatDialog) {
    this.requestList = db.list('/requests', ref => ref.orderByChild('IsArchived').equalTo(false)).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.archiveList = db.list('/requests', ref => ref.orderByChild('IsArchived').equalTo(true)).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  openDialog(item): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '400px',
      data: item
    });
  }

  ngOnInit() {
  }

  isOverdue(orderDate, overdueTerm) {
    if (orderDate) {
      const passedDays = Math.abs(+new Date() - +new Date(orderDate));
      if (passedDays > overdueTerm * 86400000) {
        return true;
      } return false;
    } return false;
  }
  // showIt() {
  //   console.log(this.showResponded);
  // }

  markResponded(load) {
    // console.log(load);
    this.service.markAsFinished(load.key);
  }

  markNotResponded(load) {
    // console.log(load);
    this.service.markAsNotFinished(load.key);
  }

  // deleteRequest(load) {
  //   this.service.deleteRequest(load.key);
  // }

  editRequest(request: Demand) {
    this.editState = true;
    this.requestToEdit = request;
    // console.log(request);
  }

  updateRequest(request: Demand) {
    const updated = Object.keys(request).reduce((obj, key) => {
      if ( key !== 'key') {
          obj[key] = request[key];
      }
      return obj;
    }, {});
    this.service.updateRequest(request.key, updated);
    // console.log(request.key, updated);
    this.clearState();
  }

  returnToActive(request) {
    this.service.toActive(request);
  }

  clearState() {
    this.editState = false;
    this.requestToEdit = null;
  }
}
