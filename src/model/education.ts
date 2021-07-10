import { Byte } from "@angular/compiler/src/util";

export interface Education{
    tutorEducationId:number;
    fromYear:number;
    toYear:number;
    institutionName:string;
    major:string;
    degree:string;
    additionalInfo:string;
    documentType:string;
    uploadStatus:boolean;
    attachedDoc:Byte[]
}