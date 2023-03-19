import { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "./useAuthStore";

export const useForm = ({ initialForm = {}, formErrors = {} }) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidator, setFormValidator] = useState({});
  const { errorMsg, cleanErrorMsg, submitted } = useAuthStore();

  useEffect(() => {
    if (errorMsg !== undefined) {
      cleanErrorMsg();
    }
    if (submitted === true) {
      validateForm();
    }
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const handleInputChange = ({ target }) => {
    const inputName = target.name;
    const inputValue = target.value;

    setFormState({
      ...formState,
      [inputName]: inputValue,
    });
  };

  const handleDateChange = (newValue, dataName) => {
    setFormState({
      ...formState,
      [dataName]: newValue,
    });
  };

  const handleFormReset = (cleanedForm) => {
    setFormState(cleanedForm);
  };

  const validateForm = () => {
    const formCheck = {};
    for (const formValue of Object.keys(formErrors)) {
      const [fn, errorMsg] = formErrors[formValue];

      if (fn(formState[formValue]) === false) {
        formCheck[`${formValue}Validation`] = errorMsg;
      } else {
        formCheck[`${formValue}Validation`] = null;
      }
    }

    setFormValidator({ ...formCheck });
  };

  const formValid = useMemo(() => {
    for (const formValue of Object.keys(formValidator)) {
      if (formValidator[formValue] !== null) return false;
    }
    return true;
  }, [formValidator]);

  const handleCheckEmptyForm = () => {
    for (const formValue of Object.keys(formState)) {
      if (formState[formValue] === "") {
        return true;
      }
    }
    return false;
  };

  return {
    //Propiedades
    ...formState,
    ...formValidator,
    formState,
    formValid,

    //Métodos
    handleInputChange,
    handleFormReset,
    handleDateChange,
    handleCheckEmptyForm,
  };
};
