import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from "react-router-dom"
import {
    Container,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Table,
    UncontrolledDropdown,

} from "reactstrap"
import { Card } from "react-bootstrap"
import moment from 'moment'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeSharpIcon from '@mui/icons-material/ModeSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from './DeleteModal3'
import { useReactToPrint } from 'react-to-print';
import {  doAddFacultyFilter, doGetAllFaculty, doGetAllFDP, doGetAllStudent } from "../Services/ApiServices";
import * as action from "../Redux/action";
import { useDispatch, useSelector } from 'react-redux'
import Navbar from "./Navbar"
import swal from 'sweetalert';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
const ViewFacultyParticipation = () => {
    const [show, setShow] = useState(false);
    const [studentData, setStudentData] = useState([]);
    const [loader, setLoader] = useState(false)
    const [file, setFile] = useState(null);
    let students = [];
    const [flag, setFlag] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [id, setId] = useState(null)
    const dispatch = useDispatch();
    const [details, setDetails] = useState([]);
    const navigate = useNavigate()
    const [email, setEmail] = useState(null)
    const [department, setDepartment] = useState(null)
    const [starting, setStarting] = useState(null)
    const [ending, setEnding] = useState(null)
    const [start, setStart] = useState("")
    const [change, setChange] = useState(false)
    const [end, setEnd] = useState("")
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Student report",
    });
    const { val } = useSelector((state) => state.toggle);


    useEffect(() => {
        if (start || end) {
            setStarting(moment(start).format('DD-MM-YYYY'));
            setEnding(moment(end).format('DD-MM-YYYY'));
        }
    }, [start, end])


    const handleSubmit = (e) => {

        e.preventDefault()
        let obj = {
            email,
            department : department == "Select the Department" ? null : department,
            start_date: starting == "Invalid date" ? null : starting,
            end_date: ending == "Invalid date" ? null : ending
        }
        console.log(obj);

        doAddFacultyFilter(obj)
            .then((res) => {
                console.log(res);
                setChange(true);
                swal({
                    title: "Filter Added Successfully",
                    text: "",
                    icon: "success",
                    button: "OK",
                });
            }).catch((e) => {
                console.log(e);
                setChange(false);
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
    let cnt = 0;

    useEffect(() => {
        getAllFaculty();
        if(change){
            setChange(false);
        }
    }, [val, flag,change])

    const getAllFaculty = () => {
        let obj = {
            email,
            department:department == "Select the Department" ? null : department,
            start_date: starting == "Invalid date" ? null : starting,
            end_date: ending == "Invalid date" ? null : ending
        }
        doGetAllFaculty(obj).then((res) => {
            setStudentData(res.data);
        }).catch((e) => {
            console.log(e);
            if (e.status == 403) {
                localStorage.clear();
                navigate("/")
            }
        })
    }





    return (
        <div>
            <React.Fragment>
                <Navbar />
                <DeleteModal
                    show={deleteModal} setShow={setDeleteModal} setLoading={setLoader} id={id}
                />
                <Container fluid>
                    <div className='py-3'>
                        <Card.Title>
                            View Faculty Participation
                        </Card.Title>
                    </div>
                    <div className="py-2">
                        <Card >
                            <Card.Body>
                                <Form onSubmit={(e) => handleSubmit(e)}>
                                    <Row>
                                        <Col xs={12} md={2}>
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control autoFocus={true} type="email" value={email} placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Department</Form.Label>
                                                <Form.Select className='mb-3' value={department} aria-label="Default select example" onChange={(e) => setDepartment(e.target.value)}>
                                                    <option value="Select the Department">Select the Department</option>
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
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={2}>
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label>Start Date</Form.Label>
                                                <Form.Control autoFocus={true} type="date" value={start} min={'01-01-2009'} onChange={(e) => setStart(e.target.value)} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={2}>
                                            <Form.Group controlId="formBasicName">``
                                                <Form.Label>End Date</Form.Label>
                                                <Form.Control autoFocus={true} type="date" value={end} min={start} onChange={(e) => setEnd(e.target.value)} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={2} >
                                            <div className='mb-4 py-1'></div>
                                            <Button type='submit' variant="success">
                                                Add Filter
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                    <div>
                        <Button variant="success" className='mb-2' onClick={handlePrint}>
                            Generate Report
                        </Button>
                    </div>
                    <Card ref={componentRef}>
                        <Card.Body>
                            <div className="table-responsive">
                                <Table className="table" style={{ height: "50vh" }}>
                                    <thead className="table-light">
                                        <tr>
                                            <th className="text-center">#</th>
                                            <th className="text-center">Name</th>
                                            <th className="text-center">Email</th>
                                            <th className="text-center">Department</th>
                                            <th className="text-center">Event Name</th>
                                            <th className="text-center">Venue</th>
                                            <th className="text-center">From</th>
                                            <th className="text-center">To</th>
                                            <th className="text-center">Duration</th>
                                            <th className="text-center">Role of Faculty</th>
                                            <th className="text-center">Remarks</th>
                                            <th className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            studentData.length > 0 ? studentData.map((item) => (
                                                <>
                                                    <tr>
                                                        <td className="text-center">{++cnt}</td>
                                                        <td className="text-center"> {item.name === "" ? "" : item.name} </td>
                                                        <td className="text-center"> {item.email === "" ? "" : item.email} </td>
                                                        <td className="text-center"> {item.department === "" ? "" : item.department} </td>
                                                        <td className="text-center"> {item.name_of_event === "" ? "" : item.name_of_event} </td>
                                                        <td className="text-center"> {item.venue_of_activity === "" ? "" : item.venue_of_activity} </td>
                                                        <td className="text-center"> {item.starting_date === "" ? "" : item.starting_date} </td>
                                                        <td className="text-center"> {item.end_date === "" ? "" : item.end_date} </td>
                                                        <td className="text-center"> {item.duration === "" ? "" : item.duration} </td>
                                                        <td className="text-center"> {item.role === "" ? "" : item.role} </td>
                                                        <td className="text-center"> {item.remarks === "" ? "" : item.remarks} </td>
                                                        <td className="text-center">
                                                            <UncontrolledDropdown>
                                                                <DropdownToggle href="#" className="card-drop" tag="i">
                                                                    <div className="align-middle me-1">
                                                                        <MoreVertIcon />
                                                                    </div>
                                                                </DropdownToggle>
                                                                <DropdownMenu className="dropdown-menu-end">
                                                                    <Link to={`/participation/${item.id}`} style={{ textDecoration: "none" }} >
                                                                        <DropdownItem>
                                                                            {" "}
                                                                            <ModeSharpIcon sx={{ color: "blue" }} />{" "}&ensp;
                                                                            {("Edit")}{" "}
                                                                        </DropdownItem>
                                                                    </Link>
                                                                    <DropdownItem divider />
                                                                    <DropdownItem tag="button" onClick={() => {
                                                                        setDeleteModal(true);
                                                                        setId(item.id)
                                                                        dispatch(action.flag(false))
                                                                    }}>
                                                                        {" "}
                                                                        <DeleteIcon sx={{ color: "red" }} />{" "}&ensp;
                                                                        {("Delete")}{" "}
                                                                    </DropdownItem>
                                                                </DropdownMenu>
                                                            </UncontrolledDropdown>
                                                        </td>
                                                    </tr>
                                                </>
                                            )) : null
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
            </React.Fragment>
        </div>
    )
}

export default ViewFacultyParticipation