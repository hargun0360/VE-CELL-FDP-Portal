import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import {
    Container,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Table,
    UncontrolledDropdown,
    Card,
    CardBody,
    CardTitle,
    Row,

} from "reactstrap"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import ModeSharpIcon from '@mui/icons-material/ModeSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from './DeleteModal2'
import { doAddBulkStudentDetails, doGetAllFDP, doGetAllStudent } from "../Services/ApiServices";
import * as action from "../Redux/action";
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import * as XLSX from "xlsx"

const ViewStudent = () => {
    const [show, setShow] = useState(false);
    const [studentData, setStudentData] = useState([]);
    const [loader, setLoader] = useState(false)
    let students = [];
    const [deleteModal, setDeleteModal] = useState(false)
    const [id, setId] = useState(null)
    const dispatch = useDispatch();
    const [details,setDetails] = useState([]);
    const { val } = useSelector((state) => state.toggle);
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);
    let cnt = 0;
    const handleFile = (e) => {
        const file = e.target.files[0];
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: 'buffer' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);
                resolve(data);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
        promise.then((d) => {
            console.log(d);
            setStudentData(d);
        })
    }

    useEffect(()=>{
        getAllStudents();
    },[val])

    const getAllStudents = () => {
        doGetAllStudent().then((res) => {
            setDetails(res.data);
        }).catch((e) => {
            console.log(e);
        })
    }

    const handleFileSubmit = (e) => {
        e.preventDefault();
        if (studentData.length > 0) {
            studentData.forEach(function (data) {
                students.push({
                    name: data['Name'],
                    branch: data['Branch'],
                    year: data['Year'],
                    section: data['Section'],
                    mobile_number: data['Mobile Number'],
                    name_of_activity: data['Name of Activity'],
                    venue_of_activity: data['Venue of Activity'],
                    duration: data['Duration'],
                    from: data['From'],
                    to: data['To'],
                    remarks: data['Remarks'],
                })
            });
        }
        if(students.length>0){
             // post the data through API
             doAddBulkStudentDetails(students)
             .then((res)=>{
                console.log(res);
                setDetails(res.data);
             }).catch((e)=>{
                console.log(e);
             })
        }
        setShow(false);
    }
    return (
        <div>
            <React.Fragment>
            <DeleteModal
                show={deleteModal} setShow={setDeleteModal} setLoading={setLoader} id={id}
            />
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <Form onSubmit={handleFileSubmit}>
                            <Row>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                    <Form.Label >Add Student</Form.Label>
                                    <Form.Control type="file" accept='.xlsx' name='student' required onChange={handleFile} />
                                </Form.Group>
                            </Row>
                            <Row style={{float:"right"}} className="px-2">
                                <Button type='submit' className="w-100" variant="success">
                                    Submit
                                </Button>
                            </Row>
                        </Form>
                    </Modal.Body>
                </Modal>
                <Container fluid>
                    <CardTitle className="py-1 pt-3 mb-1">
                        <h4 className="font-size-20">Student Details</h4>
                    </CardTitle>
                    <Button variant="success" className='mb-2' onClick={handleShow}>
                        Add Students
                    </Button>               
                    <Card>
                        <CardBody>
                            <div className="table-responsive">              
                                <Table className="table" style={{ height: "50vh" }}>
                                    <thead className="table-light">
                                        <tr>
                                            <th className="text-center">#</th>
                                            <th className="text-center">Name</th>
                                            <th className="text-center">Branch</th>
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
                                            students.length > 0 && details.length > 0 ? details.map((item) => (
                                                <>
                                                    <tr>
                                                        <td className="text-center">{++cnt}</td>
                                                        <td className="text-center"> {item.name === "" ? "" : item.name} </td>
                                                        <td className="text-center"> {item.branch === "" ? "" : item.branch} </td>
                                                        <td className="text-center"> {item.year === "" ? "" : item.year} </td>
                                                        <td className="text-center"> {item.section === "" ? "" : item.section} </td>
                                                        <td className="text-center"> {item.mobile_number === "" ? "" : item.mobile_number} </td>
                                                        <td className="text-center"> {item.name_of_activity === "" ? "" : item.name_of_activity} </td>
                                                        <td className="text-center"> {item.venue_of_activity === "" ? "" : item.venue_of_activity} </td>
                                                        <td className="text-center"> {item.duration === "" ? "" : item.duration} </td>
                                                        <td className="text-center"> {item.from === "" ? "" : item.from} </td>
                                                        <td className="text-center"> {item.to === "" ? "" : item.to} </td>
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
                        </CardBody>
                    </Card>
                </Container>
            </React.Fragment>
        </div>
    )
}

export default ViewStudent