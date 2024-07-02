import { Entity } from "../entity.interface";
import { Media } from "../medias/media.interfcae";
import { User } from "../users/user.interface";

export interface Post extends Entity{
     caption : string,
     user : User,
     media? : Media
}