import {createReducer, on} from '@ngrx/store';
import {setItems, unSetItems} from './ingress-egresso.actions';
import {IngressEgressModel} from "../models/ingress-egress.model";

export interface State {
  items: IngressEgressModel[];
}

export const initialState: State = {
  items: [],
};

export const ingressEgressReducer = createReducer(
  initialState,
  on(setItems, (state, {items}) => ({...state, items: [...items]})),
  on(unSetItems, (state) => ({...state, items: []})),
);
