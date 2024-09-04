
export async function handleSubmit(event, navigate) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const manage = Object.fromEntries(formData.entries());

    if (!manage.name  || !manage.exp || !manage.address || !manage.phone ) {
        alert("Bạn chưa nhập đủ rồi!");
        return;
    }
    if(manage.name.length > 10 ){
        alert("Tên không được vượt quá 10 ký tự")
        return
    }
    if(manage.address.length <5){
        alert("Địa chỉ phải ít nhất có 5 ký tự")
        return
    }
   

    try {
        const response = await fetch("http://localhost:3001/manages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(manage)
        });

        if (response.ok) {
            localStorage.setItem('successMessage', 'Thành công!');
            navigate("/");
        } else if (response.status === 400) {
            alert("Lỗi!");
        } else {
            alert("Không thể thêm mới");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Không thể kết nối");
    }
}
