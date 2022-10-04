import {createAction, props} from '@ngrx/store';
import {IngressEgressModel} from "../models/ingress-egress.model";

export const setItems = createAction(
  '[ IngressEgress] Set Items',
  props<{items: IngressEgressModel[]}>()
);

export const unSetItems = createAction('[ IngressEgress] Unset Items');
