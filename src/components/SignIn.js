import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

import * as actions from "../store/actions";
import CustomInput from "./CustomInput";

const SignIn = props => {
  const onSubmit = async formData => {
    await props.SignIn(formData);
    if (!props.errorMessage) {
      props.history.push("/dashboard");
    }
  };

  const responseGoogle = async res => {
    await props.oauthGoogle(res.accessToken);
    if (!props.errorMessage) {
      props.history.push("/dashboard");
    }
  };

  const responseFacebook = async res => {
    await props.oauthFacebook(res.accessToken);
    if (!props.errorMessage) {
      props.history.push("/dashboard");
    }
  };

  const { handleSubmit } = props;

  return (
    <div className="row">
      {/* Left side */}
      <div className="col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <Field
              name="email"
              type="text"
              id="email"
              label="Enter your email"
              placeholder="example@example.com"
              component={CustomInput}
            />
          </fieldset>

          <fieldset>
            <Field
              name="password"
              type="password"
              id="password"
              label="Enter your password"
              placeholder="yourpassword123"
              component={CustomInput}
            />
          </fieldset>

          {props.errorMessage && (
            <div className="alert alert-danger">{props.errorMessage}</div>
          )}

          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage
});

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "signin" })
)(SignIn);
