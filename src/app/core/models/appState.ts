export enum DataState {
     LOADING  = "Loading",
     LOADED = "Loaded",
     ERROR  = "Error"
}


export default interface AppDataState<T>
{
     data? : T,
     state : DataState,
     error? : any
} 