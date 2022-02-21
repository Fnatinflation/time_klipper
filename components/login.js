import React, { useState } from 'react';
import { firebase, auth } from '../firebase';

const Login = () => {
	// Inputs
	const [mynumber, setnumber] = useState("");
	const [otp, setotp] = useState('');
	const [show, setshow] = useState(false);
	const [final, setfinal] = useState('');

	// Sent OTP
	const signin = () => {

		if (mynumber === "" || mynumber.length < 10) return;

		let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
		auth.signInWithPhoneNumber(mynumber, verify).then((result) => {
			setfinal(result);
			alert("code sent")
			setshow(true);
		})
			.catch((err) => {
				alert(err);
				window.location.reload()
			});
	}

	// Validate OTP
	const ValidateOtp = () => {
		if (otp === null || final === null)
			return;
		final.confirm(otp).then((result) => {
			// success
		}).catch((err) => {
			alert("Wrong code");
		})
	}

	return (
		<div style={{ "marginTop": "200px" }}>
			<center>
				<div style={{ display: !show ? "block" : "none" }}>
					<h1>TimeKlipper</h1>
					<input value={mynumber} onChange={(e) => {
					setnumber(e.target.value) }}
						placeholder="+4588888888" />
					<br /><br />
					<div id="recaptcha-container"></div>
					<button onClick={signin}>Send SMS</button>
				</div>
				<div style={{ display: show ? "block" : "none" }}>
					<input type="text" placeholder={"Sms kode .."}
						onChange={(e) => { setotp(e.target.value) }}></input>
					<br /><br />
					<button onClick={ValidateOtp}>Bekræft</button>
				</div>
			</center>
		</div>
	);
}

export default Login;