import { createAction, props } from '@ngrx/store';
import { UserStoreType } from 'src/app/models/ClientType';

export const updateUser = createAction('[User] update user', props<{ bookId: string }>());
export const signin = createAction('[User] signin', props<UserStoreType>());
export const signout = createAction('[User] signout');