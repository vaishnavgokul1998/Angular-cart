import { Action, Selector, State, StateContext } from "@ngxs/store";
import { UserDetailModel } from "../models/login/login.response.model";
import { LogOut, SetToken, SetUserDetails } from "./app.action";

export interface AppStateModel {
      jwtToken: string;
      userDetails?:UserDetailModel | null;
}
const defaults: AppStateModel = {
    jwtToken: "",
    userDetails: null
};
@State<AppStateModel>({
    name: 'app',
    defaults: {
        ...defaults
    }
})
export class AppState {

    @Selector()
    static getToken(state: AppStateModel) {
        return state.jwtToken;
    }

    @Action(SetToken)
    setJwtToken({ patchState }: StateContext<AppStateModel>, { jwtToken }: SetToken) {
        patchState({
            jwtToken: jwtToken
        });
    }
    
    @Action(SetUserDetails)
    setUserDetails({ patchState }: StateContext<AppStateModel>, { userDetails }: SetUserDetails) {
        patchState({
            userDetails: userDetails
        });
    }

    @Action(LogOut)
    logout(context: StateContext<AppStateModel>) {
      context.setState({ ...defaults });
    }
}