import {ActionReducerMap} from '@ngrx/store';
import * as ui from "./shared/ui.reducer";
import * as auth from "./auth/auth.reducer";
import * as ingressEgress from "./ingress-egress/ingress-egress.reducer";


export interface AppState {
  ui: ui.State,
  user: auth.State,
  // ingressEgress: ingressEgress.State,
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: auth.authReducer,
  // ingressEgress: ingressEgress.ingressEgressReducer,
}
