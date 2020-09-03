import { Component, OnInit, OnDestroy, Output, EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";
import { RoomData, CommonService } from "src/app/services/common.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { map, tap } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.scss"],
})
export class SideBarComponent implements OnInit, OnDestroy {
  randomSeed: any[] = [];
  roomData: RoomData[] = [];
  lastMessage: string;
  subs: Subscription[] = [];
  @Output() seedValue: EventEmitter<string> = new EventEmitter<string>();

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
    this.subs.push(
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
        })
    );
  }

  onFormSubmit(form: NgForm) {
    console.log(form.value.search);
  }

  ngOnDestroy() {
    this.subs.map((s) => s.unsubscribe());
  }

  seedData(ev: string) {
    this.seedValue.emit(ev);
  }

  onLogout() {
    this.commonService.logOut();
  }
}
