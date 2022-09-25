import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Spinner from '../Components/Spinner'
//Verification code package
import AuthCode from "react-auth-code-input"
import 'boxicons'

import {
    Card,
    CardBody,
    Col,
    Container,
    Form,
    FormGroup,
    Row,
} from "reactstrap"
import profile from "../Assets/images/profile-img.png";
import { doSignupUser, doVerifyResetOtp, doVerifyUser } from '../Services/ApiServices'


const OTP = () => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [otp, setOtp] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const location = useLocation();

    const handleClick = () => {
        setMinutes(1);
        if (location.state.otp == "forgot"){
            
        }else{
            doSignupUser({ email: location.state.email, })
            .then((res) => {
                console.log(res);
                swal({
                    title: "OTP will sent again",
                    text: "",
                    icon: "success",
                    button: "OK",
                  });
            }).catch((e) => {
                console.log(e);
                swal({
                    title: e.data.status,
                    text: "",
                    icon: "error",
                    button: "OK",
                  });
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(location.state.otp);
        let obj = {
            email: location.state.email,
            otp: otp
        }
        console.log(obj);
        if (location.state.otp == "forgot") {
            doVerifyResetOtp(obj)
                .then((res) => {
                    console.log(res);
                    setLoading(false);
                    swal({
                        title: "OTP is Verified",
                        text: null,
                        icon: "success",
                        button: "OK",
                      });
                    navigate("/recoverpass");
                }).catch((e) => {
                    console.log(e);
                    setLoading(false);
                    swal({
                        title: e.data.status,
                        text: "",
                        icon: "error",
                        button: "OK",
                      });
                })
        } else {
            doVerifyUser(obj)
                .then((res) => {
                    console.log(res);
                    swal({
                        title: "Password will sent in Your Email",
                        text: "",
                        icon: "success",
                        button: "OK",
                      });
                    navigate("/");
                }).catch((e) => {
                    console.log(e);
                    setLoading(false);
                    swal({
                        title: e.data.status,
                        text: "",
                        icon: "error",
                        button: "OK",
                      });
                })
        }
    }

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });
    return (
        <React.Fragment>
            {

                loading && <Spinner />

            }
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="overflow-hidden">
                                <div className="bg-light bg-soft">
                                    <Row>
                                        <Col xs={7} className="mt-3">
                                            <div className="text-primary p-4">
                                                <h4 className="text-primary">Verify Your Email</h4>
                                            </div>
                                        </Col>
                                        <Col xs={5} className="align-self-end">
                                            <img
                                                src={profile}
                                                alt=""
                                                className="img-fluid"
                                            />
                                        </Col>
                                    </Row>
                                </div>
                                <CardBody>
                                    <div className="p-2">
                                        <div className="text-center">
                                            <div className="p-2">
                                                <p className="mb-5">
                                                    Please enter the code sent to{" "}
                                                    <span className="fw-bolder">
                                                        example@akgec.ac.in
                                                    </span>
                                                </p>

                                                <Form onSubmit={handleSubmit} >
                                                    <Row>
                                                        <Col xs={12}>
                                                            <FormGroup className="verification">
                                                                <AuthCode
                                                                    characters={4}
                                                                    className="form-control form-control-lg text-center"
                                                                    allowedCharacters="^[0-9]"
                                                                    inputStyle={{
                                                                        width: "76px",
                                                                        height: "42px",
                                                                        padding: "8px",
                                                                        borderRadius: "8px",
                                                                        fontSize: "16px",
                                                                        textAlign: "center",
                                                                        marginRight: "15px",
                                                                        border: "1px solid #ced4da",
                                                                        textTransform: "uppercase",
                                                                    }}
                                                                    onChange={(value) => setOtp(value)}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <button className="btn btn-primary w-100 mt-3 d-grid" type='submit' >
                                                        Confirm
                                                    </button>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                                <div className="mt-0 text-center">
                                    <p>
                                        Did&apos;t receive a code ?{" "}
                                        {
                                            minutes === 0 && seconds === 0
                                                ? <span className=" text-primary" style={{ cursor: "pointer" }} onClick={handleClick}>Resend</span>
                                                : <span className='timer fw-bolder'> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                                        }
                                    </p>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}
export default OTP;
