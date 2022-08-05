import React, { useReducer } from "react";
import { createContext } from "react";
import jwtDecode from 'jwt-decode';

const defaultState = {
  user: null
}

if (localStorage.getItem('jwtToken')) {
  const token = localStorage.getItem('jwtToken');
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    defaultState.user = decodedToken;
  }
}

const AuthContext = createContext()

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return ({
        ...state,
        user: action.payload
      })
    case 'LOGOUT':
      return ({
        ...state,
        user: null
      })
    default:
      return state;
  }
}

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, defaultState);

  function login(userData) {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData
    })
  }

  function logout() {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: 'LOGOUT'
    })
  }

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />
  )
}

export { AuthContext, AuthProvider };

