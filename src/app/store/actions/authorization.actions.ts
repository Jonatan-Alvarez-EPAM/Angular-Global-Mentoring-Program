import { createAction, props } from '@ngrx/store';
import { User } from '@app/app-models';

export const allowAccess = createAction(
  '[Authorization] Allow Access'
);

export const removeAccess = createAction(
  '[Authorization] Remove Access'
);

export const updateUser = createAction(
  '[Authorization] Update User', props<{ userInfo: User }>()
);
