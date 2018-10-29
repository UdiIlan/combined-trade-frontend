import * as React from 'react';
import InputText from '../common/core/InputText';
import Button from '../common/core/Button';
import { FormLabel } from '@material-ui/core';
const styles = require('./styles.scss');

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
            <div className={styles.required}>
                <div>
                    <FormLabel>user name  </FormLabel>
                    <InputText ref={(input) => this.userNameInput = input} type='text' name='login' />
                </div>
                <div>
                    <FormLabel>password  </FormLabel>
                    <InputText ref={(input) => this.passwordInput = input} type='text' name='password' />
                </div>
                <div>
                    <Button onClick={this.doLogin}>Login </Button>
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