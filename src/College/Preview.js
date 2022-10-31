import React from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'
import { doGetDetailById } from '../Services/ApiServices'
import { useState, useEffect } from 'react'
import { Card, Container } from 'react-bootstrap'
import { Document, Page, pdfjs } from 'react-pdf';
const Preview = () => {
    const location = useLocation();
    const [certificate, setCertificate] = useState(null)
    const [flag, setFlag] = useState(false)
    const [arr, setArr] = useState([])
    let id = location.state;
    useEffect(() => {
        // console.log(id);
        if (id) {
            getDetailByID();
        }
    }, [id]);


    useEffect(() => {
        if (arr) {
            setFlag(true);
        }
    }, [arr]);




    const getDetailByID = () => {
        doGetDetailById(Number(id)).then((res) => {
            // console.log(res);
            setCertificate(res.data.certificate)

            const str = res.data.certificate;
            setArr(str.match(/[.]jpg\w*/g))

        }).catch((e) => {
            console.log(e);
        })
    }
    if (certificate) {
        // console.log(certificate);
    }

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });

    /*When document gets loaded successfully*/
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }
    function nextPage() {
        changePage(1);
    }


    return (<>
        <Navbar />
        {flag ? <div>


            <Card >
                <Card.Title className='px-3 py-2' e>
                    Preview Certificate
                </Card.Title>
                <Container className='my-3'>
                    <Card.Body>
                        <img height={"50%"} width={"50%"} src={certificate}></img>
                    </Card.Body>
                </Container>
            </Card>

        </div> : <div className="main">
            <Document
                file={certificate}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <div>
                <div className="pagec">
                    Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                </div>
                <div className="buttonc">
                    <button
                        type="button"
                        disabled={pageNumber <= 1}
                        onClick={previousPage}
                        className="Pre"
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        disabled={pageNumber >= numPages}
                        onClick={nextPage}

                    >
                        Next
                    </button>
                </div>
            </div>
        </div>}
    </>)
}

export default Preview