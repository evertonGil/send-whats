import { createReducer, on } from '@ngrx/store';
import { ClientStoreType } from 'src/app/models/ClientType';
import { signin, signout, updateUser } from '../actions/client.action';


const initalUser = {
    login: '',
    role: 'admin',
    signed: false
}

export const initialState: ClientStoreType = {
    user: initalUser
};

const _clientReducer = createReducer(
    initialState,
    on(updateUser, (state) => state),
    on(signin, (state, user) => {

        const newState = { ...state, user };
        return newState;
    }),
    on(signout, (state) => {
        localStorage.setItem("client", JSON.stringify(initialState));
        return initialState;
    })
);


export function clientReducer(state, action) {
    return _clientReducer(state, action);
}