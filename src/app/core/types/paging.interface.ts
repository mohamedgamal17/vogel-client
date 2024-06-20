export default interface Paging<T>{
     data : T[],
     info : PagingInfo
}


export interface PagingInfo{
     nextCursor? : string,
     previouseCursor? :string,
     hasNext : boolean,
     hasPrevious : boolean,
     ascending : boolean
}