import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../store/actions";

const Dashboard = props => {
  useEffect(() => {
    props.getSecret();
  }, []);

  return (
    <div>
      Dashboard Component! The secret: <h3>{props.secret}</h3>
    </div>
  );
};

const mapStateToProps = state => ({
  secret: state.auth.secret
});

export default connect(mapStateToProps, actions)(Dashboard);
