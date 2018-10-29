import * as React from 'react';

interface LoginProps {
    userLogin(userName: string, password: string);
}

class Login extends React.Component<LoginProps, any> {

    constructor(props) {
        super(props);
        this.doLogin = this.doLogin.bind(this);
    }

    userNameInput;
    passwordInput;

    render() {
        return (
            <div>
                <h2>Demo Trading Platform</h2>
                <div>
                    <label>user name  </label>
                    <input ref={(input) => this.userNameInput = input} type='text' name='login' />
                </div>
                <div>
                    <label>password  </label>
                    <input ref={(input) => this.passwordInput = input} type='text' name='password' />
                </div>
                <div>
                    <button onClick={this.doLogin}>Login </button>
                </div>
            </div>
        );
    }

    doLogin(e) {
        this.props.userLogin(this.userNameInput.value, this.passwordInput.value);
    }
}


// const mapDispatchToProps = (dispatch) => {
//     return {
//         userLogin: (userName: string, password: string) => dispatch(login(userName))
//     };
// };

// export default connect(null, mapDispatchToProps)(Login);

export default Login;