import { createStore } from 'easy-peasy';

import model from './model';


export const store = createStore(model);

export async function onLogout(){
    store.persist.clear().then(() => {
        console.log('log out');
    });
    store.getActions().resetUserState();
}
