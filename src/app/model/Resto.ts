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

    constructor(
        name?: string,
        vicinity?: string,
        geometry?: Geometry,
        rating?: number
    ) {
        this.name = name
        this.vicinity = vicinity
        this.geometry = geometry
        this.rating = rating
    }
}