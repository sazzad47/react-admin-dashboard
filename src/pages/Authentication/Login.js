import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import {
    Card,
    CardBody,
    Col,
    Container,
    Input,
    Label,
    Row,
    Button,
    Form,
    FormFeedback,
    Alert,
} from 'reactstrap';
import ParticlesAuth from '../AuthenticationInner/ParticlesAuth';

//redux
import { useSelector, useDispatch } from 'react-redux';

import { withRouter, Link } from 'react-router-dom';

// Formik validation
import * as Yup from 'yup';
import { useFormik } from 'formik';

//Social Media Imports
// import { GoogleLogin } from 'react-google-login';
// import TwitterLogin from "react-twitter-auth"
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

// actions
import { loginUser, socialLogin, resetLoginFlag } from '../../store/actions';

import logoLight from '../../assets/images/logo-light.png';
//Import config
import { facebook, google } from '../../config';

//import images
import meshcurrent from '../../assets/images/blue-mesh-current.jpg';
import hexagonwindows from '../../assets/images/hexagon-windows.jpg';
import connectedcubes from '../../assets/images/connected-cubes.jpg';

const Login = props => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => ({
        user: state.Account.user,
    }));

    const [userLogin, setUserLogin] = useState([]);

    // Random background temporary trick
    useEffect(() => {
        const bgImages = [meshcurrent, hexagonwindows, connectedcubes];

        // const bgImages = [
        //     '/static/media/blue-mesh-current.82a3ad45e8b3c936f298.jpg',
        //     '/static/media/hexagon-windows.c00c333c0ebfcaab7f9e.jpg',
        //     '/static/media/connected-cubes.850a930f7a58248e099d.jpg',
        // ];

        const myElement = $('.auth-one-bg');
        // console.log(myElement);

        $('.auth-one-bg').css({
            background:
                'url(' +
                bgImages[Math.floor(Math.random() * bgImages.length)] +
                ')',
            'background-position': 'center',
            'background-size': 'cover',
        });
    });

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            email: userLogin.email || 'admin@themesbrand.com' || '',
            password: userLogin.password || '123456' || '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Please Enter Your Email'),
            password: Yup.string().required('Please Enter Your Password'),
        }),
        onSubmit: values => {
            dispatch(loginUser(values, props.history));
        },
    });

    const { error } = useSelector(state => ({
        error: state.Login.error,
    }));

    const signIn = (res, type) => {
        if (type === 'google' && res) {
            const postData = {
                name: res.profileObj.name,
                email: res.profileObj.email,
                token: res.tokenObj.access_token,
                idToken: res.tokenId,
            };
            dispatch(socialLogin(postData, props.history, type));
        } else if (type === 'facebook' && res) {
            const postData = {
                name: res.name,
                email: res.email,
                token: res.accessToken,
                idToken: res.tokenId,
            };
            dispatch(socialLogin(postData, props.history, type));
        }
    };

    //handleGoogleLoginResponse
    // const googleResponse = response => {
    //     signIn(response, 'google');
    // };

    //handleTwitterLoginResponse
    // const twitterResponse = e => {}

    //handleFacebookLoginResponse
    // const facebookResponse = response => {
    //     signIn(response, 'facebook');
    // };

    useEffect(() => {
        setTimeout(() => {
            dispatch(resetLoginFlag());
        }, 3000);
    }, [dispatch, error]);

    document.title = 'Sign In | UD Platform';

    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className='auth-page-content'>
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className='text-center mt-sm-5 d-flex flex-column justify-content-center align-items-center'>
                                    {/* <div className='login-logo-circle'> */}
                                    <h5 className='text-primary fw-bold fs-3 text-white'>
                                        UD PLATFORM
                                    </h5>
                                    {/* </div> */}
                                    {/* <p className='text-center fw-bold fs-3 mt-3'>
                                    Log In
                                </p> */}
                                    <p className='mt-3 fs-15 fw-medium'>
                                        Platform for Data in Motion
                                    </p>
                                </div>
                            </Col>
                        </Row>

                        <Row className='justify-content-center'>
                            <Col md={8} lg={6} xl={5}>
                                <Card className='mt-4'>
                                    <CardBody className='p-4'>
                                        <div className='text-center mt-2'>
                                            <h5 className='text-primary'>
                                                Welcome Back !
                                            </h5>
                                            <p className='text-muted'>
                                                Sign in to continue to the UD
                                                Platform.
                                            </p>
                                        </div>
                                        {error && error ? (
                                            <Alert color='danger'>
                                                {' '}
                                                {error}{' '}
                                            </Alert>
                                        ) : null}
                                        <div className='p-2 mt-4'>
                                            <Form
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                                action='#'
                                            >
                                                <div className='mb-3'>
                                                    <Label
                                                        htmlFor='email'
                                                        className='form-label'
                                                    >
                                                        Email
                                                    </Label>
                                                    <Input
                                                        name='email'
                                                        className='form-control'
                                                        placeholder='Enter email'
                                                        type='email'
                                                        onChange={
                                                            validation.handleChange
                                                        }
                                                        onBlur={
                                                            validation.handleBlur
                                                        }
                                                        value={
                                                            validation.values
                                                                .email || ''
                                                        }
                                                        invalid={
                                                            validation.touched
                                                                .email &&
                                                            validation.errors
                                                                .email
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.email &&
                                                    validation.errors.email ? (
                                                        <FormFeedback type='invalid'>
                                                            {
                                                                validation
                                                                    .errors
                                                                    .email
                                                            }
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className='mb-3'>
                                                    <div className='float-end'>
                                                        <Link
                                                            to='/forgot-password'
                                                            className='text-muted'
                                                        >
                                                            Forgot password?
                                                        </Link>
                                                    </div>
                                                    <Label
                                                        className='form-label'
                                                        htmlFor='password-input'
                                                    >
                                                        Password
                                                    </Label>
                                                    <div className='position-relative auth-pass-inputgroup mb-3'>
                                                        <Input
                                                            name='password'
                                                            value={
                                                                validation
                                                                    .values
                                                                    .password ||
                                                                ''
                                                            }
                                                            type='password'
                                                            className='form-control pe-5'
                                                            placeholder='Enter Password'
                                                            onChange={
                                                                validation.handleChange
                                                            }
                                                            onBlur={
                                                                validation.handleBlur
                                                            }
                                                            invalid={
                                                                validation
                                                                    .touched
                                                                    .password &&
                                                                validation
                                                                    .errors
                                                                    .password
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {validation.touched
                                                            .password &&
                                                        validation.errors
                                                            .password ? (
                                                            <FormFeedback type='invalid'>
                                                                {
                                                                    validation
                                                                        .errors
                                                                        .password
                                                                }
                                                            </FormFeedback>
                                                        ) : null}
                                                        <button
                                                            className='btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted'
                                                            type='button'
                                                            id='password-addon'
                                                        >
                                                            <i className='ri-eye-fill align-middle'></i>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className='form-check'>
                                                    <Input
                                                        className='form-check-input'
                                                        type='checkbox'
                                                        value=''
                                                        id='auth-remember-check'
                                                    />
                                                    <Label
                                                        className='form-check-label'
                                                        htmlFor='auth-remember-check'
                                                    >
                                                        Remember me
                                                    </Label>
                                                </div>

                                                <div className='mt-4'>
                                                    <Button
                                                        color='success'
                                                        className='btn btn-success w-100'
                                                        type='submit'
                                                    >
                                                        Sign In
                                                    </Button>
                                                </div>
                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>

                                <div className='mt-4 text-center'>
                                    <p className='mb-0'>
                                        Don't have an account ?{' '}
                                        <Link
                                            to='/register'
                                            className='fw-semibold text-primary text-decoration-underline'
                                        >
                                            {' '}
                                            Sign up{' '}
                                        </Link>{' '}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default withRouter(Login);
