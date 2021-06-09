export class Product{
    id:number;
    title:string;
    price:number;
    category:string;
    description:string;
    image:string;

    constructor(id:number,title:string,price:number,category:string, description:string,
        image:string){
            this.id=id;
            this.title=title;
            this.price=price;
            this.category=category;
            this.description=description;
            this.image=image;
    }
}