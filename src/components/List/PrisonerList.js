import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './style.css';

export default function PrisonerList() {
    const [prisoners, setPrisoners] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [selectedPrisonerId, setSelectedPrisonerId] = useState(null);

    useEffect(() => {
        const message = localStorage.getItem('successMessage');
        if (message) {
            setSuccessMessage(message);
            setShowSuccessMessage(true);
            localStorage.removeItem('successMessage');

            setTimeout(() => {
                setShowSuccessMessage(false);
                setSuccessMessage("");
            }, 3000);
        }
        getPrisoners();
    }, []);

    function getPrisoners() {
        fetch("http://localhost:3001/prisoners")
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error();
            })
            .then(data => {
                setPrisoners(data);
            })
            .catch(error => {
                alert("Không thể lấy dữ liệu");
            });
    }

    function deletePrisoner(id) {
        fetch("http://localhost:3001/prisoners/" + id, {
            method: "DELETE"
        })
            .then(response => {
                if (response.ok) {
                    localStorage.setItem('successMessage', 'Xóa thành công!');
                    getPrisoners();
                    setShowSuccessMessage(true);
                    setTimeout(() => {
                        setShowSuccessMessage(false);
                        setSuccessMessage("");
                    }, 3000);
                } else {
                    throw new Error();
                }
            })
            .catch(error => {
                alert("Không thể xóa");
            });
    }

    function handleDeleteClick(id) {
        setSelectedPrisonerId(id);
        setShowDeletePopup(true);
    }

    function handleConfirmDelete() {
        deletePrisoner(selectedPrisonerId);
        setShowDeletePopup(false);
        setSelectedPrisonerId(null);
    }

    function handleCancelDelete() {
        setShowDeletePopup(false);
        setSelectedPrisonerId(null);
    }

    return (
        <div>
            {showSuccessMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}

            {showDeletePopup && (
                <div className="popup">
                    <div className="popup-content">
                        <div className="popup-header">
                            <h4>Xác nhận xóa phạm nhân</h4>
                            <button className="close-btn" onClick={handleCancelDelete}>×</button>
                        </div>
                        <p>Bạn có chắc chắn muốn xóa?</p>
                        <div className="popup-footer">
                            <button className="btn btn-secondary" onClick={handleCancelDelete}>Hủy</button>
                            <button className="btn btn-danger" onClick={handleConfirmDelete}>Xóa</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="container">
                <div className="list-group">
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1">Khu vực quản trị</span>
                    </div>
                    <Link to="#" className="list-group-item list-group-item-action">
                        Trang chủ
                    </Link>
                    <Link to="#" className="list-group-item list-group-item-action active" aria-current="true">
                        Quản lý phòng bệnh
                    </Link>
                    <Link to="#" className="list-group-item list-group-item-action">
                        Quản lý phòng giam
                    </Link>
                    <Link to="#" className="list-group-item list-group-item-action">
                        Quản lý người thăm
                    </Link>
                    <Link to="#" className="list-group-item list-group-item-action disabled" tabIndex="-1" aria-disabled="true">
                        Quản lý nhân viên
                    </Link>
                </div>
                <div className="container-table">
                    <nav className="navbar bg-body-tertiary">
                        <div className="container-fluid">
                            <span className="navbar-brand mb-0 h1">Danh sách phạm nhân</span>
                        </div>
                        <form className="container-fluid justify-content-end" id="containerbtn">
                            <Link type="button" className="btn btn-success" to="/manages/Create/create">Thêm phạm nhân</Link>
                        </form>
                    </nav>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Mã phạm nhân</th>
                                <th scope="col">Họ và tên</th>
                                <th scope="col">Ngày sinh</th>
                                <th scope="col">Địa chỉ</th>
                                <th scope="col">Tội danh</th>
                                <th scope="col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prisoners.map((prisoner, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{prisoner.name}</td>
                                    <td>{prisoner.year}</td>
                                    <td>{prisoner.address}</td>
                                    <td>{prisoner.criminal}</td>
                                    <td>
                                        <button className="btnedit" to={`/Edit/edit/${prisoner.id}`}>
                                            Sửa
                                        </button>
                                        <button type="button" className="btndelete" onClick={() => handleDeleteClick(prisoner.id)}>
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
