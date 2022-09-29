import React, { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
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
import { useReactToPrint } from 'react-to-print';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import ModeSharpIcon from '@mui/icons-material/ModeSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from './DeleteModal'
import { doGetAllFDP } from "../Services/ApiServices";
import * as action from "../Redux/action";
import { useDispatch, useSelector } from 'react-redux'
import swal from "sweetalert";
import Spinner from '../Components/Spinner'
import Breadcrumb from './Breadcrumb';
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Navbar from "./Navbar"
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
const ViewFDP = () => {
    const [loader, setLoader] = useState(false)
    const [project, setProject] = useState(null)
    const [modal, setModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [name, setName] = useState("")
    const [department, setDepartment] = useState(null)
    const [incentive, setIncentive] = useState(null)
    const [state,setState] = useState(true)
    const [starting, setStarting] = useState(null)
    const [ending, setEnding] = useState(null)
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const [venue,setVenue] = useState("")
    const componentRef = useRef();

    const [menu, setMenu] = useState({
        id: null,
        open: false
    });
    let cnt = 0;
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { val } = useSelector((state) => state.toggle);
    const [details, setDetails] = useState([]);
    // //delete order
    const [deleteModal, setDeleteModal] = useState(false)

    const [admin, setAdmin] = useState(false);

    useEffect(()=>{
        if(start || end){
            setStarting(moment(start).format('DD-MM-YYYY'));
            setEnding(moment(end).format('DD-MM-YYYY'));
        }
    },[start,end])


    const handleSubmit = (e) =>{
        e.preventDefault();
        let obj = {
            name,
            department,
            incentive,
            start : starting,
            end : ending,
            venue,
        }
        console.log(obj);
    }

    useEffect(() => {
        if (localStorage.getItem("admin") == "true") {
            setAdmin(true);
        }
    }, [])


    console.log(val);
    useEffect(() => {
        getFDP();
    }, [val]);


    // Get All FDP

    const getFDP = () => {
        doGetAllFDP().then((res) => {
            setDetails(res.data);
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

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "FDP report",
        onBeforePrint : () => setState(false),
        onAfterPrint: () => setState(true),
    });

    if (details.length) {
        console.log(details);
    }



    const [id, setId] = useState(null)


    return (
        <React.Fragment>

            <Navbar />
            <DeleteModal
                show={deleteModal} setShow={setDeleteModal} setLoading={setLoader} id={id}
            />
            <div className="w-100 h-100 pb-3">
                <Container fluid>
                    <Card.Title className="pt-3">
                        View FDP
                    </Card.Title>


                    <div className="py-2">
                        <Card >
                            <Card.Body>
                                <Form onSubmit={(e) => handleSubmit(e)}>
                                    <Row>
                                        <Col xs={12} md={2}>
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control autoFocus={true} type="text" value={name} placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Department</Form.Label>
                                                <Form.Select className='mb-3' value={department} aria-label="Default select example" onChange={(e) => setDepartment(e.target.value)}>
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
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={2}>
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label>FDP Type</Form.Label>
                                                <Form.Control autoFocus={true} type="text" value={name} placeholder="Enter your name"  onChange={(e) => setName(e.target.value)} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={2}>
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label>Start Date</Form.Label>
                                                <Form.Control autoFocus={true} type="date" value={start} min='01-01-2009' onChange={(e) => setStart(e.target.value)} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={2}>
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label>End Date</Form.Label>
                                                <Form.Control autoFocus={true} type="date" value={end} min={start} onChange={(e) => setEnd(e.target.value)} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Incentive Detail</Form.Label>
                                                <Form.Select className='mb-3' value={incentive} aria-label="Default select example" onChange={(e) => setIncentive(e.target.value)}>
                                                    <option>Select the Incentive Details</option>
                                                    <option value="AKTU Level-2 (10,000)">AKTU Level-2 (10,000)</option>
                                                    <option value="AKTU Level-3 (15,000)">AKTU Level-3 (15,000)</option>
                                                    <option value="AICTE UHV-III (10,000)">AICTE UHV-III (10,000)</option>
                                                    <option value="AICTE UHV-IV (15,000)">AICTE UHV-IV (15,000)</option>
                                                    <option value="Not Taken Yet">Not Taken Yet</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={3}>
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label>Venue</Form.Label>
                                                <Form.Control autoFocus={true} type="text" value={venue} placeholder="Venue" onChange={(e) => setVenue(e.target.value)} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={3} >
                                            <div className='mb-4 py-1'></div>
                                            <Button type='submit' variant="success">
                                                Add Filter
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                        <div className="py-2 mt-2">
                            <Button type='button' className="px-3" variant="success" onClick={handlePrint}>
                                Generate Report
                            </Button>
                        </div>
                    </div>

                    {/* Render Breadcrumbs */}
                    <Card ref={componentRef}>
                        <Card.Body>
                            <div className="table-responsive">
                                <Table className="table" style={{ height: "50vh" }}>
                                    <thead className="table-light">
                                        <tr>
                                            <th className="text-center">#</th>
                                            <th className="text-center">Name</th>
                                            <th className="text-center">FDP Type</th>
                                            <th className="text-center">FDP Name</th>
                                            <th className="text-center">Start Date</th>
                                            <th className="text-center">End Date</th>
                                            <th className="text-center">Certificate Number</th>
                                            <th className="text-center">Incentive Detail</th>
                                            {state ? <th className="text-center">Actions</th> : null}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            details.map((item) => (
                                                <>
                                                    <tr>
                                                        <td className="text-center">{++cnt}</td>
                                                        <td className="text-center"> {item.name === null ? "" : item.name} </td>
                                                        <td className="text-center"> {item.fdp_type === null ? "" : item.fdp_type} </td>
                                                        <td className="text-center"> {item.face_to_face_fdp === "" ? item.online_fdp : item.face_to_face_fdp} </td>
                                                        <td className="text-center"> {item.starting_date === null ? "" : item.starting_date} </td>
                                                        <td className="text-center"> {item.end_date === null ? "" : item.end_date} </td>
                                                        <td className="text-center"> {item.certificate_number === null ? "" : item.certificate_number} </td>
                                                        <td className="text-center"> {item.incentive_detail === null ? "" : item.incentive_detail} </td>
                                                        {state ? <td className="text-center">
                                                            <UncontrolledDropdown>
                                                                <DropdownToggle href="#" className="card-drop" tag="i">
                                                                    <div className="align-middle me-1">
                                                                        <MoreVertIcon />
                                                                    </div>
                                                                </DropdownToggle>
                                                                <DropdownMenu className="dropdown-menu-end">
                                                                    <Link to={`/view/${item.id}`} style={{ textDecoration: "none" }} >
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
                                                        </td> : null}
                                                    </tr>
                                                </>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </React.Fragment >
    )
}

export default ViewFDP

// export default OperationsDashboard;

