import React from "react";

import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";


// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import profile from "../Assets/images/profile-img.png";
import { useNavigate } from "react-router-dom";
import { doLoginUser } from "../Services/ApiServices";

const Login = props => {

  const navigate = useNavigate();

  const regex = /^[a-zA-Z0-9_\-]{4,}[@][a][k][g][e][c][\.][a][c][\.][i][n]$/i

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: '',
      password: '',
    },
    validate:values=>{
      let errors = {};
     if(!values.email){
       errors.email= 'Required!'
      }else if(!regex.test(values.email)){
     errors.email = 'Invalid email format!'
     }
     return errors;
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      console.log(values);  
      doLoginUser(values)
      .then((res)=>{
        console.log(res);
      }).catch((e)=>{
        console.log(e);
      })
    }
  });

  const handleSignup = () => {
      navigate('/signup')
  }
  const handleForgot = () => {
      navigate('/forgot')
  }


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
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue.</p>
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

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          value={validation.values.password || ""}
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.password && validation.errors.password ? true : false
                          }
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>


                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>
                      <div className="mt-4 text-center">
                         <span  style={{cursor:"pointer"}} className="text-primary" onClick={handleSignup}>Sign Up</span>
                         <span className="p-2">|</span>
                          <span style={{cursor:"pointer"}} className="text-primary" onClick={handleForgot} >Forgot password </span>
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

export default Login;


