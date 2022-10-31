import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useForm } from 'react-hook-form'
import Spinner from '../Components/Spinner'
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { logDOM } from '@testing-library/react';
import { Container } from 'reactstrap';
import "../App.css";
import moment from 'moment';
import swal from 'sweetalert';
import { doAddFacultyDetail, doGetFacultyDetailById, doUpdateFacultyDetail } from '../Services/ApiServices';
import { useParams,useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'

const FacultyParticipation = () => {

    const [facultyname, setFacultyname] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState(null);
    const [event, setEvent] = useState("");
    const [venue, setVenue] = useState("");
    const [duration, setDuration] = useState(null);
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
    const [role, setRole] = useState(null)
    const [remarks, setRemarks] = useState("")
    const [loading, setLoading] = useState(false)
    const [starting, setStarting] = useState(null)
    const [ending, setEnding] = useState(null)
    const navigate = useNavigate();
    const converting = (selected) => {
        var date = selected;
        var datearray = date.split("-");

        var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
        return newdate
    };

    const { id } = useParams();

    const convert = (selected) => {
        const day = selected.getDate();
        const month =
            selected.getMonth() >= 9
                ? selected.getMonth() + 1
                : `0${selected.getMonth() + 1}`;
        const yearr = selected.getFullYear();

        return `${day}-${month}-${yearr}`;
    };

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "onTouched",
        defaultValues: {
            facultyname: "",
            email: "",
            department: null,
            event: "",
            venue: "",
            role: "",
        },
    });

    useEffect(() => {
        if (from && to) {
            const date1 = new Date(from);
            const date2 = new Date(to);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDuration(diffDays + 1);
        }
    }, [from, to])

    useEffect(() => {

        loadFaculty();

    }, [id, reset]);

    const loadFaculty = () => {
        doGetFacultyDetailById(Number(id))
            .then((res) => {
                // console.log(res);
                setDuration(res.data.duration)
                setTo(new Date(converting(res.data.end_date)))
                setRemarks(res.data.remarks)
                setFrom(new Date(converting(res.data.starting_date)))
                let obj = {
                    facultyname: res.data.name,
                    email: res.data.email,
                    department: res.data.department,
                    event: res.data.name_of_event,
                    venue: res.data.venue_of_activity,
                    role: res.data.role,
                }
                reset(obj)
            }).catch((e) => {
                console.log(e);
            })
    }

    const onSubmit = (data, e) => {
        e.preventDefault();
        setLoading(true)
        if (id) {
            if (duration && from && to) {
                let obj = {
                    name: data.facultyname,
                    email: data.email,
                    department: data.department,
                    name_of_event: data.event,
                    venue_of_activity: data.venue,
                    role: data.role,
                    starting_date: convert(from),
                    end_date: convert(to),
                    duration: Number(duration),
                    remarks,
                }

                doUpdateFacultyDetail(obj, Number(id))
                    .then((res) => {
                        // console.log(res);
                        setLoading(false)
                        setRemarks("")
                        setDuration("")
                        setFrom(null)
                        setTo(null)
                        reset()
                        swal({
                            title: "Added Successfully",
                            text: "",
                            icon: "success",
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            navigate("/viewparticipation");
                        });
                    }).catch((e) => {
                        setLoading(false)
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
        } else {
            if (duration && from && to) {
                let obj = {
                    name: data.facultyname,
                    email: data.email,
                    department: data.department,
                    name_of_event: data.event,
                    venue_of_activity: data.venue,
                    role: data.role,
                    starting_date: convert(from),
                    end_date: convert(to),
                    duration: Number(duration),
                    remarks
                }

                doAddFacultyDetail(obj)
                    .then((res) => {
                        // console.log(res);
                        setLoading(false)
                        setRemarks("")
                        setDuration("")
                        setFrom(null)
                        setTo(null)
                        reset()
                        swal({
                            title: "Added Successfully",
                            text: "",
                            icon: "success",
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            // console.log("hello");
                            navigate("/viewparticipation");
                        });
                    }).catch((e) => {
                        if (e.status == 403) {
                            localStorage.clear();
                            navigate("/")
                        }
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



    return (<>
        <Navbar />
        <div className='page-content'>

            <Container fluid>
                {
                    loading ? <Spinner /> : null
                }

                <Row className='mb-3 mt-3'>
                    <Card.Title>
                        Faculty Participation
                    </Card.Title>
                </Row>

                <Card className='w-100 h-100 mt-3'>
                    <Card.Body className='w-100'>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your name" name="facultyname" {...register("facultyname", { required: "name is required", pattern: { value: /[a-zA-Z]{1,}/i, message: "invalid name" } })} />
                                        <p style={{ color: "red", padding: "0px", margin: "0px" }}>{errors.facultyname?.message}</p>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>College Email</Form.Label>
                                        <Form.Control type="email" placeholder="example@akgec.ac.in" name="email" {...register("email", { required: "email is required", pattern: { value: /[a-zA-Z0-9]@akgec[/.]ac[/.]in/i, message: "invalid email" } })} />
                                        <p style={{ color: "red", padding: "0px", margin: "0px" }}>{errors.email?.message}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
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
                                <Col xs={12} md={3}>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Event Name</Form.Label>
                                        <Form.Control type="text" placeholder="Event Name" name="event" {...register("event", { required: "event is required", })} />
                                        <p style={{ color: "red", padding: "0px", margin: "0px" }}>{errors.event?.message}</p>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={3}>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Venue</Form.Label>
                                        <Form.Control type="text" placeholder="Venue" name="venue" {...register("venue", { required: "venue is required", })} />
                                        <p style={{ color: "red", padding: "0px", margin: "0px" }}>{errors.venue?.message}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>

                                <Col xs={4} md={4}>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Role of Faculty</Form.Label>
                                        <Form.Control type="text" placeholder="Role of Faculty" name="role" {...register("role", { required: "role is required", })} />
                                        <p style={{ color: "red", padding: "0px", margin: "0px" }}>{errors.role?.message}</p>
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
                                        <Form.Control type="number" value={duration} placeholder="Duration" disabled />
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

    </>)
}

export default FacultyParticipation