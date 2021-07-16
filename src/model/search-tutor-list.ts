import { TutorListView } from "./tutor-list-view";

export interface SearchTutorList{
    totalCount:number;
    tutorList:TutorListView[];
    page:number;
    size:number;
}