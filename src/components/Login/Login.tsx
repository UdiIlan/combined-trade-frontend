import * as React from 'react';

class Login extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = { userName: '' };

        this.doLogin = this.doLogin.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Demo Trading Platform</h2>
                <div>
                    <label>user name  </label>
                    <input type='text' name='login' onChange={(e) => this.setState({userName: e.target.value})} />
                </div>
                <div>
                    <label>password  </label>
                    <input type='text' name='password' />
                </div>
                <div>
                    <button onClick={this.doLogin}>Login </button>
                </div>
            </div>
        );
    }

    doLogin(e) {
        this.props.userLogin(this.state.userName);
    }
}

export default Login;