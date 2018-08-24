import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { DemandsService } from '../service/demands.service';
import { Demand } from '../models/demand';

@Component({
  selector: 'app-new-request-form',
  templateUrl: './new-request-form.component.html',
  styleUrls: ['./new-request-form.component.css']
})
export class NewRequestFormComponent implements OnInit {

  Request: Demand = {
    Date: '',
    Buyer: '',
    Item: '',
    Responded: false,
    Supplier: '',
    OrderDate: '',
    TrackingNumber: '',
    Notes: '',
    OverdueDuration: 30,
    IsArchived: false,
  };
  constructor(private db: AngularFireDatabase, public service: DemandsService) { }

  ngOnInit() {
  }

  onSubmit() {
    // console.log(this.Request);
    this.service.addNewRequest(this.Request);
    // this.db.list('/requests').push(this.Request);
  }
}
