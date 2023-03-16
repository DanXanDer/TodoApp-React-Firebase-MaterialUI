import { useDispatch, useSelector } from "react-redux";
import {
  onChangeMobileOpenStatus,
  onChangeNavbarHeight,
  onCloseModal,
  onOpenModal,
} from "../store/ui";

export const useUiStore = () => {
  const dispatch = useDispatch();
  const { mobileOpen, navbarHeight, modalOpen } = useSelector(
    (state) => state.uiSlice
  );

  const changeMobileOpenStatus = (mobileOpenStatus) => {
    dispatch(onChangeMobileOpenStatus(mobileOpenStatus));
  };

  const changeNavbarHeight = (navbarHeight) => {
    dispatch(onChangeNavbarHeight(navbarHeight));
  };

  const closeModal = () => {
    dispatch(onCloseModal());
  };

  const openModal = () => {
    dispatch(onOpenModal());
  };

  return {
    //Properties
    mobileOpen,
    navbarHeight,
    modalOpen,

    //Methods
    changeMobileOpenStatus,
    changeNavbarHeight,
    closeModal,
    openModal,
  };
};
