import { useDispatch, useSelector } from "react-redux";
import { onChangeMobileOpenStatus, onChangeSubmitStatus, onChangeNavbarHeight } from "../store/ui";

export const useUiStore = () => {
  const dispatch = useDispatch();
  const { submitted, checking, mobileOpen, navbarHeight } = useSelector(
    (state) => state.uiSlice
  );

  const changeSubmitStatus = (value) => {
    dispatch(onChangeSubmitStatus(value));
  };

  const changeMobileOpenStatus = (mobileOpenStatus) => {
    dispatch(onChangeMobileOpenStatus(mobileOpenStatus));
  };

  const changeNavbarHeight = (navbarHeight) => {
    dispatch(onChangeNavbarHeight(navbarHeight))
  }

  return {
    //Properties
    submitted,
    checking,
    mobileOpen,
    navbarHeight,

    //Methods
    changeSubmitStatus,
    changeMobileOpenStatus,
    changeNavbarHeight
  };
};
