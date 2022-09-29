import { createAction, props } from '@ngrx/store';
import {UserModel} from "../models/user.model";

export const setUser = createAction(
  '[ Auth ] setUser',
  props<{user: UserModel}>()
  );

export const unSetUser = createAction('[ Auth ] unSetUser');
