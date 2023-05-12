const { transporter } = require("../helper");
const db = require("../models");
const user_logins = db.user_logins;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


module.exports = {
    userRegis: async (req, res) => {
        try {

            const { email, username, password } = req.body;

            const emailIsExist = await user_logins.findOne({
                where: {
                    email
                }
            });

            const usernameIsExist = await user_logins.findOne({
                where: {
                    username
                }
            });

            if (emailIsExist && usernameIsExist) {
                throw {
                    status: "both",
                    message: "someone already used both of it",
                }
            } else if (usernameIsExist) {
                throw {
                    status: "username",
                    message: "username already used",
                }
            } else if ( emailIsExist ) {
                throw {
                    status: "email",
                    message: "email already used"
                }
            }

            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password, salt);
            const result = await user_logins.create({
                email,
                username,
                password: hashPass,
                is_verified: false
            });

            const payload = { id: result.id, email: result.email }
            const token = jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: "5m" })

            const url = `http://localhost:5000/auth/verified/${token}`

            await transporter.sendMail({
                from: "admin <inuiro1@gmail.com>",
                to: result.email,
                subject: "activate account",
                html: `<h1>click this link to verified: <a href= "${url}">${token}</a></h1>`
            });
            //04/04/2023

            // res.json({
            //     status: true,
            //     message: "email sended"
            // })
            console.log("email sended");

            res.status(200).send({
                message: "email sended"
            })

        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },
    verifiedEmail: async (req, res) => {
        try {

            const token = req.params.token

            const decoded = await new Promise((resolve, reject) => {
                jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
                    if (err) {
                        res.status(401).send({
                            message: "Invalid Token",
                            error: err
                        })
                        return reject(err);
                    }
                    resolve(decoded)

                })
            })

            const id = decoded.id
            const email = decoded.email

            const result = await user_logins.update({
                is_verified: true
            }, {
                where: {
                    id
                },
                fields: ['is_verified', 'updatedAt']
            })

            res.status(200).send({
                message: "tverifiedt",
                email,
                id,
                result
            })

        } catch (err) {
            console.log("unverified & error");
            res.status(400).send(err)
        }
    },
    login: async (req, res) => {
        try {
            const { value, credential, password } = req.body;

            let result = null

            if ( value === "email" ) {
                result = await user_logins.findOne({
                    where: {
                        email: credential
                    },
                    attributes: ['id', 'email', 'username', 'is_verified']
                })
            } else {
                result = await user_logins.findOne({
                    where: {
                        username: credential
                    },
                    attributes: ['id', 'email', 'username', 'is_verified']
                }) 
            }

            if ( !result ) throw {
                status: 404,
                message: "username or email is not found"
            }

            const isValid = await bcrypt.compare(password, result.password)

            if ( !isValid ) throw {
                status: 404,
                message: "wrong password"
            }

            res.status(200).send({
                status: true,
                message: 'login success',
                data: result
            })

        } catch (err) {
            res.status(400).send(err)
        }
    }
}