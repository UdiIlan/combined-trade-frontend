import * as React from 'react';
import InputText from '../common/core/InputText';
import Dialog from 'components/common/modals/Dialog';
import Button from '../common/core/Button';
import { FormLabel } from '@material-ui/core';
const styles = require('./styles.scss');

interface LoginProps {
    wrongUserDetails: boolean;
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
            <div className={styles.backgroundLogin}>
                 <Dialog title='Login' okBtnText='Login' open={true} cancelBtnHidden={true}
                onOkClick={() => this.doLogin()}>
                <div className={styles.loginDialogContent} >
                    <InputText className={styles.userInput} ref={(input) => this.userNameInput = input } label='user name' type='text' name='login' />
                    <InputText className={styles.userInput}  ref={(input) => this.passwordInput = input} label='password' type='password' name='password' />
                    {(this.props.wrongUserDetails ) ? <div className={styles.invalidLogin}> * Wrong login details - Please try again </div> : <div /> }
                </div>
                </Dialog>
            </div>
        );
    }

    doLogin() {
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