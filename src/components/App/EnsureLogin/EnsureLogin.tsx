import * as React from 'react';
import { Redirect } from 'react-router';

export default function (props) {
  const now = new Date();
  if (!props.userName || props.loggedInTime < (now.getHours() - 2)) return <Redirect to='/login' />;
  else return props.children;
}