import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpEvent } from "@angular/common/http";
import { Media } from "../../types/medias/media.interfcae";
import { Observable, finalize } from "rxjs";
import ApiResoponse from "../../types/api-response.interface";

@Injectable({
     providedIn: "root"
})

export default class MediaService {
     private baseUrl = environment.apiUrl + "/" + "medias"

     constructor(private httpClient: HttpClient) {

     }

     getAll() {
          return this.httpClient.get<ApiResoponse<Media[]>>(this.baseUrl);
     }

     getById(id : string){
          return this.httpClient.get<ApiResoponse<Media>>(this.baseUrl + "/" + id)
     }

     create(file : File) : Observable<HttpEvent<ApiResoponse<Media>>>{
          var formData = new FormData();
          formData.append('file', file)
          return this.httpClient.post<ApiResoponse<Media>>(this.baseUrl,formData, {
               reportProgress : true,
               observe:"events"
          });
     }
}