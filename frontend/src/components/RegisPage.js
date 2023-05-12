import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios';

const RegisPage = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [verif, setVerif] = useState('')
    const [emailErr, setEmaillErr] = useState('')
    const [usernameErr, setUserNameErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')
    const [verifErr, setVerifErr] = useState('')
    const [isLoad, setIsLoad] = useState(true)

    // useEffect(() => {
    //     // console.log(email);
    //     // console.log(username);
    //     // console.log(password);
    //     // console.log(verif);

    // }, [])

    const isEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    }

    function validatePassword(password) {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/;
        return regex.test(password);
    }

    // button regis / enter
    const handleRegis = async () => {
        console.log("regis is checking");
        setIsLoad(false)

        if (email == null) {
            setIsLoad(true)
            return setEmaillErr("Please input your Email")
        }
        else {
            setEmaillErr('')
            setUserNameErr('')
            setPasswordErr('')
            setEmaillErr('')
            setVerifErr('')
            setPasswordErr('')
        }
        if (username == null) {
            setIsLoad(true)
            return setUserNameErr("Please input your usernmae")
        }
        else {
            setUserNameErr('')
            setEmaillErr('')
            setPasswordErr('')
            setEmaillErr('')
            setVerifErr('')
            setPasswordErr('')
        }
        if (password == null) {
            setIsLoad(true)
            return setPasswordErr("Please input your password")
        }
        else {
            setEmaillErr('')
            setUserNameErr('')
            setPasswordErr('')
            setEmaillErr('')
            setVerifErr('')
            setPasswordErr('')
        }
        if (isEmail(email) === false){
            setIsLoad(true)
            return setEmaillErr("Please enter a valid Email")
        }
        else {
            setEmaillErr('')
            setUserNameErr('')
            setPasswordErr('')
            setEmaillErr('')
            setVerifErr('')
            setPasswordErr('')
        }
        if (password !== verif) {
            setIsLoad(true)
            return setVerifErr("Password doesn't match")
        }
        else {
            setEmaillErr('')
            setUserNameErr('')
            setPasswordErr('')
            setEmaillErr('')
            setVerifErr('')
            setPasswordErr('')
        }
        if (validatePassword(password) === false) {
            setIsLoad(true)
            return setPasswordErr("Passwords should contain at least 8 characters including an uppercase letter, a symbol, and a number")
        }
        else {
            setEmaillErr('')
            setUserNameErr('')
            setPasswordErr('')
            setEmaillErr('')
            setVerifErr('')
            setPasswordErr('')
        }

        console.log("all correct");


        await axios.post("http://localhost:5000/auth/register", {
            email,
            username,
            password
        })
            .then((result) => {
                console.log("regis sended");
                console.log(result);
                setIsLoad(true)
            }).catch((err) => {
                console.log(err);
                setIsLoad(true)

                if ( err.response.data.status === "both" ) {
                    setEmaillErr(err.response.data.message)
                    setUserNameErr(err.response.data.message)
                } else if ( err.response.data.status === "email" ) {
                    setEmaillErr(err.response.data.message)
                } else if ( err.response.data.status === "username" ) {
                    setUserNameErr(err.response.data.message)
                }

            });

    }

    return (
        <div>

            <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input type='email' value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleRegis()
                        }
                    }}
                />
                {emailErr}
                <FormLabel>username</FormLabel>
                <Input type='text' value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleRegis()
                        }
                    }}
                />
                {usernameErr}
                <FormLabel>password</FormLabel>
                <Input type='text' value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleRegis()
                        }
                    }}
                />
                {passwordErr}
                <FormLabel>write again your password</FormLabel>
                <Input type='text' value={verif}
                    onChange={(e) => setVerif(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleRegis()
                        }
                    }}
                />
                {verifErr}
            </FormControl>
            {isLoad ? (
                <Button onClick={() => handleRegis()}>Sign Up</Button>
            ) : (
                <Button isLoading >
                    Sign Up
                </Button>
            )}


            {/* <FormControl>
                <FormLabel>username</FormLabel>
                <Input type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
            </FormControl>
            <FormControl>
                <FormLabel>password</FormLabel>
                <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </FormControl>
            <FormControl>
                <FormLabel>verification password</FormLabel>
                <Input type='password' value={verif} onChange={(e) => setVerif(e.target.value)}/>
            </FormControl> */}

        </div>
    )
}

export default RegisPage