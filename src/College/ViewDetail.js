import React, { useState, useEffect, useRef } from 'react'
import { Button, Container } from 'react-bootstrap';
import { Card, Alert, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { doGetDetailById } from '../Services/ApiServices';
import swal from 'sweetalert';
import Navbar from "./Navbar"
const ViewDetail = () => {
    const [name, setName] = useState(null);
    const [department, setDepartment] = useState(null);
    const [email, setEmail] = useState(null);
    const [mobile, setMobile] = useState(null);
    const [designation, setDesignation] = useState(null);
    const [ftype, setFtype] = useState(null);
    const [online, setOnline] = useState(null);
    const [remarks,setRemarks] = useState("");
    const [offline, setOffline] = useState(null);
    const [incentive, setIncentive] = useState(null);
    const [flag1, setFlag1] = useState(true);
    const [flag2, setFlag2] = useState(true);
    const [start,setStart] = useState("");
    const [end,setEnd] = useState("");
    const [venue,setVenue] = useState("");
    const [cernum,setCernum] = useState("");
    const [state,setState] = useState(true);
    const [days,setDays] = useState("")
    const [fdpname,setFdpName] = useState(null);

    const componentRef = useRef();
    const navigate = useNavigate();
    const {id} = useParams();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Detail",
        onBeforeGetContent : () => setState(false), 
        onBeforePrint : () => setState(false),
        onAfterPrint: () => setState(true),
    });
    
    useEffect(()=>{
        getDetailByID();
    },[id]);

    const getDetailByID = () =>{
        doGetDetailById(Number(id)).then((res) => {
           console.log(res);
           setName(res.data.name);
           setDepartment(res.data.department);
           setEmail(res.data.college_email);
           setMobile(res.data.phone_number);
           setDesignation(res.data.designation);
           setFtype(res.data.fdp_type);
           setOffline(res.data.face_to_face_fdp);
           setOnline(res.data.online_fdp);
           setIncentive(res.data.incentive_detail);
           setStart(res.data.starting_date);
           setEnd(res.data.end_date);
           setVenue(res.data.venue);
           setCernum(res.data.certificate_number);
           setDays(res.data.number_of_days)
           setRemarks(res.data.remarks);
        }).catch((e) => {
            console.log(e);
            if(e.status==403){
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

    useEffect(()=>{
        if(offline!=""){
            setFdpName(offline);
        }else{
            setFdpName(online);
        }
    },[offline,online])
   

    const handleClick = (e) =>{
        e.preventDefault();
        navigate(`/form/${id}`)
    }

    return (<>
            <Navbar />
            <div style={{ display: "flex", justifyContent: "center",alignItems:"center" }}  className="w-100 w-sm-50">
                <h3 style={{ textAlign: "center", marginTop: "1%", }} className="py-1 px-5 mx-5">View Details</h3>
                <div style={{ float:"right"}}> <Button variant="primary" type="button"  className=' mt-2 w-sm-100 ' onClick={handlePrint}>
                    Print
                </Button>
                 </div>
                
            </div>
            <div  style={{ display: "flex", justifyContent: "center", alignItem: "center", height: "100%", maxWidth: "95vw", padding: "2px" }}>
                <Card className='w-75 h-100 mt-3'>
                    <Card.Body className='w-100'>
                    <Container ref={componentRef}>
                        <Row className='mb-3 mt-3'>
                            <Card.Title>
                                Faculty Detail
                            </Card.Title>
                        </Row>
                        <Row>
                            <div className="table-rep-plugin">
                                <div
                                    className="table-responsive mb-0"
                                    data-pattern="priority-columns"
                                >
                                    <Table
                                        id="tech-companies-1"
                                        className="table table-striped table-bordered"
                                    >
                                        <Tbody>
                                            <Tr>
                                                <Th>Name</Th>
                                                <Td>{name}</Td>
                                            </Tr>
                                            <Tr>
                                                <Th>Department</Th>
                                                <Td>{department}</Td>
                                            </Tr>
                                            <Tr>
                                                <Th>College mail Id</Th>
                                                <Td>{email}</Td>
                                            </Tr>
                                            <Tr>
                                                <Th>Mobile Number</Th>
                                                <Td>{mobile}</Td>
                                            </Tr>
                                            <Tr>
                                                <Th>Designation</Th>
                                                <Td>{designation}</Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </div>
                            </div>
                        </Row>
                        <Row className='mb-3 mt-3'>
                            <Card.Title>
                                FDP Type
                            </Card.Title>
                        </Row>
                        <Row>
                            <div className="table-rep-plugin">
                                <div
                                    className="table-responsive mb-0"
                                    data-pattern="priority-columns"
                                >
                                    <Table
                                        id="tech-companies-1"
                                        className="table table-striped table-bordered"
                                    >
                                        <Tbody>
                                            <Tr>
                                                <Th>FDP type</Th>
                                                <Td>{ftype}</Td>
                                            </Tr>
                                            <Tr>
                                                <Th>{ftype}</Th>
                                                <Td>{fdpname}</Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </div>
                            </div>
                        </Row>
                        <Row className='mb-3 mt-3'>
                            <Card.Title>
                                FDP Detail
                            </Card.Title>
                        </Row>
                        <Row>
                            <div className="table-rep-plugin">
                                <div
                                    className="table-responsive mb-0"
                                    data-pattern="priority-columns"
                                >
                                    <Table
                                        id="tech-companies-1"
                                        className="table table-striped table-bordered"
                                    >
                                        <Tbody>
                                            <Tr>
                                                <Th>Starting Date</Th>
                                                <Td>{start}</Td>
                                            </Tr>
                                            <Tr>
                                                <Th>End Date</Th>
                                                <Td>{end}</Td>
                                            </Tr>
                                            <Tr>
                                                <Th>Number of Days</Th>
                                                <Td>{days}</Td>
                                            </Tr>
                                            <Tr>
                                                <Th>Venue</Th>
                                                <Td>{venue}</Td>
                                            </Tr>
                                            <Tr>
                                                <Th>AICTE/AKTU Certificate Number</Th>
                                                <Td>{cernum}</Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </div>
                            </div>
                        </Row>
                        <Row className='mb-3 mt-3'>
                            <Card.Title>
                                Incentive Detail
                            </Card.Title>
                        </Row>
                        <Row>
                            <div className="table-rep-plugin">
                                <div
                                    className="table-responsive mb-0"
                                    data-pattern="priority-columns"
                                >
                                    <Table
                                        id="tech-companies-1"
                                        className="table table-striped table-bordered"
                                    >
                                        <Tbody>
                                            <Tr>
                                                <Th>Incentive Detail</Th>
                                                <Td>{incentive}</Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </div>
                            </div>
                        </Row>
                        <Row className='mb-3 mt-3'>
                            <Card.Title>
                                Remarks
                            </Card.Title>
                        </Row>
                        <Row>
                            <div className="table-rep-plugin">
                                <div
                                    className="table-responsive mb-0"
                                    data-pattern="priority-columns"
                                >
                                    <Table
                                        id="tech-companies-1"
                                        className="table table-striped table-bordered"
                                    >
                                        <Tbody>
                                            <Tr>
                                                <Th>Remarks</Th>
                                                <Td>{remarks}</Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </div>
                            </div>
                        </Row>
                        </Container>
                         <Button variant="primary" style={{ float: "right" }} type="submit" className='mt-2  w-sm-100' onClick={handleClick}>
                            Edit
                        </Button> 
                    </Card.Body>
                </Card>
            </div>
        
    </>
    );
}

export default ViewDetail;