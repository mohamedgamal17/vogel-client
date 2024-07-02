import { Entity } from "../entity.interface";
import { Media } from "../medias/media.interfcae";
import { Gender } from "./gender.enum";

export interface User extends Entity{
     firstName : string,
     lastName : string,
     email : string
     avatarId? : string,
     avatar? : Media,  
     gender : Gender,
     birthDate : Date
}