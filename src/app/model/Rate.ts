export class Rate {
    author_name?: string
    author_url?: string
    language?: string
    profile_photo_url?: string
    rating?: number
    relative_time_description?: string
    text?: string
    time?: number

    constructor(
        author_name?: string,
        rating?: number,
        relative_time_description?: string,
        text?: string){
            this.author_name = author_name;
            this.rating = rating;
            this.relative_time_description = relative_time_description;
            this.text = text;
    }
}