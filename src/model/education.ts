import { Byte } from "@angular/compiler/src/util";
import { User } from "./User";

export interface Education{
    tutorEducationId:number;
    fromYear:number;
    toYear:number;
    institutionName:string;
    major:string;
    degree:string;
    additionInfo:string;
    documentType:string;
    uploadStatus:boolean;
    attachedDoc:Byte[]
}