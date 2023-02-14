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
import PersonRemove from '@mui/icons-material/PersonRemove';
import ModeSharpIcon from '@mui/icons-material/ModeSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from './DeleteModal'
import { doAddFDPFilter, doGetAllFDP } from "../Services/ApiServices";
import * as action from "../Redux/action";
import { useDispatch, useSelector } from 'react-redux'
import swal from "sweetalert";
import Spinner from '../Components/Spinner'
import Breadcrumb from './Breadcrumb';
import ResignModal from "./ResignModal";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Navbar from "./Navbar"
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
const ViewFDP = () => {
    const [loader, setLoader] = useState(false)
    const [project, setProject] = useState(null)
    const [modal, setModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [email, setEmail] = useState(null)
    const [department, setDepartment] = useState(null)
    const [incentive, setIncentive] = useState(null)
    const [state, setState] = useState(true)
    const [starting, setStarting] = useState(null)
    const [ending, setEnding] = useState(null)
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const [type, setType] = useState(null)
    const [venue, setVenue] = useState(null)
    const [change, setChange] = useState(false)
    const [loading, setLoading] = useState(false)
    const [fdp, setFdp] = useState("");
    const [online, setOnline] = useState("");
    const [offline, setOffline] = useState("");
    const [call, setcall] = useState(false);
    const [idResign, setIdResign] = useState(null)
    const [emailResign, setEmailResign] = useState(null);
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
    const [resignModal, setResignModal] = useState(false)
    const [admin, setAdmin] = useState(false);

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
        getFDP();
        if (change) {
            setChange(false)
        }
        if (call) {
            setcall(false)
        }
    }, [val, change, call]);

    const converting = (selected) => {
        var date = selected;
        var datearray = date.split("-");

        var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
        return newdate
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        let obj = {
            college_email: email.toLowerCase(),
            department: department == "Select the Department" || department == "" ? null : department,
            fdp_type: fdp == "Select the FDP type" || fdp == "" ? null : fdp,
            face_to_face_fdp: offline == "Select the Face to Face FDP" || offline == "" ? null : offline,
            online_fdp: online == "Select the Online FDP type" || online == "" ? null : online,
            incentive_detail: incentive == "Select the Incentive Details" || incentive == "" ? incentive : null,
            starting_date: start ? convert(start) : null,
            end_date: end ? convert(end) : null,
            venue,
        }
        console.log(obj);
        doAddFDPFilter(obj)
            .then((res) => {
                // console.log(res);
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

    useEffect(() => {
        if (localStorage.getItem("admin") == "true") {
            setAdmin(true);
        }
    }, [])

    const handleRemove = (e) => {
        e.preventDefault();
        setEmail("");
        setDepartment("");
        setStart("");
        setEnd("");
        setIncentive("");
        setFdp("");
        setOnline("");
        setOffline("");
        setcall(true);
    }



    // Get All FDP

    const getFDP = () => {
        let obj = {
            college_email: email ? email.toLowerCase() : null,
            department: department == "Select the Department" || department == "" ? null : department,
            fdp_type: fdp == "Select the FDP type" || fdp == "" ? null : fdp,
            face_to_face_fdp: offline == "Select the Face to Face FDP" || offline == "" ? null : offline,
            online_fdp: online == "Select the Online FDP type" || online == "" ? null : online,
            incentive_detail: incentive == "Select the Incentive Details" || incentive == "" ? null : incentive,
            starting_date: start ? convert(start) : null,
            end_date: end ? convert(end) : null,
            venue,
        }
        setLoading(true)
        doGetAllFDP(obj).then((res) => {
            setDetails(res.data);
            setLoading(false)
        }).catch((e) => {
            console.log(e);
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

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "FDP report",
        onBeforePrint: () => setState(false),
        onAfterPrint: () => setState(true),
    });

    if (details.length) {
        // console.log(details);
    }



    const [id, setId] = useState(null)


    return (
        <React.Fragment>

            <Navbar />
            <DeleteModal
                show={deleteModal} setShow={setDeleteModal} setLoading={setLoading} id={id}
            />
            <ResignModal
                show={resignModal} setShow={setResignModal} setLoading={setLoading} id={idResign} email={emailResign}
            />
            <div className="w-100 h-100 pb-3">

                <Container fluid>
                    {
                        loading ? <Spinner /> : null
                    }
                    <Card.Title className="pt-3">
                        View FDP
                    </Card.Title>



                    <div className="py-2">

                        <div
                            className="alert alert-success text-center mb-4"
                            role="alert"
                            style={{ fontWeight: "500", display: "flex", justifyContent: "flex-start" }}
                        > * You can add another FDP as well! Please click on (Add FDP)</div>

                        {admin ? <Card >
                            <Card.Body>
                                <Form onSubmit={(e) => handleSubmit(e)}>
                                    <Row>
                                        <Col xs={12} md={4}>
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
                                                <DatePicker dateFormat={'dd-MM-yyyy'} adjustDateOnChange dropdownMode="select" showMonthDropdown selected={start} showYearDropdown onChange={(date) => setStart(date)} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={2}>
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label>End Date</Form.Label>
                                                <DatePicker dateFormat={'dd-MM-yyyy'} adjustDateOnChange showMonthDropdown showYearDropdown selected={end} onChange={(date) => setEnd(date)} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} md={3}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Incentive Detail</Form.Label>
                                                <Form.Select className='mb-3' value={incentive} aria-label="Default select example" onChange={(e) => setIncentive(e.target.value)}>
                                                    <option value="Select the Incentive Details">Select the Incentive Details</option>
                                                    <option value="AKTU Level-2 (10,000)">AKTU Level-2 (10,000)</option>
                                                    <option value="AKTU Level-3 (15,000)">AKTU Level-3 (15,000)</option>
                                                    <option value="AICTE UHV-III (10,000)">AICTE UHV-III (10,000)</option>
                                                    <option value="AICTE UHV-IV (15,000)">AICTE UHV-IV (15,000)</option>
                                                    <option value="Not Taken Yet">Not Taken Yet</option>
                                                    <option value="Not Eligible">Not Eligible</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={2}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>FDP type</Form.Label>
                                                <Form.Select className='mb-3' value={fdp} aria-label="Default select example" onChange={(e) => setFdp(e.target.value)} >
                                                    <option>Select the FDP type</option>
                                                    <option value="Online">Online</option>
                                                    <option value="Face to Face FDP">Face to Face FDP</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={3}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Face to Face FDP</Form.Label>
                                                <Form.Select className='mb-3' value={offline} aria-label="Default select example" onChange={(e) => setOffline(e.target.value)}  >
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
                                                    <option value="AICTE 5 days UHV II Refresher">AICTE 5 days UHV II Refresher</option>
                                                    <option value="AICTE 8 days UHV Refresher 1 (Part 1 & 2)">AICTE 8 days UHV Refresher 1 (Part 1 & 2)</option>
                                                    <option value="AKTU 10 days Refresher 2">AKTU 10 days Refresher 2</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Online FDP</Form.Label>
                                                <Form.Select className='mb-3' value={online} aria-label="Default select example" onChange={(e) => setOnline(e.target.value)} >
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
                                    <Row style={{ display: "flex", justifyContent: "flex-end" }} >
                                        <Col xs={12} style={{ width: "fit-content" }}>
                                            <div className='mb-4 px-3'></div>
                                            <Button type='button' variant="secondary" onClick={handleRemove}>
                                                Remove Filter
                                            </Button>
                                        </Col>
                                        <Col xs={12} style={{ width: "fit-content" }}>
                                            <div className='mb-4'></div>
                                            <Button type='submit' variant="success">
                                                Add Filter
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card> : null}
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
                                            <th className="text-center">Department</th>
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
                                            details.length > 0 ? details.map((item) => (
                                                <>{
                                                   admin == false || item.resigned == false ?

                                                        <tr>
                                                            <td className="text-center">{++cnt}</td>
                                                            <td className="text-center"> {item.name === null ? "" : item.name} </td>
                                                            <td className="text-center"> {item.department === null ? "" : item.department} </td>
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
                                                                        {admin ? <> <DropdownItem divider />
                                                                        <DropdownItem tag="button" onClick={() => {
                                                                            setResignModal(true);
                                                                            setIdResign(item.id)
                                                                            setEmailResign(item.college_email);
                                                                            dispatch(action.flag(false))
                                                                        }}>
                                                                            {" "}
                                                                            <PersonRemove sx={{ color: "black" }} />{" "}&ensp;
                                                                            {("Resign")}{" "}
                                                                        </DropdownItem> </> : null}
                                                                    </DropdownMenu>
                                                                </UncontrolledDropdown>
                                                            </td> : null}
                                                        </tr>
                                                        : null}</>
                                            ))
                                                : null}
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

