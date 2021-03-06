import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserModel, TypeOfEmployment } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfilePicService {

  public user: UserModel = {
    name: "Halil Mert Sabah",
    school: "Erciyes Üniversitesi",
    profession: "Full Stack Developer",
    location_city: "Ankara",
    location_nation: "Türkiye",
    experiences: [
      {
        id: 0,
        title: "Full Stack Developer",
        type_of_employment: TypeOfEmployment.full_time,
        company_name: "Taptoweb IT",
        co_location_city: "İstanbul",
        co_location_nation: "Türkiye",
        started_at_year: "2021",
        started_at_month: "Haziran",
        ended_at_year: "2021",
        ended_at_month: "Kasım"
      },
      {
        id: 1,
        title: "Full Stack Developer",
        type_of_employment: TypeOfEmployment.freelancer,
        company_name: "Ness",
        co_location_city: "Ankara",
        co_location_nation: "Türkiye",
        started_at_year: "2020",
        started_at_month: "Ekim",
        ended_at_year: "2021",
        ended_at_month: "Nisan"
      }
    ],
    educations: [
      {
        id: 0,
        school_name: "Erciyes Üniversitesi",
        degree: "Lisans",
        departman: "Harita Mühendisliği",
        started_at_year: "2009",
        started_at_month: "Eylül",
        ended_at_month: "Şubat",
        ended_at_year: "2016"
      }
    ],
    ppBase64: "data:image/jpeg;base64,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"
  }

  private theBase64 = new BehaviorSubject<string>(this.user.ppBase64!);
  currentBase64 =  this.theBase64.asObservable();

  private started_at_year = new BehaviorSubject<string>("");
  current_s_a_year = this.started_at_year.asObservable();

  private started_at_month = new BehaviorSubject<string>("");
  current_s_a_month = this.started_at_month.asObservable();

  private ended_at_year = new BehaviorSubject<string>("");
  current_e_a_year = this.ended_at_year.asObservable();

  private ended_at_month = new BehaviorSubject<string>("");
  current_e_a_month = this.ended_at_month.asObservable();

  private started_at_year_ed = new BehaviorSubject<string>("");
  current_s_a_year_ed = this.started_at_year.asObservable();

  private started_at_month_ed = new BehaviorSubject<string>("");
  current_s_a_month_ed = this.started_at_month.asObservable();

  private ended_at_year_ed = new BehaviorSubject<string>("");
  current_e_a_year_ed = this.ended_at_year.asObservable();

  private ended_at_month_ed = new BehaviorSubject<string>("");
  current_e_a_month_ed = this.ended_at_month.asObservable();



  constructor(
    private http: HttpClient
  ) {}

  changeSaM(sam: string) {
    this.started_at_month.next(sam)
  }
  changeSaY(say: string) {
    this.started_at_year.next(say)
  }
  changeEaM(eam: string) {
    this.ended_at_month.next(eam)
  }
  changeEaY(eay: string) {
    this.ended_at_year.next(eay);
  }

  changeBase64(base64str: string) {
    this.theBase64.next(base64str);
  }

  changeSaMed(sam: string) {
    this.started_at_month_ed.next(sam)
  }
  changeSaYed(say: string) {
    this.started_at_year_ed.next(say)
  }
  changeEaMed(eam: string) {
    this.ended_at_month_ed.next(eam)
  }
  changeEaYed(eay: string) {
    this.ended_at_year_ed.next(eay);
  }

  

  public get eamValue() {
    return this.ended_at_month.value;
  }
  public get eayValue() {
    return this.ended_at_year.value;
  }
  public get samValue() {
    return this.started_at_month.value
  }
  public get sayValue() {
    return this.started_at_year.value;
  }


  public get eamValueEd() {
    return this.ended_at_month_ed.value;
  }
  public get eayValueEd() {
    return this.ended_at_year_ed.value;
  }
  public get samValueEd() {
    return this.started_at_month_ed.value
  }
  public get sayValueEd() {
    return this.started_at_year_ed.value;
  }

}
