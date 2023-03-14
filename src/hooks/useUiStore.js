import { useDispatch, useSelector } from "react-redux";
import { onChangeSubmitStatus } from "../store/ui";

export const useUiStore = () => {
  const dispatch = useDispatch();
  const { submitted, checking } = useSelector((state) => state.uiSlice);

  const changeSubmitStatus = (value) => {
    dispatch(onChangeSubmitStatus(value));
  };

  return {
    //Properties
    submitted,
    checking,

    //Methods
    changeSubmitStatus
  };
};
