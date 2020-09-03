import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { RoomData } from "src/app/services/common.service";
import { Subscription } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-side-bar-content",
  templateUrl: "./side-bar-content.component.html",
  styleUrls: ["./side-bar-content.component.scss"],
})
export class SideBarContentComponent implements OnInit {
  @Input() roomData: RoomData;
  @Input() randomSeed: string;
  @Output() seedValue: EventEmitter<string> = new EventEmitter<string>();

  lastMessage: string;
  subs: Subscription;

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.subs = this.afs
      .collection("rooms")
      .doc(this.roomData.id)
      .collection("message", (ref) => ref.orderBy("time", "desc"))
      .valueChanges()
      .subscribe((data) => {
        if (data.length > 0) {
          this.lastMessage = data[0].message;
        }
      });
  }

  onClick() {
    this.seedValue.emit(this.randomSeed);
  }
}
