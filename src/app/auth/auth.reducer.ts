import { createReducer, on } from '@ngrx/store';
import { setUser, unSetUser } from './auth.actions';
import {UserModel} from "../models/user.model";

export interface State {
    user: UserModel;
}


export const initialState: State = {
  // @ts-ignore
    user: null,
};


export const authReducer = createReducer(
  initialState,
  on(setUser, (state, {user}) => ({ ...state, user: {...user}})),
  // @ts-ignore
  on(unSetUser, (state) => ({ ...state, user: null})),
);
