import React, { useState, useEffect } from 'react'

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


const OTP = () => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const handleClick = () => {
        setMinutes(1);
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

                                                <Form>
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
                                                                    onChange={(value) => console.log(value)}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </Form>

                                                <div className="btn btn-primary w-md mt-3 d-grid">
                                                    Confirm
                                                </div>
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
