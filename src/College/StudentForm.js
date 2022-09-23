import React, { useState, useEffect } from 'react'
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { logDOM } from '@testing-library/react';
import { Container } from 'reactstrap';
import "../App.css";
import Breadcrumb from './Breadcrumb';
import { doUpdateStudentDetail,doAddStudentDetail, doGetStudentDetailById } from '../Services/ApiServices';
import { getAuthToken } from '../Services/RestApiService'
import { useParams } from 'react-router-dom';
import Spinner from '../Components/Spinner'

function StudentForm() {

    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("");
    const [branch, setBranch] = useState("");
    const [year, setYear] = useState("");
    const [section, setSection] = useState("");
    const [mobile, setMobile] = useState("");
    const [activity, setActivity] = useState("");
    const [venue, setVenue] = useState("");
    const [duration, setDuration] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [remarks, setRemarks] = useState("");
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        if (id) {
            getDetailByID();
        }
    }, [id]);

    const getDetailByID = () => {
        doGetStudentDetailById(Number(id)).then((res) => {
            console.log(res);
            setName(res.data.name);
            setMobile(res.data.mobile_number);
            setFrom(res.data.from);
            setTo(res.data.to);
            setVenue(res.data.venue_of_activity);
            setDuration(res.data.duration)
            setRemarks(res.data.remarks);
            setActivity(res.data.name_of_activity)
            setSection(res.data.section)
            setYear(res.data.year);
            setBranch(res.data.branch);
        }).catch((e) => {
            console.log(e);
        })
    }

    useEffect(() => {
        if (from && to) {
            const date1 = new Date(from);
            const date2 = new Date(to);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDuration(diffDays);
        }
    }, [from,to])

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (id) {
            if (name && branch && section && duration && activity && year && venue && to && from && mobile) {
                
                let obj = {
                    name,
                    branch,
                    section,
                    duration,
                    name_of_activity:activity,
                    year,
                    venue,
                    from,
                    to,
                    mobile_number:mobile,
                    remarks
                }

                doUpdateStudentDetail(obj, id)
                    .then((res) => {
                        console.log(res);
                        setLoading(false)
                    }).catch((e) => {
                        console.log(e);
                        setLoading(false)
                    })
            }
        } else {
            if (name && branch && section && duration && activity && year && venue && to && from && mobile) {
            

                let obj = {
                    name,
                    branch,
                    section,
                    duration,
                    name_of_activity:activity,
                    year,
                    venue,
                    from,
                    to,
                    mobile_number:mobile,
                    remarks
                }

                doAddStudentDetail(obj)
                    .then((res) => {
                        console.log(res);
                        setLoading(false)
                    }).catch((e) => {
                        console.log(e);
                        setLoading(false)
                    })
            }
        }
    }
    return (<>
        {/* <h3 style={{ textAlign: "center", marginTop: "1%" }}>Add FDP</h3> */}
        <div className='page-content'>

            <Container fluid>
                {
                    loading ? <Spinner /> : null
                }
                {flag ? <Breadcrumb
                    title="Update Student"
                    breadcrumbItems={[{ title: "View", href: "/viewall" }, { title: "Add", href: "/form" }]}
                /> : <Breadcrumb
                    title="Add Student"
                    breadcrumbItems={[{ title: "View", href: "/viewall" }, { title: "Add", href: "/form" }]}
                />}
                <Card className='w-100 h-100 mt-3'>
                    <Card.Body className='w-100'>
                        <Form encType="multipart/form-data" onSubmit={(e) => handleSubmit(e)}>
                            <Row className='mb-3 mt-3'>
                                <Card.Title>
                                    Student Detail
                                </Card.Title>
                            </Row>
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" value={name} placeholder="Enter your name" required onChange={(e) => setName(e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Branch</Form.Label>
                                        <Form.Select className='mb-3' value={branch} aria-label="Default select example" required onChange={(e) => setDepartment(e.target.value)}>
                                            <option>Select the Branch</option>
                                            <option value="Electronics And Communication Engineering">Electronics And Communication Engineering</option>
                                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                                            <option value="Civil Engineering">Civil Engineering</option>
                                            <option value="Electrical And Electronics Engineering">Electrical And Electronics Engineering</option>
                                            <option value="Computer Science And Engineering">Computer Science And Engineering</option>
                                            <option value="Information Technology">Information Technology</option>
                                            <option value="Master Of Computer Applications">Master Of Computer Applications</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={3} md={1}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Year</Form.Label>
                                        <Form.Control type="number" value={year}  required onChange={(e) => setYear(e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col xs={4} md={2}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Section</Form.Label>
                                        <Form.Control type="text" value={section} required onChange={(e) => setSection(e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col xs={6} md={4}>
                                    <Form.Group className="mb-3" controlId="formBasicNumber">
                                        <Form.Label>Mobile Number</Form.Label>
                                        <Form.Control type="number" value={mobile} placeholder="ex- 9956118026" required minlength="8" onChange={(e) => setMobile(e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col xs={6} md={5}>
                                    <Form.Group className="mb-3" controlId="formBasicNumber">
                                        <Form.Label>Name of Activity</Form.Label>
                                        <Form.Control type="text" value={mobile} placeholder="Activity Name" required minlength="8" onChange={(e) => setMobile(e.target.value)} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                            <Col xs={12} md={4}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                        <Form.Label>Venue</Form.Label>
                                        <Form.Control type="text" value={venue} placeholder="Venue" required onChange={(e) => setVenue(e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={2}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                        <Form.Label>Duration</Form.Label>
                                        <Form.Control type="number" value={duration} placeholder="Duration" disabled />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={3}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                        <Form.Label>From</Form.Label>
                                        <Form.Control type="date" value={from} placeholder="Starting Date" min={new Date().toISOString().split('T')[0]} required onChange={(e) => setStart(e.target.value)} />
                                    </Form.Group>
                                </Col>  
                                <Col xs={12} md={3}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                        <Form.Label>To</Form.Label>
                                        <Form.Control type="date" value={to} placeholder="End Date" min={new Date().toISOString().split('T')[0]} required onChange={(e) => setEnd(e.target.value)} />
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
                                Submit
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