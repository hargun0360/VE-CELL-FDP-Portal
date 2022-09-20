import PropTypes from 'prop-types'
import React from "react"
import { Col, Modal, ModalBody, Row } from "reactstrap"
import { doDeleteFDPById } from '../Services/ApiServices'
import { useSelector,useDispatch } from 'react-redux'
import * as action from "../Redux/action"
import Spinner from '../Components/Spinner'

const DeleteModal = ({ show, setShow, setLoading, id }) => {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const onDeleteClick = () => {
        setLoading(true)
        console.log(id);
        setShow(false);
        doDeleteFDPById(id)
        .then((res)=>{
            console.log(res);
            setLoading(false)
            dispatch(action.flag(true))
        }).catch((e)=>{
            console.log(e);
            setLoading(false)
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
                            <h4>{"You won't be able to revert this!"}</h4>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="text-center mt-3">
                            <button
                                type="button"
                                className="btn btn-success btn-lg ms-2"
                                onClick={onDeleteClick}
                            >
                                Yes, delete it!
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

DeleteModal.propTypes = {
    onCloseClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    show: PropTypes.any
}

export default DeleteModal
