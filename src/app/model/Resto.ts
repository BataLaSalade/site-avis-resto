import { Rate } from "../model/Rate";
import { Geometry } from "../model/Geometry"
import { Photo } from "../model/Photo"
export class Resto {
    constructor(
        name: string,
        place_id: string,
        vicinity: string,
        geometry: Geometry,
        rating: number,
        user_ratings_total: number,
        ratings: Rate[],
        photos: Photo[]

    ) {}
}