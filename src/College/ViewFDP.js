import React, { useEffect, useState } from "react"
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
} from "reactstrap"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import ModeSharpIcon from '@mui/icons-material/ModeSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from './DeleteModal'
import { doGetAllFDP } from "../Services/ApiServices";
import * as action from "../Redux/action";
import { useDispatch, useSelector } from 'react-redux'
import swal from "sweetalert";
import Spinner from '../Components/Spinner'
import Breadcrumb from './Breadcrumb';
const ViewFDP = () => {
    const [loader, setLoader] = useState(false)
    const [project, setProject] = useState(null)
    const [modal, setModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [menu, setMenu] = useState({
        id: null,
        open: false
    });
    let cnt = 0;
    const dispatch = useDispatch();
    const { val } = useSelector((state) => state.toggle);
    const [details, setDetails] = useState([]);
    // //delete order
    const [deleteModal, setDeleteModal] = useState(false)

    const [admin, setAdmin] = useState(false);


    useEffect(() => {
        if (localStorage.getItem("admin") == "true") {
            setAdmin(true);
        }
    }, [])

    console.log(val);
    useEffect(() => {
        getFDP();
    }, [val]);


    // Get All FDP

    const getFDP = () => {
        doGetAllFDP().then((res) => {
            setDetails(res.data);
        }).catch((e) => {
            console.log(e);
            if (e.status == 403) {
                localStorage.clear();
                window.location.href = "/";
            }
            swal({
                title: e.data.status,
                text: "",
                icon: "error",
                button: "OK",
            });
        })
    }

    if (details.length) {
        console.log(details);
    }



    const [id, setId] = useState(null)


    return (
        <React.Fragment>

            <DeleteModal
                show={deleteModal} setShow={setDeleteModal} setLoading={setLoader} id={id}
            />
            <div className="w-100 h-100 pb-3">
                <Container fluid>
                <div className='py-4'>
                    {
                        admin ? <Breadcrumb
                            title="View FDP"
                            breadcrumbItems={[{ title: "View Students", href: "/viewst" }, { title: "Add Student", href: "/stform" }, { title: "Add FDP", href: "/form" }, { title: "View FDP", href: "/viewall" },{ title: "Reset Password", href: "/reset" },{ title: "Logout", href: "/logout" },]}
                        /> : <Breadcrumb
                            title="View FDP"
                            breadcrumbItems={[{ title: "Add FDP", href: "/form" }, { title: "View FDP", href: "/viewall" },{ title: "Reset Password", href: "/reset" },{ title: "Logout", href: "/logout" },]}
                        />
                    }
                    </div>
                    {/* Render Breadcrumbs */}
                    <Card>
                        <CardBody>
                            <div className="table-responsive">
                                <Table className="table" style={{ height: "50vh" }}>
                                    <thead className="table-light">
                                        <tr>
                                            <th className="text-center">#</th>
                                            <th className="text-center">Name</th>
                                            <th className="text-center">FDP Type</th>
                                            <th className="text-center">FDP Name</th>
                                            <th className="text-center">Start Date</th>
                                            <th className="text-center">End Date</th>
                                            <th className="text-center">Certificate Number</th>
                                            <th className="text-center">Incentive Detail</th>
                                            <th className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            details.map((item) => (
                                                <>
                                                    <tr>
                                                        <td className="text-center">{++cnt}</td>
                                                        <td className="text-center"> {item.name === null ? "" : item.name} </td>
                                                        <td className="text-center"> {item.fdp_type === null ? "" : item.fdp_type} </td>
                                                        <td className="text-center"> {item.face_to_face_fdp === "" ? item.online_fdp : item.face_to_face_fdp} </td>
                                                        <td className="text-center"> {item.starting_date === null ? "" : item.starting_date} </td>
                                                        <td className="text-center"> {item.end_date === null ? "" : item.end_date} </td>
                                                        <td className="text-center"> {item.certificate_number === null ? "" : item.certificate_number} </td>
                                                        <td className="text-center"> {item.incentive_detail === null ? "" : item.incentive_detail} </td>
                                                        <td className="text-center">
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
                                                                </DropdownMenu>
                                                            </UncontrolledDropdown>
                                                        </td>
                                                    </tr>
                                                </>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment >
    )
}

export default ViewFDP

// export default OperationsDashboard;

