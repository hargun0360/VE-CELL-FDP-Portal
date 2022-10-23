import React, { useState, useEffect } from 'react'
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import "../App.css";
import { doAddDetails, doUpdateDetails, doGetFacultyData } from '../Services/ApiServices';
import { getAuthToken } from '../Services/RestApiService'
import { Navigate, useParams } from 'react-router-dom';
import { doGetDetailById } from '../Services/ApiServices';
import Spinner from '../Components/Spinner'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import "../App.css"
import Navbar from "./Navbar"
import moment from "moment"
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
function CollegeForm() {

  const { id } = useParams();
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(null);
  const [department, setDepartment] = useState(null);
  const [email, setEmail] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [designation, setDesignation] = useState(null);
  const [ftype, setFtype] = useState(null);
  const [online, setOnline] = useState("");
  const [offline, setOffline] = useState("");
  const [incentive, setIncentive] = useState(null);
  const [remarks, setRemarks] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [flag1, setFlag1] = useState(true);
  const [flag2, setFlag2] = useState(true);
  const [flag, setFlag] = useState(false)
  const [certificatenumber, setCertificateNumber] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [days, setDays] = useState("");
  const [venue, setVenue] = useState(null);
  const [state, setState] = useState(false);
  const [namemessage, setNameMessage] = useState(false)
  const [emailmessage, setEmailMessage] = useState(false)
  const [mobilemessage, setMobileMessage] = useState(false)
  const [designationmessage, setDesignationMessage] = useState(false)
  const [admin, setAdmin] = useState(false);
  const [states, setStates] = useState(false)
  const [size, setSize] = useState(false)
  const [isFileSend,setIsFileSend] = useState(false)
  const [call, setCall] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("admin") == "true") {
      setAdmin(true);
    }
  }, [])

  useEffect(() => {
    if (ftype === "Online") {
      setFlag2(false)
      setFlag1(true)
    } else if (ftype === "Face to Face FDP") {
      setFlag1(false)
      setFlag2(true)
    } else {
      setFlag1(true)
      setFlag2(true)
    }
  }, [flag1, ftype, flag2])

  const handleFile = (e) => {
    console.log(e.target.files[0]);
    setCall(true);
    if (e.target.files && e.target.files[0]) {
      setCertificate(e.target.files[0]);
    }
  }

  const converting = (selected) => {
    var date = selected;
    var datearray = date.split("-");

    var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
    return newdate
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: "onTouched",
    // certificate and remarks left 
    defaultValues: {
      name: "",
      email: "",
      department: "",
      mobile: "",
      designation: "",
      venue: "",
      certificatenumber: "",
      incentive: null
    },
  });

  useEffect(() => {
    if (id) {
      getDetailByID();
      setFlag(true);
    }
  }, [id, reset]);

  const handlePreview = () => {
    if (id) {
      navigate("/preview", { state: id })
    }
  }

  useEffect(() => {
    FacultyData();
    if (states) {
      setStates(false)
    }
  }, [reset, states])

  const FacultyData = () => {
    doGetFacultyData()
      .then((res) => {
        console.log(res);
        let obj = {
          name: res.data.name == null ? "" : res.data.name,
          department: res.data.department == null ? "" : res.data.department,
          email: res.data.college_email == null ? "" : res.data.college_email,
          mobile: res.data.phone_number == null ? "" : res.data.phone_number,
          designation: res.data.designation == null ? "" : res.data.designation,
        }
        reset(obj);
      }).catch((e) => {
        console.log(e);
      })
  }

  useEffect(() => {
    if (certificate) {
      let file_size = certificate.size;
      if (file_size <= 2000000) {
        setSize(true);
      } else {
        setSize(false);
      }
    }

  }, [certificate])


  useEffect(()=>{
    const regex = /^[https://]/i;

          if(regex.test(certificate)){
            setIsFileSend(false);
          }else{
            setIsFileSend(true);
          }

          if(call){
            setCall(false);
          }
  },[call])


  const getDetailByID = () => {
    doGetDetailById(Number(id)).then((res) => {
      console.log(res);
      setOffline(res.data.face_to_face_fdp);
      setOnline(res.data.online_fdp);
      setDays(res.data.number_of_days)
      setRemarks(res.data.remarks);
      setFtype(res.data.fdp_type);
      setCertificate(res.data.certificate)
      setCall(true);
      setStart(new Date(converting(res.data.starting_date)))
      setEnd(new Date(converting(res.data.end_date)))


      
      // console.log(res.data.end_date,new Date("04-10-2022"),res.data.starting_date,new Date(res.data.starting_date));
      let obj = {
        name: res.data.name,
        email: res.data.college_email,
        department: res.data.department,
        mobile: res.data.phone_number,
        venue:  (res.data.venue == "undefined" || res.data.venue == "null") ? "" : res.data.venue,
        designation: res.data.designation,
        incentive: res.data.incentive_detail,
        certificatenumber: res.data.certificate_number,
      }
      reset(obj)
    }).catch((e) => {
      console.log(e);
    })
  }


  const convert = (selected) => {
    const day = selected.getDate();
    const month =
      selected.getMonth() >= 9
        ? selected.getMonth() + 1
        : `0${selected.getMonth() + 1}`;
    const yearr = selected.getFullYear();

    return `${day}-${month}-${yearr}`;
  };


  useEffect(() => {

    if (start && end) {
      convert(start)
      convert(end)
      const date1 = new Date(start);
      const date2 = new Date(end);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays + 1);
    }
  }, [start, end])



  const onSubmit = (data, e) => {
    e.preventDefault();



    if (id) {
      if (ftype && start && end && (online != "" || offline != "")) {
        setLoading(true)

        const myForm = new FormData();


        if (ftype == "Online") {
          setOffline("");
        } else {
          setOnline("");
        }


        myForm.set("name", data.name);
        myForm.set("department", data.department);
        myForm.set("college_email", data.email);
        myForm.set("mobile", data.mobile);
        myForm.set("designation", data.designation);
        myForm.set("fdp_type", ftype);
        myForm.set("incentive_detail", data.incentive);
        myForm.set("phone_number", data.mobile);
        myForm.set("remarks", remarks);
        if(isFileSend==true){
          myForm.set("certificate", certificate);
        }
        myForm.set("starting_date", convert(start));
        myForm.set("end_date", convert(end));
        myForm.set("number_of_days", Number(days));
        {offline == "Select the Face to Face FDP" ? myForm.set("face_to_face_fdp", null) : myForm.set("face_to_face_fdp", offline)}
          {online == "Select the Online FDP type" ? myForm.set("online_fdp", null) : myForm.set("online_fdp", online)}
        myForm.set("venue", data.venue);
        myForm.set("certificate_number", data.certificatenumber);

        doUpdateDetails(myForm, id)
          .then((res) => {
            setStates(true);
            console.log(res);
            setLoading(false)
            setFtype("")
            setOffline("")
            setOnline("")
            setRemarks("")
            setStart(null)
            setEnd(null)
            setDays("")
            setCertificate(null)
            reset()
            swal({
              title: "Details Updated Successfully",
              text: "",
              icon: "success",
              button: "OK",
            });
          }).catch((e) => {
            console.log(e);
            if (e.status == 403) {
              localStorage.clear();
              navigate("/")
            }
            setLoading(false)
            swal({
              title: e.data.status ? e.data.status : e.data.non_field_errors[0],
              text: "",
              icon: "error",
              button: "OK",
            });
          })
      }
    } else {
      if (size) {
        setLoading(true)
        if (certificate && ftype && start && end && (online != "" || offline != "") && size) {
          
          const myForm = new FormData();

         

          if (ftype == "Online") {
            setOffline("");
          } else {
            setOnline("");
          }


          myForm.set("name", data.name);
          myForm.set("department", data.department);
          myForm.set("college_email", data.email);
          myForm.set("mobile", data.mobile);
          myForm.set("designation", data.designation);
          myForm.set("fdp_type", ftype);
          {offline == "Select the Face to Face FDP" ? myForm.set("face_to_face_fdp", null) : myForm.set("face_to_face_fdp", offline)}
          {online == "Select the Online FDP type" ? myForm.set("online_fdp", null) : myForm.set("online_fdp", online)}
          myForm.set("incentive_detail", data.incentive);
          myForm.set("phone_number", data.mobile);
          myForm.set("remarks", remarks);
          myForm.set("starting_date", convert(start));
          myForm.set("end_date", convert(end));
          myForm.set("number_of_days", Number(days));
          myForm.set("certificate", certificate);
          myForm.set("venue", data.venue);
          myForm.set("certificate_number", data.certificatenumber);

          doAddDetails(myForm)
            .then((res) => {
              setStates(true);
              console.log(res);
              setLoading(false)
              setFtype("")
              setOffline("")
              setOnline("")
              setRemarks("")
              setStart(null)
              setEnd(null)
              setDays("")
              reset()
              swal({
                title: "Details Added Successfully",
                text: "",
                icon: "success",
                button: "OK",
              });
            }).catch((e) => {
              console.log(e);
              if (e.status == 403) {
                localStorage.clear();
                navigate("/")
              }
              setLoading(false)
              swal({
                title: e.data.status ? e.data.status : e.data.non_field_errors[0],
                text: "",
                icon: "error",
                button: "OK",
              });
            })

        }
      }
    }
  }
  return (<>
    {/* <h3 style={{ textAlign: "center", marginTop: "1%" }}>Add FDP</h3> */}
    <Navbar />
    <div className='page-content'>

      <Container fluid>
        {
          loading ? <Spinner /> : null
        }
         <div className="p-2">
                    <div
                      className="alert alert-success mb-4"
                      role="alert"
                    > <p style={{margin:"0",padding:"0",fontWeight:"500"}}>* FDP's can be added by this form
                    </p><p style={{margin:"0",padding:"0",fontWeight:"500"}}>* After submission, you can add another FDP as well!</p> </div>
                    </div>
        <Card.Title>
          Add FDP
        </Card.Title>

        <Card className='w-100 h-100 mt-3'>
          <Card.Body className='w-100'>
            <Form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
              <Row className='mb-3 mt-3'>
                <Card.Title>
                  Faculty Detail
                </Card.Title>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" autoFocus={true} placeholder="Enter your name" name="name" {...register("name", { required: "name is required", pattern: { value: /[a-zA-Z]{1,}/i, message: "invalid name" } })} />
                    <p style={{ color: "red", padding: "0px", margin: "0px" }}>{errors.name?.message}</p>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Department</Form.Label>
                    <Form.Select className='mb-3' aria-label="Default select example" name="department" {...register("department", { required: "department is required", })}>
                      <option value="Applied Sciences & Humanities">Applied Sciences & Humanities</option>
                      <option value="Electronics And Communication Engineering">Electronics And Communication Engineering</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                      <option value="Civil Engineering">Civil Engineering</option>
                      <option value="Electrical And Electronics Engineering">Electrical And Electronics Engineering</option>
                      <option value="Computer Science And Engineering">Computer Science And Engineering</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Master of Business Administration (MBA)">Master of Business Administration (MBA)</option>
                      <option value="Master Of Computer Applications">Master Of Computer Applications</option>
                    </Form.Select>
                    <p style={{ color: "red", padding: "0px", margin: "0px" }}>{errors.department?.message}</p>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>College mail id</Form.Label>
                    <Form.Control type="email" placeholder="example@akgec.ac.in" name="email" {...register("email", { required: "email is required", pattern: { value: /[a-zA-Z0-9]@akgec[/.]ac[/.]in/i, message: "invalid email" } })} />
                    <p style={{ color: "red", padding: "0px", margin: "0px" }}>{errors.email?.message}</p>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="formBasicNumber">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="number" placeholder="9956118026" name="mobile" {...register("mobile", { required: "phone number is required", pattern: { value: /[6789]{1}[0-9]{9}/i, message: "invalid phone number" } })} />
                    <p style={{ color: "red", padding: "0px", margin: "0px" }}>{errors.mobile?.message}</p>
                  </Form.Group>

                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="formBasicDesignation">
                    <Form.Label>Designation</Form.Label>
                    <Form.Control type="text" placeholder="Professor, Assistant Professor" name="designation" {...register("designation", { required: "designation is required", pattern: { value: /[a-zA-Z]{1,}/i, message: "invalid designation" } })} />
                    <p style={{ color: "red", padding: "0px", margin: "0px" }}>{errors.designation?.message}</p>
                  </Form.Group>
                </Col>
              </Row>
              <Row className='mb-3 mt-3'>
                <Card.Title>
                  FDP Type
                </Card.Title>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>FDP type</Form.Label>
                    <Form.Select className='mb-3' aria-label="Default select example" value={ftype} required onChange={(e) => setFtype(e.target.value)}>
                      <option>Select the FDP type</option>
                      <option value="Online">Online</option>
                      <option value="Face to Face FDP">Face to Face FDP</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Face to Face FDP</Form.Label>
                    <Form.Select className='mb-3' value={offline} aria-label="Default select example" disabled={flag1} onChange={(e) => setOffline(e.target.value)}>
                      <option>Select the Face to Face FDP</option>
                      <option value="AKTU Level-1">AKTU Level-1</option>
                      <option value="AKTU Refresher">AKTU Refresher</option>
                      <option value="AKTU Level-2">AKTU Level-2</option>
                      <option value="AKTU Level-3">AKTU Level-3</option>
                      <option value="AKTU 10 days FDP on UHBC">AKTU 10 days FDP on UHBC</option>
                      <option value="AKTU 10 days FDP on VREHC">AKTU 10 days FDP on VREHC</option>
                      <option value="AKTU 10 days FDP on HVMD">AKTU 10 days FDP on HVMD</option>
                      <option value="AICTE UHV-II">AICTE UHV-II</option>
                      <option value="AICTE UHV-III">AICTE UHV-III</option>
                      <option value="AICTE UHV-IV">AICTE UHV-IV</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Online FDP</Form.Label>
                    <Form.Select className='mb-3' value={online} aria-label="Default select example" disabled={flag2} onChange={(e) => setOnline(e.target.value)}>
                      <option>Select the Online FDP type</option>
                      <option value="AICTE-UHV Refresher Part-I">AICTE-UHV Refresher Part-I</option>
                      <option value="AICTE-UHV Refresher Part-II">AICTE-UHV Refresher Part-II</option>
                      <option value="AICTE-5 Day Online UHV-I">AICTE-5 Day Online UHV-I</option>
                      <option value="AICTE-6 Day Online UHV-II">AICTE-6 Day Online UHV-II</option>
                      <option value="AKTU-HV in Shankya and Vedant Darshan (eight days)">AKTU-HV in Shankya and Vedant Darshan (eight days)</option>
                      <option value="AKTU-HV in Jain and Baudh Darshan (eight days)">AKTU-HV in Jain and Baudh Darshan (eight days)</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className='mb-3 mt-3'>
                <Card.Title>
                  FDP Detail
                </Card.Title>
              </Row>
              <Row>
                <Col xs={12} md={3}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Starting Date</Form.Label>
                    <DatePicker dateFormat={'dd-MM-yyyy'} adjustDateOnChange dropdownMode="select" showMonthDropdown selected={start} showYearDropdown required onChange={(date) => setStart(date)} />

                  </Form.Group>
                </Col>
                <Col xs={12} md={3}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>End Date</Form.Label>
                    <DatePicker dateFormat={'dd-MM-yyyy'} adjustDateOnChange showMonthDropdown showYearDropdown selected={end} minDate={start} disabled={start ? false : true} required onChange={(date) => setEnd(date)} />

                  </Form.Group>
                </Col>
                <Col xs={12} md={3}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Number of Days</Form.Label>
                    <Form.Control type="number" value={days} placeholder="No. of Days" disabled />
                  </Form.Group>
                </Col>
                {ftype == "Face to Face FDP" ? <Col xs={12} md={3}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Venue</Form.Label>
                    <Form.Control type="text" placeholder="Venue" name="venue" {...register("venue", { required: "venue is required", })} />
                    <p style={{ color: "red", padding: "0px", margin: "0px" }}>{errors.venue?.message}</p>
                  </Form.Group>
                </Col> : null}
              </Row>
              <Row className='mb-4'>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>AICTE/AKTU Certificate Number</Form.Label>
                    <Form.Control type="text" placeholder="Certificate Number" name="certificatenumber" {...register("certificatenumber", { required: "certificate number is required", })} />
                    <p style={{ color: "red", padding: "0px", margin: "0px" }}>{errors.certificatenumber?.message}</p>
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label >Upload Certificate copy</Form.Label>
                    <Form.Control type="file" name='certificate' accept='image/*,application/pdf' onChange={handleFile} />
                    {size == false ? <p style={{ color: "red", padding: "0px", margin: "0px" }}>file size must be less than 2MB </p> : null}
                    {(id && certificate )? <a href={certificate} target="_blank" style={{textDecoration:"none"}} download="My_File.pdf"> Preview Here </a> : null}
                  </Form.Group>
                </Col>
              </Row>
              <Row className='mb-3 mt-3'>
                <Card.Title>
                  Incentive Details
                </Card.Title>
              </Row>
              <Row className="mb-3">
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Incentive Detail</Form.Label>
                    <Form.Select className='mb-3' aria-label="Default select example" name="incentive" {...register("incentive", { required: "incentive is required", })}>
                      <option value="AKTU Level-2 (10,000)">AKTU Level-2 (10,000)</option>
                      <option value="AKTU Level-3 (15,000)">AKTU Level-3 (15,000)</option>
                      <option value="AICTE UHV-III (10,000)">AICTE UHV-III (10,000)</option>
                      <option value="AICTE UHV-IV (15,000)">AICTE UHV-IV (15,000)</option>
                      <option value="Not Taken Yet">Not Taken Yet</option>
                    </Form.Select>
                    <p style={{ color: "red", padding: "0px", margin: "0px" }}>{errors.incentive?.message}</p>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-5" controlId="exampleForm.ControlTextarea1" onChange={(e) => setRemarks(e.target.value)}>
                <Form.Label>Remarks</Form.Label>
                <Form.Control value={(remarks == "null" || remarks == "undefined") ? "" : remarks} as="textarea" rows={2} />
              </Form.Group>
              <Button variant="primary" style={{ float: "right" }} type="submit" className='w-sm-100'>
                {id ? "Update" :  "Submit"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  </>
  );
}

export default CollegeForm;