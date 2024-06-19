import { Entity } from "../entity.interface";
import { Media } from "../medias/media.interfcae";

export interface User extends Entity{
     firstName : string,
     lastName : string,
     avatarId? : string,
     avatar? : Media,  
}