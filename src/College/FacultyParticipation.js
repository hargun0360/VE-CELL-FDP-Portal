import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useForm } from 'react-hook-form'
import Spinner from '../Components/Spinner'
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { logDOM } from '@testing-library/react';
import { Container } from 'reactstrap';
import "../App.css";
import swal from 'sweetalert';
const FacultyParticipation = () => {

    const [facultyname, setFacultyname] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState(null);
    const [event, setEvent] = useState("");
    const [venue, setVenue] = useState("");
    const [duration, setDuration] = useState(null);
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
    const [role, setRole] = useState("")
    const [remarks, setRemarks] = useState("")
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "onTouched",
        defaultValues: {
            facultyname,
            email,
            department,
            event,
            venue,
            role,
        },
    });

    useEffect(() => {
        if (from && to) {
          const date1 = new Date(from);
          const date2 = new Date(to);
          const diffTime = Math.abs(date2 - date1);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setDuration(diffDays+1);
        }
      }, [from,to])

    const onSubmit = (data, e) => {
        e.preventDefault();
        var dArr = from.split("-"); 
        var Arr = to.split("-");
        setFrom(Arr[2]+ "-" +Arr[1]+ "-" +Arr[0]);
        setTo(dArr[2]+ "-" +dArr[1]+ "-" +dArr[0]);
        if(duration && from && to){
            var dArr = from.split("-");
            setFrom(dArr[2]+ "-" +dArr[1]+ "-" +dArr[0]);
            var Arr = to.split("-");
            setTo(Arr[2]+ "-" +Arr[1]+ "-" +Arr[0])
            let obj = {
                faculty_name : data.facultyname,
                email:data.email,
                department:data.department,
                event:data.event,
                venue:data.venue,
                role:data.role,
                starting_date:from,
                end_date:to,
                number_of_days:duration,
                remarks
            }    
            
        }
        
        // API call post
    }

    // useEffect(()=>{
    //     if(from){
    //         var dArr = from.split("-");  // ex input: "2010-01-18"

             //console.log(dArr[2]+ "-" +dArr[1]+ "-" +dArr[0]);
    //     }
    // },[from])
//---------------------------------------------------------------------------------------
    // useEffect(()=>{
    //     loadAdmin();
    //  },[reset]);
    //  const dispatch = useDispatch();
    // const loadAdmin = async ()=> {
    //     try {
    //         const res = await AuthService.getadminDetails(user,id)
    //         console.log(res);
    //         setLoading(false);
    //         setImage(res.data.profile.image)
    //         setName(res.data.profile.fullname);
    //         setEmail(res.data.profile.email);
    //         setMobile(res.data.profile.mobile);
    //         setDegree(res.data.profile.degree);  
    //         const obj = {
    //             fullname:res.data.profile.fullname,
    //             email:res.data.profile.email,
    //             mobilenumber:res.data.profile.mobile,
    //             qualification:res.data.profile.degree,
    //         } 
    //         console.log(obj);
    //         reset(obj)
    //     } catch (error) {
    //         console.log(error);
    //     }
        
    // }



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
                                        <Form.Control type="text" placeholder="Enter your name" name="facultyname" {...register("facultyname", { required: "name is required" ,pattern: { value: /[a-zA-Z]{1,}/i, message: "invalid name" }})} />
                                        <p style={{color:"red",padding:"0px",margin:"0px"}}>{errors.facultyname?.message}</p>
                                    </Form.Group>      
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>College Email</Form.Label>
                                        <Form.Control type="email" placeholder="example@akgec.ac.in" name="email" {...register("email", { required: "email is required",pattern: { value: /[a-zA-Z0-9]@akgec[/.]ac[/.]in/i, message: "invalid email" } })} />
                                        <p style={{color:"red",padding:"0px",margin:"0px"}}>{errors.email?.message}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Department</Form.Label>
                                        <Form.Select className='mb-3' placeholder='Select the Department' aria-label="Default select example" required name="department" {...register("department", { required: "department is required", })}>
                                            <option>Select the Department</option>
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
                                        <p style={{color:"red",padding:"0px",margin:"0px"}}>{errors.department?.message}</p>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={3}>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Event Name</Form.Label>
                                        <Form.Control type="text" placeholder="Event Name" name="event" {...register("event", { required: "event is required", })} />
                                        <p style={{color:"red",padding:"0px",margin:"0px"}}>{errors.event?.message}</p>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={3}>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Venue</Form.Label>
                                        <Form.Control type="text" placeholder="Venue" name="venue" {...register("venue", { required: "venue is required", })} />
                                        <p style={{color:"red",padding:"0px",margin:"0px"}}>{errors.event?.message}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>

                                <Col xs={4} md={4}>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Role of Faculty</Form.Label>
                                        <Form.Control type="text" placeholder="Role of Faculty" name="role" {...register("role", { required: "role is required", })} />
                                        <p style={{color:"red",padding:"0px",margin:"0px"}}>{errors.role?.message}</p>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={3}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                        <Form.Label>From</Form.Label>
                                        <Form.Control type="date" placeholder="DD-MM-YYYY" min='01-01-2009' value={from} onChange={(e)=>{setFrom(e.target.value)}}/>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={3}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                        <Form.Label>To</Form.Label>
                                        <Form.Control type="date" value={to} placeholder="DD-MM-YYYY" min={from} disabled={from ? false : true} onChange={(e)=>{setTo(e.target.value)}}/>
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
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>

    </>)
}

export default FacultyParticipation