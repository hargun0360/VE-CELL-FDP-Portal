import React, { useState, useEffect } from 'react'
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { logDOM } from '@testing-library/react';
function CollegeForm() {
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

  useEffect(() => {
    if (ftype === "Online") {
      setFlag2(false)
      setFlag1(true)
    } else if (ftype === "Face to Face FDP") {
      setFlag1(false)
      setFlag2(true)
    } else {
      setFlag1(true)
      setFlag2(true)
    }
  }, [flag1, ftype, flag2])
  const today = new Date();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && department && email && mobile && designation && ftype && (online || offline) && incentive) {
      let obj = {
        name,
        department,
        email,
        mobile,
        designation,
        ftype,
        online,
        offline,
        incentive,
        remarks
      }
      console.log(obj);
    }
  }
  return (<>
    <h3 style={{ textAlign: "center", marginTop: "1%" }}>College Form</h3>
    <div style={{ display: "flex", justifyContent: "center", alignItem: "center", height: "100%", maxWidth: "95vw", padding: "2px" }}>
      <Card className='w-75 h-100 mt-3'>
        <Card.Body className='w-100'>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Row className='mb-3 mt-3'>
              <Card.Title>
                Faculty Detail
              </Card.Title>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" required onChange={(e) => setName(e.target.value)} />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Select className='mb-3' aria-label="Default select example" required onChange={(e) => setDepartment(e.target.value)}>
                    <option>Select the Department</option>
                    <option value="Applied Sciences & Humanities">Applied Sciences & Humanities</option>
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
              <Col xs={12} md={6}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>College mail id</Form.Label>
                  <Form.Control type="email" placeholder="name@akgec.ac.in" required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3" controlId="formBasicNumber">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control type="number" placeholder="9956118026" required minlength="8" onChange={(e) => setMobile(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3" controlId="formBasicDesignation">
                  <Form.Label>Designation</Form.Label>
                  <Form.Control type="text" placeholder="HOD,Dean,etc." required onChange={(e) => setDesignation(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
            <Row className='mb-3 mt-3'>
              <Card.Title>
                FDP type
              </Card.Title>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>FDP type</Form.Label>
                  <Form.Select className='mb-3' aria-label="Default select example" required onChange={(e) => setFtype(e.target.value)}>
                    <option>Select the FDP type</option>
                    <option value="Online">Online</option>
                    <option value="Face to Face FDP">Face to Face FDP</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Face to Face FDP</Form.Label>
                  <Form.Select className='mb-3' aria-label="Default select example" disabled={flag1} onChange={(e) => setOffline(e.target.value)}>
                    <option>Select the Face to Face FDP</option>
                    <option value="AKTU Level-1 (UHV-II)">AKTU Level-1 (UHV-II)</option>
                    <option value="AKTU Refresher">AKTU Refresher</option>
                    <option value="AKTU Level-2 (UHV-III)">AKTU Level-2 (UHV-III)</option>
                    <option value="AKTU Level-3 (UHV-III)">AKTU Level-3 (UHV-III)</option>
                    <option value="AKTU 10 days FDP on UHBC (UHV-III)">AKTU 10 days FDP on UHBC (UHV-III)</option>
                    <option value="AKTU 10 days FDP on VREHC (UHV-III)">AKTU 10 days FDP on VREHC (UHV-III)</option>
                    <option value="AKTU 10 days FDP on HVMD">AKTU 10 days FDP on HVMD</option>
                    <option value="AICTE UHV-II">AICTE UHV-II</option>
                    <option value="AICTE UHV-III">AICTE UHV-III</option>
                    <option value="AICTE UHV-IV">AICTE UHV-IV</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Online FDP</Form.Label>
                  <Form.Select className='mb-3' aria-label="Default select example" disabled={flag2} onChange={(e) => setOnline(e.target.value)}>
                    <option>Select the Online FDP type</option>
                    <option value="AICTE-Five Days Introductory FDP">AICTE-Five Days Introductory FDP</option>
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
            <Row className='mb-3 mt-3'>
              <Card.Title>
                FDP Detail
              </Card.Title>
            </Row>
            <Row>
              <Col xs={12} md={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                  <Form.Label>Starting Date</Form.Label>
                  <Form.Control type="date" placeholder="Starting Date" min={new Date().toISOString().split('T')[0]} required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
              </Col>
              <Col xs={12} md={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control type="date" placeholder="End Date" min={new Date().toISOString().split('T')[0]} required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
              </Col>
              <Col xs={12} md={2}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                  <Form.Label>Number of Days</Form.Label>
                  <Form.Control type="number" placeholder="No. of Days" required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                  <Form.Label>Venue</Form.Label>
                  <Form.Control type="text" placeholder="Venue" required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
            <Row className='mb-4'>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                  <Form.Label>AICTE/AKTU Certificate Number</Form.Label>
                  <Form.Control type="text" placeholder="Certificate Number" required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                  <Form.Label >Upload Certificate copy</Form.Label>
                  <Form.Control type="file" required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
            <Row className='mb-3 mt-3'>
              <Card.Title>
                Incentive Details
              </Card.Title>
            </Row>
            <Row className="mb-3">
              <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Incentive Details</Form.Label>
                <Form.Select className='mb-3' aria-label="Default select example" required onChange={(e) => setIncentive(e.target.value)}>
                  <option>Select the Incentive Details</option>
                  <option value="AKTU Level-2 (10,000)">AKTU Level-2 (10,000)</option>
                  <option value="AKTU Level-3 (15,000)">AKTU Level-3 (15,000)</option>
                  <option value="AICTE UHV-III (10,000)">AICTE UHV-III (10,000)</option>
                  <option value="AICTE UHV-IV (15,000)">AICTE UHV-IV (15,000)</option>
                  <option value="Not Taken Yet">Not Taken Yet</option>
                </Form.Select>
              </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" onChange={(e) => setRemarks(e.target.value)}>
              <Form.Label>Remarks</Form.Label>
              <Form.Control as="textarea" rows={2} />
            </Form.Group>
            <Button variant="primary" style={{ float: "right" }} type="submit" className='w-sm-100'>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  </>
  );
}

export default CollegeForm;