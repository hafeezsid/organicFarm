

import { Certificate } from "./certificate";
import { Education } from "./education";
import { Experience } from "./Experience";
import { TutorSubject } from "./tutorSubjects";

export class TutorProfileInfo
{
    tutorProfileInfoId:number;
	tutorSubjects:TutorSubject[];
	aboutMe:string;
	aboutTeachingExp:string;
	otherInfo:string;
    hourlyRate:number;
	currency:string;
	educations:Education[];
	experiences:Experience[];
	certificates:Certificate[];
}