import { Byte } from "@angular/compiler/src/util";

export interface Experience{
    tutorExperienceId:number;
    fromYear:number;
    toYear:number;
    company:string;
    designation:string;
    country:string;
    state:String;
    city:string;
    documentType:string;
    uploadStatus:boolean;
    additionalInfo:string
}