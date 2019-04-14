import { Rate } from "../model/Rate";
import { Geometry } from "../model/Geometry"
import { Photo } from "../model/Photo"
export class Resto {
    name?: string
    place_id?: string
    vicinity?: string
    geometry?: Geometry
    rating?: number
    user_ratings_total?: number
    ratings?: Rate[]
    photos?: Photo[]

    /* constructor(
        name?: string,
        place_id?: string,
        vicinity?: string,
        geometry?: Geometry,
        rating?: number,
        user_ratings_total?: number,
        ratings?: Rate[],
        photos?: Photo[]
    ) {
        this.name = name
        this.place_id = place_id
        this.vicinity = vicinity
        this.geometry = geometry
        this.rating = rating
        this.user_ratings_total = user_ratings_total
        this.ratings = ratings
        this.photos = photos
    } */
}