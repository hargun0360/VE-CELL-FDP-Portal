import React,{useState} from "react";

import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";


// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import profile from "../Assets/images/profile-img.png";
import { doResetPassword } from "../Services/ApiServices";
import { useNavigate } from "react-router-dom";
import Spinner from '../Components/Spinner'
const Reset = props => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      password: '',
      Npassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Please Enter Your Current Password"),
      Npassword: Yup.string().required("Please Enter Your New Password"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      console.log(values);
      let obj = {
        new_password:values.Npassword
      }
      doResetPassword(obj)
      .then((res)=>{
        console.log(res);
        setLoading(false)
        localStorage.setItem("token",res.data.access);
        localStorage.setItem("rtoken",res.data.refresh);
        navigate("/")
      }).catch((e)=>{
        console.log(e);
        setLoading(false)
      })
    }
  });


  // handleValidSubmit
//   const handleValidSubmit = (event, values) => {
//     dispatch(loginUser(values, props.history));
//   };


  return (
    <React.Fragment>
      {loading ? <Spinner /> : null}
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
                        <h4 className="text-primary">Reset Password</h4>
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
                        <Label className="form-label">Current Password</Label>
                        <Input
                          name="password"
                          className="form-control"
                          placeholder="Enter Your Current Password"
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
                        <Label className="form-label">New Password</Label>
                        <Input
                          name="Npassword"
                          value={validation.values.Npassword || ""}
                          type="password"
                          placeholder="Enter New Password"
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
                          Reset Password
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

export default Reset;


