import React from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'
import { doGetDetailById } from '../Services/ApiServices'
import { useState,useEffect } from 'react'
import { Card, Container } from 'react-bootstrap'
const Preview = () => {
    const location = useLocation();
    const [certificate,setCertificate] = useState(null)
    let id = location.state;
   
    useEffect(() => {
        console.log(id);
        if (id) {
          getDetailByID();
        }
      }, [id]);

      const getDetailByID = () => {
        doGetDetailById(Number(id)).then((res) => {
          console.log(res);
          setCertificate(res.data.certificate)
        }).catch((e) => {
          console.log(e);
        })
      }
      if(certificate){
        console.log(certificate);
      }
  return (
    <div>
        <Navbar />
        
            <Card >
                <Card.Title className='px-3 py-2'e>
                    Preview Certificate
                </Card.Title>
                <Container className='my-3'>
                <Card.Body>
                    <img height={"50%"} width={"50%"} src={certificate}></img>
                </Card.Body>
                </Container>    
            </Card>
        
    </div>
  )
}

export default Preview