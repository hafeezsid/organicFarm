import { logging } from "protractor";
import { Certificate } from "./certificate";
import { Education } from "./education";
import { Experience } from "./Experience";
import { TutorSubject } from "./tutorSubjects";
import { UserLanguage } from "./UserLanguage";

export interface TutorListView {

    tuturProfileId:number;
    displayName:string;
	tutorPersonalInfoId:number;
	preferredChat:string;
	skypeId:string;
	zoomMeetingLink:string;
	zoomMeetingId:string;
	zoomPassCode:string;
	fromCountry:string;
	fromState:string;
	fromCity:string;
	livingInCountry:string;
	livingInState:string;
	livingInCity:string;
	//birthYear:string;
	//birthMonth:string;
	//birthDay:string;
	gender:string;
	currentAddress:string;
	permAddress:string;
	defLangaugeName:string;
    defLangLevel:string;
	languageList:UserLanguage[];
	profilePicByte:BinaryType[];
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
	createdDate:number;
    
}
