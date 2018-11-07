import * as React from 'react';
import { Redirect } from 'react-router';
import { loggedInTimeOut } from 'businessLogic/constants';
import { UserDetails } from 'businessLogic/model';

interface EnsureLoginProps {
  userDetails: UserDetails;
}
export default class EnsureLogin extends React.Component<EnsureLoginProps, any> {

  constructor(props) {
    super(props);
  }

render() {
  const now = new Date();
  const timeOutMilli = loggedInTimeOut * 60 * 60 * 1000; // time in milliseconds
  if (!this.props.userDetails || !this.props.userDetails.userName || new Date(this.props.userDetails.loggedInTime).getTime() < (now.getTime() - timeOutMilli))
    return <Redirect to='/login' />;
  else return this.props.children;
}
}