import { MediaType } from "express";

export interface Media {
     reference: string;
     mediaType: MediaType;
     mimeType: string;
     size: number;
     userId: string;
}