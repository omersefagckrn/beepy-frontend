import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { connect, ConnectedProps } from 'react-redux';
import zxcvbn from 'zxcvbn';

import { AuthTypes } from '../../@types/pages';
import { authTypes } from '../../@types/reducers';

import { authActions } from '../../actions';
import { RootState } from '../../store';

import AuthLogo from '../../components/Auth/AuthLogo';
import AuthFooter from '../../components/Auth/AuthFooter';
import { Elements } from '../../components';
import { alert, router } from '../../helpers';

const validationSchema = Yup.object({
	name: Yup.string().required('Required'),
	surname: Yup.string().required('Required'),
	email: Yup.string().required('Required').email('Invalid e-mail address!'),
	country: Yup.string().required('Required'),
	password: Yup.string().required('Required').min(8, 'You must enter a minimum of 8 characters.'),
	checkbox: Yup.boolean().oneOf([true], 'You must accept the terms and conditions.')
});

class Register extends React.Component<AuthTypes.RegisterProps & ConnectedProps<typeof connector>, AuthTypes.RegisterStates> {
	state: AuthTypes.RegisterStates = {
		passwordScore: 0
	};

	componentDidMount() {
		this.props.listCountries();
	}

	componentDidUpdate(prevProps: AuthTypes.RegisterProps & ConnectedProps<typeof connector>) {
		if (prevProps.registered !== this.props.registered && !this.props.registered.isLoading) {
			alert.fire({
				message: this.props.registered.error ? (this.props.registered.data as unknown as any).message : 'Registered successfully!',
				error: this.props.registered.error
			});

			if (!this.props.registered.error) this.props.navigate('/verification');
		}
	}

	onSubmit = (values: any) => {
		values.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		this.props.register(values);
	};

	calculatePasswordScore = (password: string) => {
		const result = zxcvbn(password);
		this.setState({ passwordScore: result.score });
	};

	currentYear = new Date().getFullYear();

