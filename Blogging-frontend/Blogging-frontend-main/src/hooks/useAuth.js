
import React from 'react'
import { proxy, useSnapshot,snapshot } from 'valtio';
import axios from 'axios';
import { isEmpty } from 'lodash-es';
//proxy object

function getAuthUser(){
    const jwt = window.localStorage.getItem('jwtToken');

    if(!jwt) return {};

    return JSON.parse(atob(jwt))
}
const state = proxy(
    {
        authUser:getAuthUser(),

    },
   
);

const isAuth  = snapshot(state);
const actions = {
    login: (user) => {
        console.log('login',{user,state});
        state.authUser = user;
        window.localStorage.setItem('jwtToken', btoa(JSON.stringify(state.authUser)));

        axios.defaults.headers.Authorization = `Token ${state.authUser.token}`;
    },
    logout:() => {
        state.authUser = {};
        window.localStorage.removeItem('jwtToken');
    }
};


function useAuth() {
    const snap = useSnapshot(state);
    console.log('snap',{snap})

    const getAuthStatus = () => !isEmpty(snap.authUser);


  return {
    ...snap,
    ...actions,
    isAuth:getAuthStatus()
  }
}

export default useAuth;