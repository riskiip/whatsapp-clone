import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomData } from 'src/app/services/common.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  randomSeed: any[] = [];
  roomData: RoomData[] = [];

  constructor() { }

  ngOnInit() {
  }

  onFormSubmit(form: NgForm) {
    console.log(form.value.search);
  }

}
