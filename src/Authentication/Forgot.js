import React, { useState } from "react";
// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";

// import images
import profile from "../Assets/images/profile-img.png";
import { useNavigate } from "react-router-dom";
import { doVerifyOtp } from "../Services/ApiServices";
import swal from "sweetalert";
const Forgot = () => {
  const navigate = useNavigate();
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("please enter your email"),
    }),
    onSubmit: (values) => {
      console.log(values);
      doVerifyOtp(values)
        .then((res) => {
          console.log(res);
          swal({
            title: "OTP will Sent Successfully",
            text: "",
            icon: "success",
            button: "OK",
          });
          navigate("/otp", { state: { email: values.email, otp: "forgot" } });
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
  });

  const handleSignup = () => {
    navigate("/signup")
  }
  const handleLogin = () => {
    navigate("/")
  }

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
                        <h4 className="text-primary">Recover Password</h4>
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
                <CardBody className="pt-0">

                  <div className="p-2">
                    <div
                      className="alert alert-success text-center mb-4"
                      role="alert"
                    > Enter your Email and OTP will be sent to you! </div>

                    <Form className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email ? true : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="text-end">
                        <button
                          className="btn btn-primary w-md"
                          type="submit"
                        >
                          Next
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
                <div className="mb-4 text-center">
                  <span style={{ cursor: "pointer" }} className="text-primary" onClick={handleSignup}>Sign Up</span>
                  <span className="p-2">|</span>
                  <span style={{ cursor: "pointer" }} className="text-primary" onClick={handleLogin}>Login</span>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Forgot;
