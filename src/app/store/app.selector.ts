import { Selector } from "@ngxs/store";
import { AppState, AppStateModel } from "./app.state";

export class AppSelectors{

    @Selector([AppState])
    static getJwtToken(state:AppStateModel){
       return state.jwtToken;
    }

    @Selector([AppState])
    static getUserDetails(state:AppStateModel){
        if(state?.userDetails){
            return state.userDetails
        }
       return null;
    }
}