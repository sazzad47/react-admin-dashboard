import React, { useEffect } from 'react';
import {
    Row,
    Col,
    CardBody,
    Card,
    Alert,
    Container,
    Input,
    Label,
    Form,
    FormFeedback,
} from 'reactstrap';

// Formik Validation
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// action
import { registerUser, apiError, resetRegisterFlag } from '../../store/actions';

//redux
import { useSelector, useDispatch } from 'react-redux';

import { Link, useHistory } from 'react-router-dom';

const Register = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            email: '',
            first_name: '',
            last_name: '',
            username: '',
            password: '',
            confirm_password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Please Enter Your Email'),
            first_name: Yup.string().required('Please Enter Your First Name'),
            last_name: Yup.string().required('Please Enter Your Last Name'),
            password: Yup.string().required('Please Enter Your Password'),
            confirm_password: Yup.string().when('password', {
                is: val => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref('password')],
                    'Password does not match'
                ),
            }),
        }),
        onSubmit: values => {
            dispatch(registerUser(values));
        },
    });

    const { error, registrationError, success } = useSelector(state => ({
        registrationError: state.Account.registrationError,
        success: state.Account.success,
        error: state.Account.error,
    }));

    useEffect(() => {
        dispatch(apiError(''));
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            setTimeout(() => history.push('login'), 3000);
        }

        setTimeout(() => {
            dispatch(resetRegisterFlag());
        }, 3000);
    }, [dispatch, success, error, history]);

    document.title = 'Sign Up | UD Platform';

    return (
        <React.Fragment>
            <div className='auth-page-content d-flex justify-content-center align-items-center'>
                <Container className='register-main-container'>
                    <Row className='justify-content-center'>
                        <Col md={16} lg={12} xl={10}>
                            <Card className='w-100 mt-4 register-logo-card'>
                                <CardBody className='p-4 d-flex flex-column justify-content-center align-items-center'>
                                    <div className='mt-2 d-flex flex-column justify-content-center align-items-center'>
                                        <div className='register-logo-circle'>
                                            <h5 className='text-primary fw-bold fs-2 text-white'>
                                                LOGO
                                            </h5>
                                        </div>
                                        <h5 className='text-center fw-bold fs-3 mt-4'>
                                            Sign Up
                                        </h5>
                                    </div>
                                    <div className='p-2 mt-4'>
                                        <Form
                                            onSubmit={e => {
                                                e.preventDefault();
                                                validation.handleSubmit();
                                                return false;
                                            }}
                                            className='needs-validation'
                                            action='#'
                                        >
                                            {success && success ? (
                                                <>
                                                    {toast(
                                                        'Your Redirect To Login Page...',
                                                        {
                                                            position:
                                                                'top-right',
                                                            hideProgressBar: false,
                                                            className:
                                                                'bg-success text-white',
                                                            progress: undefined,
                                                            toastId: '',
                                                        }
                                                    )}
                                                    <ToastContainer
                                                        autoClose={2000}
                                                        limit={1}
                                                    />
                                                    <Alert color='success'>
                                                        User registered
                                                        successfully. You will
                                                        now be redirected to the
                                                        Log In page...
                                                    </Alert>
                                                </>
                                            ) : null}

                                            {error && error ? (
                                                <Alert color='danger'>
                                                    <div>
                                                        {/* {registrationError} */}
                                                        Email has been
                                                        registered before.
                                                        Please use another email
                                                        address...{' '}
                                                    </div>
                                                </Alert>
                                            ) : null}

                                            <div className='d-flex gap-3'>
                                                <div className='mb-3'>
                                                    <Input
                                                        name='first_name'
                                                        type='text'
                                                        placeholder='First Name'
                                                        onChange={
                                                            validation.handleChange
                                                        }
                                                        onBlur={
                                                            validation.handleBlur
                                                        }
                                                        value={
                                                            validation.values
                                                                .first_name ||
                                                            ''
                                                        }
                                                        invalid={
                                                            validation.touched
                                                                .first_name &&
                                                            validation.errors
                                                                .first_name
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched
                                                        .first_name &&
                                                    validation.errors
                                                        .first_name ? (
                                                        <FormFeedback type='invalid'>
                                                            <div>
                                                                {
                                                                    validation
                                                                        .errors
                                                                        .first_name
                                                                }
                                                            </div>
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className='mb-3'>
                                                    <Input
                                                        name='last_name'
                                                        type='text'
                                                        placeholder='Enter Last Name'
                                                        onChange={
                                                            validation.handleChange
                                                        }
                                                        onBlur={
                                                            validation.handleBlur
                                                        }
                                                        value={
                                                            validation.values
                                                                .last_name || ''
                                                        }
                                                        invalid={
                                                            validation.touched
                                                                .last_name &&
                                                            validation.errors
                                                                .last_name
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched
                                                        .first_name &&
                                                    validation.errors
                                                        .last_name ? (
                                                        <FormFeedback type='invalid'>
                                                            <div>
                                                                {
                                                                    validation
                                                                        .errors
                                                                        .last_name
                                                                }
                                                            </div>
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                            </div>

                                            <div className='mb-3'>
                                                <Input
                                                    id='email'
                                                    name='email'
                                                    className='form-control'
                                                    placeholder='Email'
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
                                                        validation.errors.email
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {validation.touched.email &&
                                                validation.errors.email ? (
                                                    <FormFeedback type='invalid'>
                                                        <div>
                                                            {
                                                                validation
                                                                    .errors
                                                                    .email
                                                            }
                                                        </div>
                                                    </FormFeedback>
                                                ) : null}
                                            </div>
                                            <div className='d-flex gap-3'>
                                                <div className='mb-2'>
                                                    <Input
                                                        name='password'
                                                        type='password'
                                                        placeholder='Password'
                                                        onChange={
                                                            validation.handleChange
                                                        }
                                                        onBlur={
                                                            validation.handleBlur
                                                        }
                                                        value={
                                                            validation.values
                                                                .password || ''
                                                        }
                                                        invalid={
                                                            validation.touched
                                                                .password &&
                                                            validation.errors
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
                                                            <div>
                                                                {
                                                                    validation
                                                                        .errors
                                                                        .password
                                                                }
                                                            </div>
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className='mb-2'>
                                                    <Input
                                                        name='confirm_password'
                                                        type='password'
                                                        placeholder='Confirm Password'
                                                        onChange={
                                                            validation.handleChange
                                                        }
                                                        onBlur={
                                                            validation.handleBlur
                                                        }
                                                        value={
                                                            validation.values
                                                                .confirm_password ||
                                                            ''
                                                        }
                                                        invalid={
                                                            validation.touched
                                                                .confirm_password &&
                                                            validation.errors
                                                                .confirm_password
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched
                                                        .confirm_password &&
                                                    validation.errors
                                                        .confirm_password ? (
                                                        <FormFeedback type='invalid'>
                                                            <div>
                                                                {
                                                                    validation
                                                                        .errors
                                                                        .confirm_password
                                                                }
                                                            </div>
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className='mb-4'>
                                                <p className='mb-0 fs-12 text-muted fst-italic'>
                                                    By registering you agree to
                                                    our{'  '}
                                                    <Link
                                                        to='#'
                                                        className='text-primary text-decoration-underline fst-normal fw-medium'
                                                    >
                                                        Terms of Use
                                                    </Link>
                                                </p>
                                            </div>

                                            <div className='mt-4 d-flex flex-column justify-content-center align-items-center'>
                                                <button
                                                    color='white'
                                                    className='btn btn-dark w-50'
                                                    type='submit'
                                                >
                                                    Sign Up
                                                </button>
                                            </div>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>

                            <div className='mt-4 text-center'>
                                <p className='mb-0 text-white'>
                                    Already have an account ?{' '}
                                    <Link
                                        to='/login'
                                        className='fw-semibold text-info text-decoration-underline'
                                    >
                                        {' '}
                                        Log In{' '}
                                    </Link>{' '}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Register;
