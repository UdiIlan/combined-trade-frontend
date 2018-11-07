import * as React from 'react';
import { Redirect } from 'react-router';
import { loggedInTimeOut } from 'businessLogic/constants';


export interface EnsureLoginProps {
  userName: string;
  loggedInTime: Date;
}

export default class EnsureLogin extends React.Component<EnsureLoginProps, any> {
  constructor(props) {
    super(props);
  }

render() {
  const now = new Date();
  const timeOutMilli = loggedInTimeOut * 60 * 60 * 1000; // time in milliseconds
  if (!this.props.userName || new Date(this.props.loggedInTime).getTime() < (now.getTime() - timeOutMilli)) return <Redirect to='/login' />;
  else return this.props.children;
}
}