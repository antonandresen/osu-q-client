import React from 'react';
import { connect } from 'react-redux';

const authGuard = OriginalComponent => {
  class MixedComponent extends React.Component {
    componentDidMount() {
      if (this.props.isAuth && this.props.jwtToken) {
        console.log('All is good, user allowed!');
      } else {
        console.log('user not authenticated');
        this.props.history.push('/signin');
      }
    }

    componentDidUpdate() {
      if (this.props.isAuth && this.props.jwtToken) {
        console.log('All is good, user allowed!');
      } else {
        console.log('user not authenticated');
        this.props.history.push('/signin');
      }
    }

    render() {
      return <OriginalComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    isAuth: state.auth.isAuthenticated,
    jwtToken: state.auth.token,
  });

  return connect(mapStateToProps)(MixedComponent);
};

export default authGuard;
