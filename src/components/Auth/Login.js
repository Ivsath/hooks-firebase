import React, { useState } from "react";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import firebase from "../../firebase";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

function Login(props) {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    isSubmitting,
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
  const [login, setLogin] = useState(true);
  const [firebaseError, setFirebaseError] = useState(null);

  async function authenticateUser() {
    const { name, email, password } = values;
    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
    } catch (err) {
      console.log("Authentication Error", err);
      setFirebaseError(err.message);
    }
  }

  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
        {!login && (
          <input
            type="text"
            name="name"
            placeholder="Your name"
            autoComplete="off"
            value={values.name}
            onChange={handleChange}
          />
        )}
        <input
          type="email"
          name="email"
          className={errors.email && "error-input"}
          placeholder="Your email"
          autoComplete="off"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          type="password"
          name="password"
          className={errors.password && "error-input"}
          placeholder="Choose a secure password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {firebaseError && <p className="error-text">{firebaseError}</p>}
        <div className="flex mt3">
          <button
            type="submit"
            className="button pointer mr2"
            disabled={isSubmitting}
            style={{ background: isSubmitting ? "grey" : "orange" }}
          >
            Submit
          </button>
          <button
            type="button"
            className="pointer button"
            onClick={() => setLogin((prevLogin) => !prevLogin)}
          >
            {login ? "Need to create an account?" : "Already have an account?"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
