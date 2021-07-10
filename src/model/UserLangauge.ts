export class UserLangauge{
    userLanguageId:number;
    languageCode:string;
    levelCode:string;
    isDefault:boolean

    constructor(code:string,name:string,isDefault:boolean){
    this.languageCode=code;
    this.levelCode=name;
    this.isDefault=isDefault;
}

}