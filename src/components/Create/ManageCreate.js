import { Link, useNavigate } from "react-router-dom";
import { handleSubmit } from "../handleSubmit/handleSubmit";

export default function ManageCreate(){

    const navigate = useNavigate()
    
   
    return(
        <div className="container my-4">
            <div className="row">
                <div className="col-md-5 mx-auto rounded border p-4">
                    
                    <div className="containerheader">
                    <h2 className="text">Thêm quản lý</h2>
                                <Link type="submit" className="btn justify-content-end" to="/" role="button">x</Link>

                            </div>
                    <form onSubmit={(event) => handleSubmit(event, navigate)}>
                        <div className="row mb-3">  
                            <label className="col-sm-4 col-form-label">Nhập họ tên</label>
                            <div className="col-sm-9">
                                <input className="form-control" name="name" />
                                <span className="text-danger" />
                            </div>
                        </div>
                        <div className="row mb-3">  
                            <label className="col-sm-4 col-form-label">Kinh nghiệm</label>
                            <div className="col-sm-9">
                                <input className="form-control" name="exp" type="number" min="1" />
                                <span className="text-danger" />
                            </div>
                        </div>
                        
                            <div className="row mb-3">  
                            <label className="col-sm-4 col-form-label">Địa chỉ</label>
                            <div className="col-sm-9">
                                <input className="form-control" name="address" />
                                <span className="text-danger" />
                            </div>
                        </div>
                        <div className="row mb-3">  
                            <label className="col-sm-4 col-form-label">Điện thoại</label>
                            <div className="col-sm-9">
                                <input className="form-control" name="phone" />
                                <span className="text-danger" />
                            </div>
                        </div>
                        
                        <div className="row mb-4 justify-content-end">  
                            
                            <div className="col-sm-4 d-grid">
                                <Link type="submit" className="btn" to="/" role="button">Hủy</Link>

                            </div>
                            <div className=" col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary">Thêm mới</button>

                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}