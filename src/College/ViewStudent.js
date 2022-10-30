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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import ModeSharpIcon from '@mui/icons-material/ModeSharp';
import moment from 'moment'
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from './DeleteModal2'
import { useReactToPrint } from 'react-to-print';
import { doAddBulkStudentDetails, doGetAllFDP, doGetAllStudent,doAddStudentFilter } from "../Services/ApiServices";
import * as action from "../Redux/action";
import { useDispatch, useSelector } from 'react-redux'

import Breadcrumb from './Breadcrumb';
import * as XLSX from "xlsx"
import Navbar from "./Navbar"
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import swal from 'sweetalert';
const ViewStudent = () => {
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
    const [branch, setBranch] = useState(null)
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const [starting, setStarting] = useState(null)
    const [ending, setEnding] = useState(null)
    const [change,setChange] = useState(false)
    const [call,setCall] = useState(false)

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Student report",
    });
    const { val } = useSelector((state) => state.toggle);
    
    
    // const converting = (selected) => {
    //     var date = selected;
    //     var datearray = date.split("-");
    
    //     var newdate = datearray[2] + '-' + datearray[1] + '-' + datearray[0];
    //     return newdate
    //   };

    const convert = (selected) => {
        const day = selected.getDate();
        const month =
          selected.getMonth() >=9
            ? selected.getMonth() + 1
            : `0${selected.getMonth() + 1}`;
        const yearr = selected.getFullYear();
    
        return `${day}-${month}-${yearr}`;
      };

      

    // useEffect(()=>{
    //     if(start || end){
    //         setStarting(moment(start).format('DD-MM-YYYY'));
    //         setEnding(moment(end).format('DD-MM-YYYY'));
    //     }
    // },[start,end])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        let obj = {
            college_email : email ? email : null,
            branch : branch == "Select the Branch" || branch == "" ? null : branch,
            starting_date: start ? convert(start) : null,
            end_date:end ? convert(end) : null,
        }
        console.log(obj);
        doAddStudentFilter(obj)
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
    // const handleFile = (e) => {
    //     const file = e.target.files[0];
    // const promise = new Promise((resolve, reject) => {

    //     const fileReader = new FileReader();
    //     fileReader.readAsArrayBuffer(file);
    //     fileReader.onload = (e) => {
    //         const bufferArray = e.target.result;
    //         const wb = XLSX.read(bufferArray, { type: 'buffer' });
    //         const wsname = wb.SheetNames[0];
    //         const ws = wb.Sheets[wsname];
    //         const data = XLSX.utils.sheet_to_json(ws);
    //         resolve(data);
    //     }
    //     fileReader.onerror = (error) => {
    //         reject(error);
    //     }
    // })
    // promise.then((d) => {
    //     console.log(d);
    //     setStudentData(d);
    // })

    // }

    useEffect(() => {
        getAllStudents();
        if(change){
            setChange(false);
        }
        if(call){
            setCall(false);
        }
    }, [val,change,call])

    const getAllStudents = () => {
        
        if(email==null && branch==null && start=="" && end==""){
            console.log("waah bhai");
            doGetAllStudent().then((res) => {
                console.log(res);
                setStudentData(res.data);
            }).catch((e) => {
                console.log(e);
                if (e.status == 403) {
                    localStorage.clear();
                    navigate("/")
                }
            })
        }else{
            let obj = {
                email: email ? email : null,
                branch:branch == "Select the Branch" || branch == "" ? null : branch,
                starting_date: start ? convert(start) : null,
                end_date: end ? convert(end) : null,
            }
            console.log(obj);
            doGetAllStudent(obj).then((res) => {
                console.log(res);
                setStudentData(res.data);
            }).catch((e) => {
                console.log(e);
                if (e.status == 403) {
                    localStorage.clear();
                    navigate("/")
                }
            })
        }
        
    }

    const handleRemove = (e) =>{
        e.preventDefault();
        setEmail("");
        setBranch("");
        setEnd(null);
        setStart(null);
        setCall(true);
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
                            View Students
                        </Card.Title>
                    </div>
                    <div className="py-2">
                        <Card  >
                            <Card.Body>
                                <Form onSubmit={(e) => { handleSubmit(e) }}>
                                    <Row>
                                        <Col xs={12} md={4}>
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control autoFocus={true} type="email" value={email} placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Section</Form.Label>
                                                <Form.Control  type="text" value={branch} placeholder="Enter the Section" onChange={(e) => setBranch(e.target.value)} />
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
                                    <Row style={{ display: "flex", justifyContent: "flex-end" }} >
                                        <Col xs={12} style={{ width: "fit-content" }}>
                                            <div className='mb-4 px-3'></div>
                                            <Button type='button' variant="secondary" onClick={handleRemove} >
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
                        </Card>
                    </div>

                    <div style={{ display: "flex" }}>
                        <div className='px-3'>
                            <Button variant="success" className='mb-2' onClick={handlePrint}>
                                Generate Report
                            </Button>
                        </div>
                    </div>
                    <Card ref={componentRef}>
                        <Card.Body>
                            <div className="table-responsive">
                                <Table className="table" style={{ height: "50vh" }}>
                                    <thead className="table-light">
                                        <tr>
                                            <th className="text-center">#</th>
                                            <th className="text-center">Name</th>
                                            <th className="text-center">College Mail ID</th>
                                            <th className="text-center">University Roll Number</th>
                                            <th className="text-center">Course</th>
                                            <th className="text-center">Year</th>
                                            <th className="text-center">Section</th>
                                            <th className="text-center">Mobile Number</th>
                                            <th className="text-center">Name of Activity</th>
                                            <th className="text-center">Venue of Activity</th>
                                            <th className="text-center">Duration</th>
                                            <th className="text-center">From</th>
                                            <th className="text-center">To</th>
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
                                                        <td className="text-center"> {item.roll_no === "" ? "" : item.roll_no} </td>
                                                        <td className="text-center"> {item.course === "" ? "" : item.course} </td>
                                                        <td className="text-center"> {item.year === "" ? "" : item.year} </td>
                                                        <td className="text-center"> {(item.branch === "") ? "" : item.branch} </td>
                                                        <td className="text-center"> {item.phone_number === "" ? "" : item.phone_number} </td>
                                                        <td className="text-center"> {item.name_of_activity === "" ? "" : item.name_of_activity} </td>
                                                        <td className="text-center"> {item.venue_of_activity === "" ? "" : item.venue_of_activity} </td>
                                                        <td className="text-center"> {item.number_of_days === "" ? "" : item.number_of_days} </td>
                                                        <td className="text-center"> {item.starting_date.split(" ")[0] === "" ? "" : (item.starting_date.split(" ")[0])} </td>
                                                        <td className="text-center"> {item.end_date.split(" ")[0] === "" ? "" : (item.end_date.split(" ")[0])} </td>
                                                        <td className="text-center"> {item.remarks === "" ? "" : item.remarks} </td>
                                                        <td className="text-center">
                                                            <UncontrolledDropdown>
                                                                <DropdownToggle href="#" className="card-drop" tag="i">
                                                                    <div className="align-middle me-1">
                                                                        <MoreVertIcon />
                                                                    </div>
                                                                </DropdownToggle>
                                                                <DropdownMenu className="dropdown-menu-end">
                                                                    <Link to={`/stform/${item.id}`} style={{ textDecoration: "none" }} >
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

export default ViewStudent