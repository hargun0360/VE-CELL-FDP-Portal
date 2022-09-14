import React, { useState, useEffect, useRef } from 'react'
import { Button, Container } from 'react-bootstrap';
import { Card, Alert, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ViewDetail = () => {
    const [name, setName] = useState(null);
    const [department, setDepartment] = useState(null);
    const [email, setEmail] = useState(null);
    const [mobile, setMobile] = useState(null);
    const [designation, setDesignation] = useState(null);
    const [ftype, setFtype] = useState(null);
    const [online, setOnline] = useState(null);
    const [offline, setOffline] = useState(null);
    const [incentive, setIncentive] = useState(null);
    const [remarks, setRemarks] = useState(null);
    const [flag1, setFlag1] = useState(true);
    const [flag2, setFlag2] = useState(true);
    const [state,setState] = useState(true);
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
    const handleReset = () =>{
        navigate("/reset");
    }
    return (<>
        
            <div style={{ display: "flex", justifyContent: "center",alignItems:"center" }}  className="w-100 w-sm-50">
                <h3 style={{ textAlign: "center", marginTop: "1%", }} className="py-1 px-5 mx-5">View Details</h3>
               { !id ? <div style={{ float:"right"}}> <Button variant="primary" type="button"  className=' mt-2 w-sm-100 ' onClick={handlePrint}>
                    Print
                </Button>
                <Button variant="primary" type="button"  className=' mt-2 w-sm-100 mx-4' onClick={handleReset} >
                    Reset Password
                </Button>
                 </div>: null}
                
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
                                                <Td>Gopal Babu</Td>
                                            </Tr>
                                            <Tr>
                                                <Th>Department</Th>
                                                <Td>Electronics and Communication Engineering</Td>
                                            </Tr>
                                            <Tr>
                                                <Th>College mail Id</Th>
                                                <Td>GopalBabu2022@akgec.ac.in</Td>
                                            </Tr>
                                            <Tr>
                                                <Th>Mobile Number</Th>
                                                <Td>9956118028</Td>
                                            </Tr>
                                            <Tr>
                                                <Th>Designation</Th>
                                                <Td>HOD</Td>
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
                                                <Td>Face to Face FDP</Td>
                                            </Tr>
                                            <Tr>
                                                <Th>Face to Face FDP</Th>
                                                <Td>AKTU 10 days FDP on UHBC (UHV-III)</Td>
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
                                                <Td>10/09/2022</Td>
                                            </Tr>
                                            <Tr>
                                                <Th>End Date</Th>
                                                <Td>20/09/2022</Td>
                                            </Tr>
                                            <Tr>
                                                <Th>Number of Days</Th>
                                                <Td>10</Td>
                                            </Tr>
                                            <Tr>
                                                <Th>Venue</Th>
                                                <Td>27th KM Milestone, Delhi - Meerut Expy, Ghaziabad, Uttar Pradesh 201009</Td>
                                            </Tr>
                                            <Tr>
                                                <Th>AICTE/AKTU Certificate Number</Th>
                                                <Td>2000270130065</Td>
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
                                                <Td>AICTE UHV-IV (15,000)</Td>
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
                                                <Td>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </div>
                            </div>
                        </Row>
                        </Container>
                        {id ? <Button variant="primary" style={{ float: "right" }} type="submit" className='mt-2  w-sm-100'>
                            Update
                        </Button> : null}
                    </Card.Body>
                </Card>
            </div>
        
    </>
    );
}

export default ViewDetail;