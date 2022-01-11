import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfilePicService } from 'src/app/services/profile-pic.service';
import { BehaviorSubject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  isPpCall: boolean = false;

  base64string!: string;

  nextBase64Str!: string;

  isHandle: boolean = false;

  //user = new UserModel();


  name = this.profileService.user.name;
  school = this.profileService.user.school;
  profession = this.profileService.user.profession;
  location_city = this.profileService.user.location_city;
  location_nation = this.profileService.user.location_nation;

  constructor(
    private modalService: NgbModal,
    private profileService: ProfilePicService,
    private sanitzer: DomSanitizer
  ) {

  }

  ngOnInit(): void {
    this.profileService.currentBase64.subscribe(theStr => this.base64string = theStr)
  }

  transformPp() {

    return this.sanitzer.bypassSecurityTrustResourceUrl(this.base64string);
  }
  transformPp2() {
    return this.sanitzer.bypassSecurityTrustResourceUrl(this.nextBase64Str);
  }

  newBase64() {
    this.profileService.changeBase64(this.base64string);

  }
  saveImage() {
    this.base64string = this.nextBase64Str
    this.newBase64();
    this.modalService.dismissAll()
    this.isPpCall = false


  }
  cancelPhoto() {
    this.nextBase64Str = this.base64string
  }

  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      //console.log(reader.result);
      this.isHandle = true
      this.nextBase64Str = reader.result as string;
      //this.base64string = reader.result as string;
      //console.log("********************");
      this.isPpCall = true;
      console.log(this.base64string);

    };

  }

  triggerModal(content: any) {
    this.modalService.open(content)//content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
    //   this.closeModal = `Closed with: ${res}`;
    // }, (res) => {
    //   this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    // });
  }

  newName!: string;
  newSchool!: string;
  newProfession!: string;
  newLocation_city!: string;
  newLocation_nation!: string;

  updateInfos(newName: any, newSchool: any) {
    newName = this.name
    newSchool = this.school
  }

  cancel() {
    this.name = this.profileService.user.name;
    this.school = this.profileService.user.school;
    this.profession = this.profileService.user.profession;
    this.location_city = this.profileService.user.location_city;
    this.location_nation = this.profileService.user.location_nation;
  }
}
