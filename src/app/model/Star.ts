export class Star {
        id: number;
        starNumber: number;
        backgroundImageURL: string;
    init(id, starNumber){
        this.id = id;
        this.starNumber = starNumber;
        this.backgroundImageURL = "url('../../assets/img/1x/emptyStar.png')";
    }
}