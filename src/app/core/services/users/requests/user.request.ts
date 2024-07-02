import { Gender } from "../../../types/users/gender.enum";

export default interface UserRequest {
     firstName : string,
     lastName : string,
     birthDate : Date,
     gender : Gender,
     avatarId? : string
}