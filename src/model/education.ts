import { User } from "./User";

export interface Education{
    from:number;
    to:number;
    institutionName:string;
    major:string;
    degree:string;
    additionInfo:string;
    user:User;
    attachmentDoc:File;
}