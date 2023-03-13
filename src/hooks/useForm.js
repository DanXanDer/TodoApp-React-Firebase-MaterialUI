import { useState } from "react";

export const useForm = (initialForm) => {
  const [formState, setFormState] = useState(initialForm);

  const handleInputChange = ({ target }) => {
    const inputName = target.name;
    const inputValue = target.value;

    setFormState({
      ...formState,
      [inputName]: inputValue,
    });
  };

  return {
    //Propiedades
    formState,
    ...formState,

    //Métodos
    handleInputChange,
  };
};
