import React from "react";

import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";


// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import profile from "../Assets/images/profile-img.png";
import { doResetPassword } from "../Services/ApiServices";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
const RecoverPass = props => {
  const navigate  = useNavigate();
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      password: '',
      Npassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().min(8).max(25).required("Please Enter Your New Password").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain atleast 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
      Npassword: Yup.string().oneOf([Yup.ref('password'), null], 'password must match')
    }),
    onSubmit: (values) => {
      // console.log(values);
      doResetPassword({new_password:values.Npassword})
      .then((res)=>{
        // console.log(res);
        navigate("/")
        swal({
          title: "Password Reset Successfully",
          text: "",
          icon: "success",
          button: "OK",
        });
      }).catch((e)=>{
        console.log(e);
        swal({
          title: e.data.status ? e.data.status : e.data.non_field_errors[0],
          text: "",
          icon: "error",
          button: "OK",
        });
      })
    }
  });


  // handleValidSubmit
//   const handleValidSubmit = (event, values) => {
//     dispatch(loginUser(values, props.history));
//   };


  return (
    <React.Fragment>
      {/* <MetaTags>
        <title>Login | Skote - React Admin & Dashboard Template</title>
      </MetaTags> */}
      <div className="home-btn d-none d-sm-block">
        {/* <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link> */}
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-light bg-soft">
                  <Row>
                    <Col xs={7} className="mt-2">
                      <div className="text-primary p-4">
                        <h4 className="text-primary">Recover Password</h4>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
            
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {/* {error ? <Alert color="danger">{error}</Alert> : null} */}

                      <div className="mb-3">
                        <Label className="form-label">New Password</Label>
                        <Input
                          name="password"
                          className="form-control"
                          placeholder="Enter New Password"
                          type="password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password && validation.errors.password ? true : false
                          }
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Confirm Password</Label>
                        <Input
                          name="Npassword"
                          value={validation.values.Npassword || ""}
                          type="password"
                          placeholder="Enter Confirm Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.Npassword && validation.errors.Npassword ? true : false
                          }
                        />
                        {validation.touched.Npassword && validation.errors.Npassword ? (
                          <FormFeedback type="invalid">{validation.errors.Npassword}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Recover Password
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default RecoverPass;


