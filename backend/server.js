const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Server is up and running");
});

const otpStorage = {};
// console.log(otpStorage)

const accountSid = "";
const authToken = "";
const twilioClient = new twilio(accountSid, authToken);

app.post("/send-otp", async (req, res) => {
	try {
		const phoneNumber = req.body.phoneNumber;
		const otp = Math.floor(100000 + Math.random() * 900000);

		otpStorage[phoneNumber] = otp;

		console.log(`+91${phoneNumber}`);

		// Replace 'your_twilio_phone_number' with your Twilio phone number
		const message = await twilioClient.messages.create({
			body: `Your OTP is: ${otp}, Send by Shoaib`,
			from: "+15005550006",
			to: `+91${phoneNumber}`,
		});

		res.json({ success: true, message: "OTP sent successfully" });
		// console.log(phoneNumber,otp);
		console.log("OTPStorage", otpStorage);
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Failed to send OTP" });
	}
});

app.post("/verify-otp", (req, res) => {
	try {
		const phoneNumber = req.body.phoneNumber;
		const userEnteredOTP = parseInt(req.body.otp);

		const storedOTP = otpStorage[phoneNumber];

		console.log({
			userEnteredOTP: userEnteredOTP,
			storedOTP: storedOTP,
			phoneNumber: phoneNumber,
		});

		if (userEnteredOTP && storedOTP && userEnteredOTP === storedOTP) {
			res.json({ success: true, message: "OTP verified successfully" });
		} else {
			res.status(401).json({ success: false, message: "Invalid OTP" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Failed to verify OTP" });
	}
});

app.listen(3001, () => {
	console.log("listening on PORT 3001");
});
