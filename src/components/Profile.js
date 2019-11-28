import React, { useEffect } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";

import * as actions from "../store/actions";
import CustomInput from "./CustomInput";

const Profile = props => {
  useEffect(() => {
    async function getData() {
      await props.setProfile();
      console.log("osuUsername", props.osuUsername);
    }
    getData();
  }, []);

  const onSubmit = async formData => {
    console.log("verify");
    await props.VerifyOsuAccount(formData);
  };

  const { handleSubmit } = props;

  return (
    <div>
      <h2>Profile</h2>
      {!props.osuUsername ? (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <Field
                name="code"
                type="text"
                id="codde"
                label="Enter your verification code"
                placeholder="947fha843"
                component={CustomInput}
              />
            </fieldset>

            {props.errorMessage && (
              <div className="alert alert-danger">{props.errorMessage}</div>
            )}

            <button type="submit" className="btn btn-primary">
              Verify
            </button>
          </form>
        </div>
      ) : (
        <p>{`${props.osuUsername}, you are verified.`}</p>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  osuUsername: state.profile.osuUsername,
  errorMessage: state.profile.errorMessage
});

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "verify" })
)(Profile);
