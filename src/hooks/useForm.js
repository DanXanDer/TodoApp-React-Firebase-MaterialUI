import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formErrors = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidator, setFormValidator] = useState({});

  useEffect(() => {
    validateForm();
  }, [formState]);

  useEffect(() => {}, [formValidator]);

  const handleInputChange = ({ target }) => {
    const inputName = target.name;
    const inputValue = target.value;

    setFormState({
      ...formState,
      [inputName]: inputValue,
    });
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

  return {
    //Propiedades
    ...formState,
    ...formValidator,
    formState,
    formValid,

    //Métodos
    handleInputChange,
  };
};
