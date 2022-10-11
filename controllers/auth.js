var db = require('../config/database');
const Auth = db.auth;
const Otp = db.otp;

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "byeee";
const otpGenerator = require('otp-generator');


module.exports = {

	createUser: async (req, res) => {

		try {

			const saltRounds = 10;
			const salt = await bcrypt.genSalt(saltRounds);

			const secPass = await bcrypt.hash(req.body.password, salt)

			// Create a new admin
			let admin = await Auth.findOne({ where: { phoneNumber: req.body.phoneNumber } });

			if (!admin) {
			admin = await Auth.create({
				phoneNumber: req.body.phoneNumber,
				password: secPass
			});
		}

			const data = {
				admin: {
					id: admin.id
				}
			}
			// res.json(user)
			const token = jwt.sign(data, JWT_SECRET);
			success = true;
			return res.status(200).json({
				success: 1,
				authtoken: token,
				data: admin
			});

		} catch (error) {
			console.error(error.message);
			return res.status(500).json({
				success: 0,
				error: "Internal Server Error"
			});
		}

	},

	number: async (req, res) => {
		const user = await Auth.findOne({
			phoneNumber: req.body.phoneNumber,
		});

		if (!user) {
			return res.status(400).json({
				success: 0,
				error: "Enter valid number"
			});
		}

		const OTP = otpGenerator.generate(6, { digits: true, alphabets: false, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
		const phoneNumber = req.body.phoneNumber;
		console.log({ "otp": OTP });

		//const response = fast2sms.sendMessage({
		//	authorization: API_KEY, 
		//	message: OTP,
		//	numbers: [phoneNumber]

		//});
		//res.send(response);
		//console.log(response);


		const otp = new Otp({
			phoneNumber: phoneNumber,
			otp: OTP
		});



		const salt = await bcrypt.genSalt(10);
		otp.otp = await bcrypt.hash(otp.otp, salt);

		const result = await otp.save();
		return res.status(200).json({
			success: 1,
			message: "OTP send Succesfully",
			otp: OTP
		});
	},

	verifyOtp: async (req, res) => {
		const otpHolder = await Otp.findOne({
			where: { phoneNumber: req.body.phoneNumber }
		});

		console.log(otpHolder.otp);
		const smsOtp = otpHolder.otp;

		if (smsOtp.length === 0)
			return res.status(400).json({
				success: 0,
				error: "You use an Expired otp"
			});


		const validUser = await bcrypt.compare(req.body.otp, smsOtp);

		if (otpHolder.phoneNumber === req.body.phoneNumber && validUser) {

			const OTPdelete = await Otp.destroy({
				where: {
					phoneNumber: otpHolder.phoneNumber
				}
			});
			return res.status(200).json({
				success: 0,
				message: "Otp matched"
			});

		}

	},

	updatePassword: async (req, res) => {
		const  phoneNumber  = req.params.phoneNumber;
		

		const saltRounds = 10;
			const salt = await bcrypt.genSalt(saltRounds);

			const secPass = await bcrypt.hash(req.body.password, salt);

		const data = await Auth.findAll({where: {phoneNumber}});

            if (data == null) {
                console.log('Not found!');
                return res.json({
                    error: "Please verify correct phone number"
                });
            }
                        
            const results = await Auth.update({
                password: secPass 
            }, {
                where: {
                    phoneNumber: req.params.phoneNumber
                }
            });
                return res.json({
                    data: results,
                    message: "Password updated successfully",
					phoneNumber: phoneNumber,
					password: secPass
                });

	},

	userData: async (req, res) => {
		const id = req.admin.id;
		console.log(req.admin.id);
		const admin = await Auth.findByPk(id);
		if (admin === null) {
			console.log('Not found!');
		} else {
			console.log(admin instanceof Auth); // true
			res.send(admin)
			// Its primary key is 123
		}


	}
}