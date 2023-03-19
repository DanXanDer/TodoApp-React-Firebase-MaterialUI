import { useDispatch, useSelector } from "react-redux";
import { FireBaseAuth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import {
  onChangeSubmitStatus,
  onCheckingAuth,
  onCheckingForm,
  onErrorMsg,
  onLogin,
  onLogout,
} from "../store/auth";
import { useEffect } from "react";

const providerGoogle = new GoogleAuthProvider();

export const useAuthStore = () => {
  const { submitted, checkingForm, errorMsg, user, status } = useSelector(
    (state) => state.authSlice
  );

  const dispatch = useDispatch();

  const changeSubmitStatus = (value) => {
    dispatch(onChangeSubmitStatus(value));
  };

  const cleanErrorMsg = () => {
    const error = "";
    dispatch(onErrorMsg(error));
  };

  //TODO: User register
  const startRegisterWithEmailAndPassword = async ({
    displayName,
    email,
    password,
  }) => {
    try {
      dispatch(onCheckingForm(true));

      await createUserWithEmailAndPassword(FireBaseAuth, email, password);

      updateProfile(FireBaseAuth.currentUser, {
        displayName,
      });

      dispatch(onCheckingForm(false));

      return {
        ok: true,
      };
    } catch (error) {
      dispatch(onErrorMsg(error.message));
      return {
        ok: false,
      };
    }
  };

  const startLoginWithEmailAndPassword = async ({ email, password }) => {
    try {
      dispatch(onCheckingAuth());

      const { user } = await signInWithEmailAndPassword(
        FireBaseAuth,
        email,
        password
      );

      const { displayName, uid } = user;

      dispatch(onLogin({ displayName, email, uid }));

      return {
        ok: true,
      };
    } catch (error) {
      dispatch(onLogout()); //Si falla el login, se reinician todos los estados del auth

      return {
        ok: false,
      };
    }
  };

  const startLoginWithGoogle = async () => {
    try {
      dispatch(onCheckingAuth());
      const { user } = await signInWithPopup(FireBaseAuth, providerGoogle);
      const { displayName, uid, email } = user;
      dispatch(onLogin({ displayName, uid, email }));
    } catch (error) {
      dispatch(onLogout());
    }
  };

  const startLogout = async () => {
    try {
      await signOut(FireBaseAuth);
      dispatch(onLogout());
    } catch (error) {
      console.log(error.message);
    }
  };

  return {
    //Properties
    submitted,
    checkingForm,
    errorMsg,
    user,
    status,
    ...user,

    //Methdods
    changeSubmitStatus,
    startLogout,
    startRegisterWithEmailAndPassword,
    cleanErrorMsg,
    startLoginWithEmailAndPassword,
    startLoginWithGoogle,
  };
};
