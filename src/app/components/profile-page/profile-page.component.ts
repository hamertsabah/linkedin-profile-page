import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfilePicService } from 'src/app/services/profile-pic.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { UserModel, UserExperiences } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  modalReference: any;
  isPpCall: boolean = false;
  base64string!: string;
  nextBase64Str!: string;
  isHandle: boolean = false;
  isEditExp: boolean = false;
  isEditEduc: boolean = false;
  //userExperiencesArr = this.profileService.user.experiences;
  user: UserModel = this.profileService.user;
  //user = new UserModel();
  istihdam = ["Tam zamanlı", "Yarı zamanlı", "Freelancer", "Kendi İşim"];
  months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  years = ["2021", "2020", "2019", "2018", "2017", "2016", "2015"]

  selectedYear!: string;


  userExpArr = this.user.experiences;
  theUserExpItem!: UserExperiences;
  theNewUserExpItem!: UserExperiences;
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
    //console.log(this.userExpArr);
    console.log("aaaa");
    
    //theUserExpItem: UserExperiences;

  }

  selectedStartedAtMonth!: string; //this.theUserExpItem.started_at_month;
  selectedStartedAtYear!: string; //this.theUserExpItem.started_at_year;
  selectedEndedAtMonth!: string; //this.theUserExpItem.ended_at_month;
  selectedEndedAtYear!: string; //this.theUserExpItem.ended_at_year



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

  newExpAttr = {
    new_title: '',
    new_type_of_employment: '',
    new_company_name: '',
    new_co_location_city: '',
    new_co_location_nation: '',
    new_started_at_month: '',
    new_started_at_year: '',
    new_ended_at_month: '',
    new_ended_at_year: ''
  }

  openModalExpForUpd(content: any, i: UserExperiences) {
    this.isEditExp = true;
    console.log(i.ended_at_month);
    
    this.profileService.changeEaM(i.ended_at_month as string);
    this.profileService.changeEaY(i.ended_at_year as string);
    this.profileService.changeSaM(i.started_at_month as string);
    this.profileService.changeSaY(i.started_at_year as string);
    
    this.modalReference = this.modalService.open(content);
    //this.profileService.current_e_a_month.subscribe(str => this.selectedEndedAtMonth = str)
    this.selectedEndedAtMonth = this.profileService.eamValue
    this.selectedStartedAtYear = this.profileService.sayValue
    this.selectedEndedAtYear = this.profileService.eayValue;
    this.selectedStartedAtYear = this.profileService.sayValue;
    //modalRef.componentInstance.user = this.userExpArr
    console.log(this.profileService.sayValue);
    this.modalReference.result.then((data: any) => {
      this.isEditExp = false
       
    },
      (error: any) => {
        this.isEditExp = false
      })
    this.theUserExpItem = i;
    console.log(this.theUserExpItem);

  }
  createNewExp() {
    const newExp: any = {
      new_title: this.newExpAttr.new_title,
      new_type_pf_employement: this.newExpAttr.new_type_of_employment,
      new_company_name: this.newExpAttr.new_company_name,
      new_co_location_city: this.newExpAttr.new_co_location_city,
      new_co_location_nation: this.newExpAttr.new_co_location_nation,
      new_started_at_year: this.newExpAttr.new_started_at_year,
      new_started_at_month: this.newExpAttr.new_started_at_month,
      new_ended_at_year: this.newExpAttr.new_ended_at_year,
      new_ended_at_month: this.newExpAttr.new_ended_at_month
    };
    this.userExpArr?.push(newExp);
  }

  openExpAddModal() {
    //this.modalService.open()
  }

  triggerModal(content: any) {
    //if (content == "modalExperience") this.isEditExp == false
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
  cancelExpModal() {
    // if(this.isEditExp == true) {
    //   this.theUserExpItem.title = item.title
    //   this.theUserExpItem.type_of_employment = item.type_of_employment
    //   this.theUserExpItem.company_name = item.company_name
    // }
    this.isEditExp == false
  }
}
