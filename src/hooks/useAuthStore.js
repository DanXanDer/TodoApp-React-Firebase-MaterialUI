import { useDispatch, useSelector } from "react-redux";
import {
  onChangeSubmitStatus,
  onCheckingAuth,
  onCheckingForm,
  onErrorMsg,
  onLogin,
} from "../store/auth";

export const useAuthStore = () => {
  const { submitted, checkingForm, errorMsg } = useSelector(
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
  const startRegister = async ({ user, email, password }) => {
    try {
      dispatch(onCheckingForm(true));
      // await...
      dispatch(onCheckingForm(false));
    } catch (error) {
      dispatch(onErrorMsg(error.message));
    }
  };

  const startLogin = async ({ email, password }) => {
    try {
      dispatch(onCheckingAuth());
      //await... Agregar id
      dispatch(onLogin({ name, email, uid }));
    } catch (error) {
      dispatch(onErrorMsg(error.message));
    }
  };

  return {
    //Properties
    submitted,
    checkingForm,
    errorMsg,

    //Methdods
    changeSubmitStatus,
    startRegister,
    cleanErrorMsg,
    startLogin,
  };
};
