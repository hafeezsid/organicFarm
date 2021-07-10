import { Byte } from "@angular/compiler/src/util";

export interface Certificate{
    tutorCertificateId:number;
    acquiredYear:number;
    certificateName:string;
    provider:string;
    certificateLink:string;
    documentType:string;
    uploadStatus:boolean;
    attachedDoc:Byte[];
}