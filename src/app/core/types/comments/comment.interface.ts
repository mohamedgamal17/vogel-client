import { Entity } from "../entity.interface";
import { User } from "../users/user.interface";

export interface Comment extends Entity{
   content: string;
    postId: string;
    userId: string;
    user: User;
}