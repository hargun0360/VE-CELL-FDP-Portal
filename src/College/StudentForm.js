import React, { useState, useEffect } from 'react'
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { logDOM } from '@testing-library/react';
import { Container } from 'reactstrap';
import "../App.css";
import Breadcrumb from './Breadcrumb';
import { doUpdateStudentDetail, doAddStudentDetail, doGetStudentDetailById,doAddBulkStudentDetails  } from '../Services/ApiServices';
import { getAuthToken } from '../Services/RestApiService'
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../Components/Spinner'
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import Navbar from "./Navbar"
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import { useForm } from 'react-hook-form'
import Modal from 'react-bootstrap/Modal';
function StudentForm() {

    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("");
    const [branch, setBranch] = useState("");
    const [year, setYear] = useState("");
    const [roll, setRoll] = useState("")
    const [course, setCourse] = useState("")
    const [section, setSection] = useState("");
    const [mobile, setMobile] = useState("");
    const [activity, setActivity] = useState("");
    const [venue, setVenue] = useState("");
    const [duration, setDuration] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [remarks, setRemarks] = useState("");
    const [email, setEmail] = useState("");
    const [flag, setFlag] = useState(false)
    const [admin, setAdmin] = useState(false);
    const [show, setShow] = useState(false);
    const [file, setFile] = useState(null);
    const navigate = useNavigate()


    useEffect(() => {
        if (localStorage.getItem("admin") == "true") {
            setAdmin(true);
        }
    }, []);

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
            branch: "",
            mobile: "",
            year: "",
            section: "",
            venue: "",
            activity: "",
            roll: ""
        },
    });

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
        if (id) {
            getDetailByID();
            setFlag(true);
        }
    }, [id, reset]);


    const getDetailByID = () => {
        doGetStudentDetailById(Number(id)).then((res) => {
            // console.log(res);

            let arr = res.data.branch.split('-');
            setFrom(new Date(converting(res.data.starting_date)));
            setTo(new Date(converting(res.data.end_date)));
            setDuration(res.data.number_of_days)
            setRemarks(res.data.remarks);
            setCourse(res.data.course)
            let obj = {
                name: res.data.name,
                email: res.data.email,
                mobile: res.data.phone_number,
                venue: res.data.venue_of_activity,
                activity: res.data.name_of_activity,
                branch: arr.length > 0 ? arr[0] : "",
                year: res.data.year,
                section: arr.length > 0 ? arr[1] : "",
                roll: res.data.roll_no
            }
            reset(obj)
        }).catch((e) => {
            console.log(e);
            if (e.status == 403) {
                localStorage.clear();
                navigate("/")
            }
            swal({
                title: e.data.status ? e.data.status : e.data.non_field_errors[0],
                text: "",
                icon: "error",
                button: "OK",
            });
        })
    }

    useEffect(() => {
        if (from && to) {
            convert(from)
            convert(to)
            const date1 = new Date(from);
            const date2 = new Date(to);
            const diffTime = (date2.getTime() - date1.getTime());
            const diffDays = parseInt(diffTime / (1000 * 3600 * 24));
            setDuration(diffDays + 1);
        }
    }, [from, to])



    const onSubmit = (data, e) => {
        e.preventDefault();
        setLoading(true)
        if (id) {
            if (from && to) {


                let obj = {
                    name: data.name,
                    branch: data.branch + '-' + data.section,
                    section: data.section,
                    number_of_days: Number(duration),
                    name_of_activity: data.activity,
                    year: Number(data.year),
                    venue_of_activity: data.venue,
                    starting_date: convert(from),
                    end_date: convert(to),
                    phone_number: data.mobile,
                    remarks,
                    email: data.email,
                    roll_no: data.roll,
                    course
                }

                doUpdateStudentDetail(obj, Number(id))
                    .then((res) => {
                        // console.log(res);
                        setLoading(false)
                        setDuration("")
                        setFrom(null)
                        setTo(null)
                        setCourse("")
                        setRemarks("")
                        reset()
                        swal({
                            title: "Updated Successfully",
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
            if (from && to) {


                let obj = {
                    name: data.name,
                    branch: data.branch + '-' + data.section,
                    section: data.section,
                    number_of_days: Number(duration),
                    name_of_activity: data.activity,
                    year: Number(data.year),
                    venue_of_activity: data.venue,
                    starting_date: convert(from),
                    end_date: convert(to),
                    phone_number: data.mobile,
                    remarks,
                    email: data.email,
                    roll_no: data.roll,
                    course
                }

                // console.log(obj);

                doAddStudentDetail(obj)
                    .then((res) => {
                        // console.log(res);
                        setLoading(false)
                        setDuration("")
                        setFrom(null)
                        setTo(null)
                        setCourse("")
                        setRemarks("")
                        reset()
                        swal({
                            title: "Student Added Successfully",
                            text: "",
                            icon: "success",
                            button: "OK",
                        });
                    }).catch((e) => {
                        console.log(e);
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

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);

    }

    const handleFileSubmit = (e) => {
        e.preventDefault();
        if (file) {
            // studentData.forEach(function (data) {
            //     students.push({
            //         name: data['Name'],
            //         branch: data['Branch'],
            //         year: data['Year'],
            //         section: data['Section'],
            //         mobile_number: data['Mobile Number'],
            //         name_of_activity: data['Name of Activity'],
            //         venue_of_activity: data['Venue of Activity'],
            //         duration: data['Duration'],
            //         from: data['From'],
            //         to: data['To'],
            //         remarks: data['Remarks'],
            //     })
            // });

            // API CALL

            const myForm = new FormData();

            myForm.set("excel", file);

            doAddBulkStudentDetails(myForm)
                .then((res) => {
                    // console.log(res);
                    
                    swal({
                        title: "Added Successfully",
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

                    swal({
                        title: e.data.status ? e.data.status : e.data.non_field_errors[0],
                        text: "",
                        icon: "error",
                        button: "OK",
                    });
                })
            setShow(false);

        }

        // if(students.length>0){
        //      // post the data through API

        // }

    }


    return (<>
        {/* <h3 style={{ textAlign: "center", marginTop: "1%" }}>Add FDP</h3> */}
        <Navbar />
        <div className='page-content'>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Form onSubmit={handleFileSubmit}>
                        <Row>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                <Form.Label >Add Student</Form.Label>
                                <Form.Control type="file" accept='.xlsx' name='student' required onChange={(e) => { setFile(e.target.files[0]) }} />
                            </Form.Group>
                        </Row>
                        <Row style={{ float: "right" }} className="px-2">
                            <Button type='submit' className="w-100" variant="success">
                                Submit
                            </Button>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
            <Container fluid>
                {
                    loading ? <Spinner /> : null
                }
                <Row className="mt-2">
                    <Col lg="9" md="9" sm="9" >
                        <Card.Title className="mt-3">
                            Student Detail
                        </Card.Title>
                    </Col>
                    <Col lg="3" md="3" sm="3" className="mt-2" >

                        <Button variant="success"  onClick={handleShow}>
                            Add Multiple Students
                        </Button>

                    </Col>

                </Row>

                <Card className='w-100 h-100 mt-3'>
                    <Card.Body className='w-100'>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col xs={12} md={3}>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your name" name="name" {...register("name", { required: "name is required", pattern: { value: /[a-zA-Z]{1,}/i, message: "invalid name" } })} />
                                        <p style={{ color: "red", padding: "0px", margin: "0px" }}>{errors.name?.message}</p>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={4}>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" {...register("email", { required: "email is required" })} />
                                        <p style={{ color: "red", padding: "0px", margin: "0px" }}>{errors.email?.message}</p>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={5}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Branch</Form.Label>
                                        <Form.Control type="text" name="branch" {...register("branch", { required: "branch is required" })} />
                                        <p style={{ color: "red", padding: "0px", margin: "0px" }}>{errors.branch?.message}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>University Roll Number</Form.Label>
                                        <Form.Control type="number" placeholder="Enter University Roll Number" name="roll" {...register("roll", { required: "roll number is required", pattern: { value: /[2]{1}[0-9]{9}/i, message: "invalid roll number" } })} />
                                        <p style={{ color: "red", padding: "0px", margin: "0px" }}>{errors.roll?.message}</p>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={5}>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Course</Form.Label>
                                        <Form.Control type="text" placeholder="Enter the Course" required value={course} onChange={(e) => setCourse(e.target.value)} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={3} md={2}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Year</Form.Label>
                                        <Form.Control type="number" name="year" {...register("year", { required: "required year", pattern: { value: /[1-8]{1}/i, message: "invalid year" } })} />
                                        <p style={{ color: "red", padding: "0px", margin: "0px" }}>{errors.year?.message}</p>
                                    </Form.Group>
                                </Col>
                                <Col xs={4} md={2}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Section</Form.Label>
                                        <Form.Control type="text" name="section" {...register("section", { required: "section is required", pattern: { value: /[a-zA-Z0-9]{1,}/i, message: "invalid section" } })} />
                                        <p style={{ color: "red", padding: "0px", margin: "0px" }}>{errors.section?.message}</p>
                                    </Form.Group>
                                </Col>
                                <Col xs={6} md={4}>
                                    <Form.Group className="mb-3" controlId="formBasicNumber">
                                        <Form.Label>Mobile Number</Form.Label>
                                        <Form.Control type="number" name="mobile" {...register("mobile", { required: "phone number is required", pattern: { value: /[6789]{1}[0-9]{9}/i, message: "invalid phone number" } })} />
                                        <p style={{ color: "red", padding: "0px", margin: "0px" }}>{errors.mobile?.message}</p>
                                    </Form.Group>
                                </Col>
                                <Col xs={6} md={4}>
                                    <Form.Group className="mb-3" controlId="formBasicNumber">
                                        <Form.Label>Name of Activity</Form.Label>
                                        <Form.Control type="text" placeholder="Activity Name" name="activity" {...register("activity", { required: "activity name is required", pattern: { value: /[a-zA-Z0-9]{1,}/i, message: "invalid activity name" } })} />
                                        <p style={{ color: "red", padding: "0px", margin: "0px" }}>{errors.activity?.message}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={4}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                        <Form.Label>Venue</Form.Label>
                                        <Form.Control type="text" placeholder="Venue" name="venue" {...register("venue", { required: "venue is required", pattern: { value: /[a-zA-Z0-9]{1,}/i, message: "invalid venue name" } })} />
                                        <p style={{ color: "red", padding: "0px", margin: "0px" }}>{errors.venue?.message}</p>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={3}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                        <Form.Label>From</Form.Label>
                                        <DatePicker dateFormat={'dd-MM-yyyy'} adjustDateOnChange dropdownMode="select" showMonthDropdown showYearDropdown selected={from} onChange={(date) => setFrom(date)} />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={3}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                        <Form.Label>To</Form.Label>
                                        <DatePicker dateFormat={'dd-MM-yyyy'} adjustDateOnChange showMonthDropdown showYearDropdown minDate={from} disabled={from ? false : true} selected={to} onChange={(date) => setTo(date)} />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={2}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                        <Form.Label>Duration</Form.Label>
                                        <Form.Control type="text" value={duration} placeholder="Duration" onChange={(e) => setDuration(e.target.value)} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Form.Group className="mb-5" controlId="exampleForm.ControlTextarea1" onChange={(e) => setRemarks(e.target.value)}>
                                    <Form.Label>Remarks</Form.Label>
                                    <Form.Control value={remarks} as="textarea" rows={2} />
                                </Form.Group>
                            </Row>
                            <Button variant="primary" style={{ float: "right" }} type="submit" className='w-sm-100'>
                                {id ? "Update" : "Submit"}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    </>
    );
}

export default StudentForm;