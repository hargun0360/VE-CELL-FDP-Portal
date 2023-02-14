import PropTypes from 'prop-types'
import React from "react"
import { Col, Modal, ModalBody, Row } from "reactstrap"
import { doResignFDPById } from '../Services/ApiServices'
import { useSelector,useDispatch } from 'react-redux'
import * as action from "../Redux/action"
import Spinner from '../Components/Spinner'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
const ResignModal = ({ show, setShow, setLoading, id , email}) => {

    const dispatch = useDispatch()
    const navigate  = useNavigate()
    const onResignClick = () => {
        setLoading(true)
        // console.log(id);
        setShow(false);
        let obj  = {
            college_email : email,
            resigned: true
        }
        doResignFDPById(obj,id)
        .then((res)=>{
            console.log(res);
            setLoading(false)
            dispatch(action.flag(true))
            swal({
                title: "Remove Successfully",
                text: "",
                icon: "success",
                button: "OK",
              });
        }).catch((e)=>{
            console.log(e);
            if(e.status==403){
                localStorage.clear();
                navigate("/")
              }
            setLoading(false)
            e.status ? swal({
                title: e.status ?  e.data[0] : "something went wrong",
                text: "",
                icon: "error",
                button: "OK",
              }) :
            swal({
                title: e.data.status ? e.data.status : e.data.non_field_errors[0],
                text: "",
                icon: "error",
                button: "OK",
              });
        })
    }
    const onCloseClick = () => {
        setShow(false);
    }

    return (
        <Modal isOpen={show} toggle={onCloseClick} centered={true}>

            <ModalBody className="py-3 px-5">
                <Row>
                    <Col lg={12}>
                        <div className="text-center">
                            <i
                                className="mdi mdi-alert-circle-outline"
                                style={{ fontSize: "9em", color: "orange" }}
                            />
                            <h2>Are you sure?</h2>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="text-center mt-3">
                            <button
                                type="button"
                                className="btn btn-success btn-lg ms-2"
                                onClick={onResignClick}
                            >
                                Yes, Remove it!
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-lg ms-2"
                                onClick={onCloseClick}
                            >X
                                Cancel
                            </button>
                        </div>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    )
}

ResignModal.propTypes = {
    onCloseClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    show: PropTypes.any
}

export default ResignModal