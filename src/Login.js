import axios from "axios";
import React, { useState } from "react";




const Login = () => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [otp, setOtp] = useState("");
	const [message, setMessage] = useState("");

	const [enterOtp, setEnterOtp] = useState(false);

	const sendOtp = async () => {
		try {
			const response = await axios.post("http://localhost:3001/send-otp", {
				phoneNumber: phoneNumber,
			});
			setMessage(response.data.message);
			setEnterOtp(true);
		} catch (error) {
			console.error(error);
			setMessage("Failed to send OTP");
		}
	};

	const verifyOtp = async () => {
		try {
			const response = await axios.post("http://localhost:3001/verify-otp", {
				otp: otp,
				phoneNumber: phoneNumber
			});
			setMessage(response.data.message);
		} catch (error) {
			console.error(error);
			setMessage("Invalid OTP");
		}
	};

	return (
		<div>
			{!enterOtp ? (
				<div className="flex flex-col w-[500px] shadow-lg rounded-lg p-5 mx-auto mt-20 items-center">
					<h1 className="text-2xl my-5">Login Via OTP</h1>
					<input
						className="border border-black rounded-md p-3 w-[220px]"
						type="text"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>
					<button
						onClick={sendOtp}
						className="mt-5 bg-slate-300 px-3 py-1 rounded-md"
					>
						Send OTP
					</button>
				</div>
			) : (
				<div className="flex flex-col w-[500px] shadow-lg rounded-lg p-5 mx-auto mt-20 items-center">
					<h1 className="text-2xl my-5">Login Via OTP</h1>
					<input
						className="border border-black rounded-md p-3 w-[220px]"
						type="text"
						value={otp}
						onChange={(e) => setOtp(e.target.value)}
					/>
					<button
						onClick={verifyOtp}
						className="mt-5 bg-slate-300 px-3 py-1 rounded-md"
					>
						Verify OTP
					</button>
				</div>
			)}
		</div>
	);
};

export default Login;
