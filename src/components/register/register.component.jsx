import React, { useState } from 'react';

const Register = ({ loadUser, onRouteChange }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	const onNameChange = (e) => {
		setName(e.target.value);
	};

	const onEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const onPasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const onSubmitRegister = () => {
		fetch('http://localhost:5000/register', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: name,
				email: email,
				password: password,
			}),
		})
			.then((res) => res.json())
			.then((user) => {
				if (user) {
					loadUser(user);
					onRouteChange('home');
				}
			});
	};

	return (
		<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa4 black-80">
				<div className="measure">
					<fieldset
						id="sign_up"
						className="ba b--transparent ph0 mh0"
					>
						<legend className="f1 fw6 ph0 mh0">Register</legend>
						<div className="mt3">
							<label className="db fw6 lh-copy f6" htmlFor="name">
								Name
							</label>
							<input
								className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
								type="text"
								name="name"
								id="name"
								onChange={onNameChange}
							/>
						</div>
						<div className="mt3">
							<label
								className="db fw6 lh-copy f6"
								htmlFor="email-address"
							>
								Email
							</label>
							<input
								className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
								type="email"
								name="email-address"
								id="email-address"
								onChange={onEmailChange}
							/>
						</div>
						<div className="mv3">
							<label
								className="db fw6 lh-copy f6"
								htmlFor="password"
							>
								Password
							</label>
							<input
								className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
								type="password"
								name="password"
								id="password"
								onChange={onPasswordChange}
							/>
						</div>
					</fieldset>
					<div className="">
						<input
							onClick={onSubmitRegister}
							className="ba ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
							type="submit"
							value="Register"
						/>
					</div>
				</div>
			</main>
		</article>
	);
};

export default Register;