	render() {
		const { passwordScore } = this.state;

		return (
			<>
				<Helmet>
					<title>Register | Beepy</title>
				</Helmet>
				<div className='w-full flex flex-wrap h-screen'>
					<div className='xxs:hidden md:flex md:w-2/6 flex-col justify-between bg-dark text-white px-8'>
						<div className='flex flex-col justify-center md:justify-start pt-8'>
							<AuthLogo color='light' />
							<div className='p-4 mt-[8rem]'>
								<div className='flex items-center justify-start'>
									<div className='mr-4'>
										<div className='border-primary flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white text-lg'>
											<div className='bg-primary h-2 w-2 rounded-full'></div>
										</div>
									</div>
									<div className='flex flex-col items-start justify-start text-white'>
										<div>Your details</div>
										<div className='flex items-center justify-center font-light break-words'>Please provide your name and email</div>
									</div>
								</div>
								<div className='w-8 inline-flex justify-center items-center'>
									<div className='rounded border-2 border-white bg-white text-white h-[2.875rem]'></div>
								</div>
								<div className='flex items-start justify-start'>
									<div className='mr-4'>
										<div className='flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-lg'>
											<div className='h-2 w-2 rounded-full bg-white'></div>
										</div>
									</div>
									<div className='flex flex-col items-start justify-start text-white'>
										<div>Email Verification</div>
										<div className='flex items-center justify-center font-light'>Verify your e-mail address</div>
									</div>
								</div>
							</div>
						</div>
						<AuthFooter footerType='register' />
					</div>
					<div className='flex w-full flex-col items-center md:w-4/6'>
						<div className='mt-8 flex items-center justify-center'>
							<AuthLogo color='dark' />
						</div>
						<div className='max-w-80 md:max-w-96 xxs:p-3 my-auto mx-auto flex flex-col justify-center pt-8 md:justify-center md:p-0'>
							<div className='text-dark-grey-blue text-[1.875rem] font-semibold'>Create an Account</div>
							<div className='text-bluey-grey py-3 font-light'>Start your 30-day free trial.</div>
							<Formik
								validateOnBlur={false}
								validateOnChange={false}
								initialValues={{ name: '', surname: '', email: '', country: '', password: '', checkbox: false }}
								validationSchema={validationSchema}
								onSubmit={(values) => {
									this.onSubmit(values);
								}}>
								{({ handleSubmit, handleChange, values, errors }) => (
									<>
										<form onSubmit={handleSubmit} className='flex flex-col'>
											<div className='md:flex items-center md:mt-12'>
												<div className='w-full md:w-1/2 flex flex-col'>
													<Elements.InputLabel for='name' label='Name*' />
													<Elements.Input id='name' type='text' placeholder='Name' onChange={handleChange} value={values.name} />
													<Elements.FormErrorText error={errors.name} />
												</div>
												<div className='w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4'>
													<Elements.InputLabel for='surname' label='Surname*' />
													<Elements.Input id='surname' type='text' placeholder='Surname' onChange={handleChange} value={values.surname} />
													<Elements.FormErrorText error={errors.surname} />
												</div>
											</div>
											<div className='flex flex-col pt-5'>
												<Elements.InputLabel for='email' label='Email*' />
												<Elements.Input id='email' type='email' placeholder='Enter your email' onChange={handleChange} value={values.email} />
												<Elements.FormErrorText error={errors.email} />
											</div>
											<div className='flex flex-col pt-5'>
												<Elements.InputLabel for='country' label='Country*' />
												<select onChange={handleChange} value={values.country} id='country' className='text-bluey-grey appearance-none border border-cloudy-blue rounded-lg w-full py-3.5 px-2.5 mt-1 focus:outline-none focus:shadow-outline placeholder:text-bluey-grey'>
													<option disabled>Choose country</option>
													{this.props.countries.data &&
														!this.props.countries.isLoading &&
														!this.props.countries.error &&
														(this.props.countries.data as authTypes.ICountry[]).map((country, index) => {
															return (
																<option key={index} value={country.code}>
																	{country.value}
																</option>
															);
														})}
												</select>
												<Elements.FormErrorText error={errors.country} />
											</div>
											<div className='flex flex-col pt-5'>
												<Elements.InputLabel for='password' label='Password*' />
												<Elements.Input
													id='password'
													type='password'
													placeholder='Password'
													onChange={(e) => {
														this.calculatePasswordScore(e.target.value);
														handleChange(e);
													}}
													value={values.password}
												/>

												<div className='flex my-1.5 -mx-1'>
													{[0, 1, 2, 3].map((i) => {
														return (
															<div key={i} className='w-1/4 px-1'>
																<div className={`h-2 rounded-xl transition-colors ${i < passwordScore ? (passwordScore <= 2 ? 'bg-red-400' : passwordScore <= 3 ? 'bg-yellow-400' : 'bg-green-400') : 'bg-gray-200'}`}></div>
															</div>
														);
													})}
												</div>
												<Elements.FormErrorText error={errors.password} />
												<div className='flex my-1.5 -mx-1'></div>
												<p className='text-sm text-bluey-grey'>Use 8 or more characters with a mix of letters, numbers &amp; symbols.</p>
											</div>
											<div className='flex items-start flex-col justify-between pt-5 text-sm pb-5'>
												<label className='text-slate-blue'>
													<div className='flex items-center justify-start'>
														<Field className='ring-0 focus:ring-0 text-primary' name='checkbox' type='checkbox' />
														<div className='ml-1'>I agree with the</div>
														<Link to='#' className='text-primary ml-1'>
															Terms and conditions.
														</Link>
													</div>
												</label>
												<Elements.FormErrorText error={errors.checkbox} />
											</div>
											<Elements.Button name='Register' type='submit' loading={this.props.registered.isLoading} />
										</form>
									</>
								)}
							</Formik>
							<div className='text-bluey-grey pt-8 pb-8 text-center text-sm'>
								<div className='flex items-center justify-center'>
									Already have an account?
									<Link to='/login' className='text-primary ml-1'>
										Sign in here.
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapState = (state: RootState) => ({
	countries: state.auth.countries,
	registered: state.auth.register
});

const mapDispatch = {
	listCountries: () => authActions.listCountriesAction(),
	register: ({ name, surname, email, country, password, timezone }: authTypes.IRegisterRequest) => authActions.registerAction({ name, surname, email, country, password, timezone })
};

const connector = connect(mapState, mapDispatch);
export default connector(router.withRouter(Register));
