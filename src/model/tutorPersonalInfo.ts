import { Byte } from "@angular/compiler/src/util";
import { UserLanguage } from "./UserLanguage";

export class TutorPersonalInfo{
    
	
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
	
	  birthYear:string;
	
	  birthMonth:string;
	
	  birthDay:string;
	
	  gender:string;
	
	  currentAddress:string;
	
	  permAddress:string;
	
	  defLangaugeName:string;

	  defLangLevel:string;
	  languageList:UserLanguage[];
	  profilePicByte:BinaryType[];
}