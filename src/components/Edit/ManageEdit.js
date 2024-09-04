import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { handleSubmit } from "../handleSubmit/handleSubmit";

export default function ManageEdit() {
    const params = useParams();
    const [initialData, setInitialData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/manages/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setInitialData(data);
            } catch (error) {
                console.error('Error:', error);
                alert("Không thể tải danh sách sản phẩm");
            }
        };

        fetchData();
    }, [params.id]);

    
    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4">
                    <h2 className="text-center mb-5">Sửa quản lý</h2>
                    {initialData && (    
                    <form onSubmit={(event) => handleSubmit(event, navigate)}>
                        <div className="row mb-3">  
                            <label className="col-sm-4 col-form-label">Họ và tên</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="name" defaultValue={initialData.name} />
                                <span className="text-danger" />
                            </div>
                        </div>
                        
                            <div className="row mb-3">  
                            <label className="col-sm-4 col-form-label">Kinh nghiệm</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="exp"  type="number" min="1" defaultValue={initialData.exp}/>
                                <span className="text-danger" />
                            </div>
                        </div>
                        <div className="row mb-3">  
                            <label className="col-sm-4 col-form-label">Địa chỉ</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="address" defaultValue={initialData.address} />
                                <span className="text-danger" />
                            </div>
                        </div>
                        <div className="row mb-3">  
                            <label className="col-sm-4 col-form-label">Điện thoại</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="phone" defaultValue={initialData.phone} />
                                <span className="text-danger" />
                            </div>
                        </div>
                        <div className="row mb-3">  
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary">Lưu</button>

                            </div>
                            <div className="col-sm-4 d-grid">
                                <Link type="submit" className="btn btn-secondary" to="/" role="button">Hủy</Link>

                            </div>
                        </div>
                        
                    </form>
                )}
                </div>
            </div>
        </div>
    )
}