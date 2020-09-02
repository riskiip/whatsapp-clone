import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private commonServie: CommonService) { }

  ngOnInit() {
  }

  login() {
    this.commonServie.loginWithGoogle();
  }

}
