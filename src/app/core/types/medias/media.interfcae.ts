import { MediaType } from "express";
import { Entity } from "../entity.interface";

export interface Media extends Entity{
     reference: string;
     mediaType: MediaType;
     mimeType: string;
     size: number;
     userId: string;
}