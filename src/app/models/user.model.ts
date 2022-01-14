export class UserModel {
    name?: string;
    school?: string;
    profession?: string;
    location_city?: string;
    location_nation?: string;
    experiences?: UserExperiences[];
    ppBase64?: string;  //Base64'e dönüştürülmüş profil resmi stringi
}

export class UserExperiences {
    id?: number;
    title?: string;
    type_of_employment?: TypeOfEmployment;
    company_name?: string;
    co_location_city?: string;
    co_location_nation?: string;
    started_at_year?: string;
    started_at_month?: string;
    ended_at_year?: string;
    ended_at_month?: string;
}

export enum TypeOfEmployment {
    full_time = "Tam zamanlı",
    part_time = "Yarı zamanlı",
    own_job = "Kendi işim",
    freelancer = "Freelancer",
}