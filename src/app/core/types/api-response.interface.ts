import { PagingInfo } from "./paging.interface";

export default interface ApiResoponse<T>{
     data : T,
     pagingInfo? : PagingInfo
} 