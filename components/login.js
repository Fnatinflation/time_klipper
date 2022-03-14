import React, { useState } from 'react';
import { firebase, auth } from '../firebase';
import { signInWithGoogle } from '../firebase';
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
					{/* <input value={mynumber} onChange={(e) => {
						setnumber(e.target.value)
					}}
						placeholder="+4588888888" />
					<br /><br />
					<div id="recaptcha-container"></div>
					<button onClick={signin}>Send SMS</button>
				</div>
				<div style={{ display: show ? "block" : "none" }}>
					<input type="text" placeholder={"Sms kode .."}
						onChange={(e) => { setotp(e.target.value) }}></input>
					<br /><br />
					<button onClick={ValidateOtp}>Bekræft</button> */}
					 <button className="button" style={{background:"#4285f4",color:"white",border:"none",width:"110px",height:"40px",borderRadius:"3%"}} onClick={signInWithGoogle}><i className="fab fa-google"></i>Google</button>
				</div>
			</center>
		</div>
	);
}

export default Login;
