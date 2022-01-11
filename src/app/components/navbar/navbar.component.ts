import { Component, OnInit } from '@angular/core';
import { ProfilePicService } from 'src/app/services/profile-pic.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  base64String!: string;

  constructor(
    private profileService: ProfilePicService,
    private sanitzer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.profileService.currentBase64.subscribe(theStr => this.base64String = theStr)
  }

  transformPp() {
    
    return this.sanitzer.bypassSecurityTrustResourceUrl(this.base64String);
  }

}
