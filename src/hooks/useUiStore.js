import { useDispatch, useSelector } from "react-redux";
import { onChangeMobileOpenStatus, onChangeSubmitStatus } from "../store/ui";

export const useUiStore = () => {
  const dispatch = useDispatch();
  const { submitted, checking, mobileOpen } = useSelector(
    (state) => state.uiSlice
  );

  const changeSubmitStatus = (value) => {
    dispatch(onChangeSubmitStatus(value));
  };

  const changeMobileOpenStatus = (mobileOpenStatus) => {
    dispatch(onChangeMobileOpenStatus(mobileOpenStatus));
  };

  return {
    //Properties
    submitted,
    checking,
    mobileOpen,

    //Methods
    changeSubmitStatus,
    changeMobileOpenStatus,
  };
};
