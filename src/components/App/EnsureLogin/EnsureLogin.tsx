import * as React from 'react';
import { Redirect } from 'react-router';

export default function (props) {
  if (!props.userName) return <Redirect to='/login' />;
  else return props.children;
}