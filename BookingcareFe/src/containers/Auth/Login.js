import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from '../../store/actions';
// import { KeyCodeUtils, LanguageUtils } from "../utils";
import { KeyCodeUtils, LanguageUtils } from "../../utils";

import userIcon from '../../assets/images/user.svg';
import passIcon from '../../assets/images/pass.svg';
import './Login.scss';

// import adminService from '../services/adminService';
import adminService from '../../services/adminService';
import { handleLoginApi } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.btnLogin = React.createRef();
    }

    initialState = {
        username: '',
        password: '',
        showPassword: false,
        loginError: ''
    }

    state = {
        ...this.initialState
    };

    refresh = () => {
        this.setState({
            ...this.initialState
        })
    }
    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({
            ...this.state,
            [name]: [value]
        })
    }
    onUsernameChange = (e) => {
        this.setState({ username: e.target.value })
    }

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value })
    }

    redirectToSystemPage = () => {
        const { navigate } = this.props;
        const redirectPath = '/system/user-manage';
        navigate(`${redirectPath}`);
    }

    processLogin = () => {
        const { username, password } = this.state;

        const { adminLoginSuccess, adminLoginFail } = this.props;
        let loginBody = {
            username: 'admin',
            password: '123456'
        }
        //sucess
        let adminInfo = {
            "tlid": "0",
            "tlfullname": "Administrator",
            "custype": "A",
            "accessToken": "eyJhbGciOiJIU"
        }

        adminLoginSuccess(adminInfo);
        this.refresh();
        this.redirectToSystemPage();
        try {
            adminService.login(loginBody)
        } catch (e) {
            console.log('error login : ', e)
        }

    }

    handlerKeyDown = (event) => {
        const keyCode = event.which || event.keyCode;
        if (keyCode === KeyCodeUtils.ENTER) {
            event.preventDefault();
            if (!this.btnLogin.current || this.btnLogin.current.disabled) return;
            this.btnLogin.current.click();
        }
    };
    handleShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }
    handleLogin = async () => {
        this.setState({
            loginError: ''
        })
        let { username, password } = this.state;

        try {
            let data = await handleLoginApi(username, password);
            if (data && data.errCode !== 0) {
                this.setState({
                    loginError: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log("login success")
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        loginError: error.response.data.message
                    })
                }
            }
            console.log(error.response);
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handlerKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handlerKeyDown);
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        const { username, password, loginError } = this.state;
        const { lang } = this.props;

        return (
            <div className="login-wrapper">
                <div className="login-container">
                    <div className="form_login">
                        <h2 className="title">
                            Login
                        </h2>
                        <div className="form-group icon-true">
                            <p className='label-title'>Username</p>
                            <img className="icon" src={userIcon} alt="this" />
                            <input
                                placeholder="username"
                                id="username"
                                name="username"
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={this.onUsernameChange}
                            />
                        </div>

                        <div id="phone-input-container" className="form-group icon-true">
                            <p className='label-title'>Password</p>
                            <img className="icon" src={passIcon} alt="this" />
                            <div className='show-password'>
                                <input
                                    placeholder="password"
                                    id="password"
                                    name="password"
                                    type={this.state.showPassword ? "text" : "password"}
                                    className="form-control"
                                    value={password}
                                    onChange={this.onPasswordChange}
                                />
                                <span onClick={this.handleShowPassword}><i className={this.state.showPassword ? "fa fa-eye" : "fa fa-eye-slash"}></i></span>
                            </div>
                        </div>

                        {loginError !== '' && (
                            <div className='login-error'>
                                <span className='login-error-message text-danger'>{loginError}</span>
                            </div>
                        )}

                        <div className="form-group login">
                            <a className='forgotPass' href='#'>Forgot your password?</a>
                            <button onClick={this.handleLogin} className='btn btn-login'>Login</button>
                            <p className='other-signIn'>Or sign in with:</p>
                            <div className='login-social d-flex'>
                                <a> <i className="fab fa-facebook icon-facebook"></i></a>
                                <a> <i className="fab fa-twitter icon-twitter"></i></a>
                                <a> <i className="fab fa-google-plus icon-gg"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
