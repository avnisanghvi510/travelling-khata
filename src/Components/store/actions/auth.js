import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, id) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    id: id,
  };
};
export const signUpSuccess = () => {
  return {
    type: actionTypes.AUTH_SIGNUP,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("id");

  console.log("LOGOUT", localStorage.getItem("token"));

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 10000);
  };
};

export const afterSignUp = () => {
  console.log("LOGOUT", localStorage.getItem("token"));
  return {
    type: actionTypes.AFTER_SIGNUP,
  };
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/auth/token/", {
        username: username,
        password: password,
        grant_type : 'password',
        client_id : '3U3kQW0eLf5hL2txTlKn6veI8h18V8DZ8hCVhWwc',
        client_secret : 'l8WijyuNj8rmGvjOAm0UeZXwm2Pyoy0zMrho3OlNYd08Qw8zdEqijZovVujACriaxTCOUyJ34KBdTK0PkDZ3hj6PH2FiTxmIicjXXtNxVfaQhKvAEev6fbWhxy4WOm3P'
      })
      .then((res) => {
        console.log(res)
        const token = res.data.access_token;
        localStorage.setItem('token',res.data.access_token)
        localStorage.setItem('refresh_token',res.data.refresh_token)
        // const id = res.data.id;
        // console.log(token)
        const expirationDate = new Date(new Date().getTime() + 3600 * 10000);
        // localStorage.setItem("id", id);
        // localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        // dispatch(authSuccess(token, id));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

// Facebook Login
export const facebookLogin = (accessToken) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/auth/convert-token/", {
        token : accessToken,
        backend : 'facebook',
        grant_type : 'convert_token',
        client_id : 'UpBHtcm39s41tLlBIcS6SA7vJnDYRhIHOvlnX7ho',
        client_secret : 'jqDx8Of6lmYfVmk0vHW2YNYZ4azRDknD5RQ112QDLpFAUtRtVEtm4mwoggJLKFNFCkk7Q7jRX7yWKHDVaP6qE0KZsP4njz5QOOa8gAVU7yDPY2EpjEUMzrAmXJtC9e3O'
      })
      .then((res) => {
        console.log(res)
        const token = res.data.access_token;
        localStorage.setItem('token',res.data.access_token)
        localStorage.setItem('refresh_token',res.data.refresh_token)
        // const id = res.data.id;
        // console.log(token)
        const expirationDate = new Date(new Date().getTime() + 3600 * 10000);
        // localStorage.setItem("id", id);
        // localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        // dispatch(authSuccess(token, id));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};
// Facebook Login
export const googleLogin = (accessToken) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/auth/convert-token/", {
        token : accessToken,
        backend : 'google-oauth2',
        grant_type : 'convert_token',
        client_id : '3U3kQW0eLf5hL2txTlKn6veI8h18V8DZ8hCVhWwc',
        client_secret : 'l8WijyuNj8rmGvjOAm0UeZXwm2Pyoy0zMrho3OlNYd08Qw8zdEqijZovVujACriaxTCOUyJ34KBdTK0PkDZ3hj6PH2FiTxmIicjXXtNxVfaQhKvAEev6fbWhxy4WOm3P'
      })
      .then((res) => {
        console.log(res)
        const token = res.data.access_token;
        localStorage.setItem('token',res.data.access_token)
        localStorage.setItem('refresh_token',res.data.refresh_token)
        // const id = res.data.id;
        // console.log(token)
        const expirationDate = new Date(new Date().getTime() + 3600 * 10000);
        // localStorage.setItem("id", id);
        // localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        // dispatch(authSuccess(token, id));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (username, email, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/rest_auth/registration/", {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
      })
      .then((res) => {
        dispatch(signUpSuccess());
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    console.log("sajbks", token);
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
