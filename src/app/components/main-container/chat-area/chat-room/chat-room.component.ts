import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  isUser: User;
  item;
  messageData: any[] = [];

  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    private afs: AngularFirestore
  ) {
    this.isUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.subs.push(
      this.route.paramMap
        .pipe(map((paramMap) => paramMap.get('id')))
        .subscribe((routePathParam) =>
          this.commonService.updatePathParamState(routePathParam)
        )
    );

    this.subs.push(
      this.route.params.subscribe((par) => {
        // To get all data matching the document id
        this.afs
          .collection('rooms')
          .doc(par.id)
          .get()
          .subscribe((data) => {
            this.item = data;
          });

        // To get message sorting by time ascendent (order sesuai last message masuk)
        this.subs.push(
          this.afs
            .collection('rooms')
            .doc(par.id)
            .collection('messages', (ref) => ref.orderBy('time', 'asc'))
            .valueChanges()
            .subscribe((messages) => {
              this.messageData = messages;
            })
        );
      })
    );
  }

  ngOnDestroy() {
    this.subs.map((s) => s.unsubscribe());
  }
}
