import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { RoomData, CommonService } from "src/app/services/common.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { map, tap } from "rxjs/operators";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.scss"],
})
export class SideBarComponent implements OnInit {
  randomSeed: any[] = [];
  roomData: RoomData[] = [];
  lastMessage: string;

  constructor(
    private afs: AngularFirestore,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    // Generate 20 karakter token untuk seed
    this.randomSeed = Array.from({ length: 20 }, () => {
      Math.floor(Math.random() * 1459687);
    });

    // Fetching Data from firestore
    this.afs
      .collection("rooms")
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            return {
              id: a.payload.doc.id,
              // @ts-ignore
              ...a.payload.doc.data(),
            };
          });
        })
      )
      .subscribe((rooms: RoomData[]) => {
        this.roomData = rooms;
        console.log(this.roomData);
      });
  }

  onFormSubmit(form: NgForm) {
    console.log(form.value.search);
  }
}
