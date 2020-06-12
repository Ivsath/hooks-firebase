import { useState } from "react";

function useFormValidation(initialState) {
  const [values, setValues] = useState(initialState);

  const handleChange = (event) => {
    event.persist();
    setValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ values });
  };

  return { handleChange, handleSubmit, values };
}

export default useFormValidation;
