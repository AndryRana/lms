import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate, useParams } from 'react-router-dom';
const baseUrl='http://127.0.0.1:8000/api';
function UserForgotChangePassword(){
    const navigate=useNavigate();
    useEffect(() => {
        document.title='Student - Change Password';
    });
    const [studentData, setstudentData]=useState({
        password:'',
    });

    const {student_id}=useParams();

    const [successMsg,setsuccessMsg]=useState('');
    const [errorMsg,seterrorMsg]=useState('');

    const handleChange=(event) => {
        setstudentData({
            ...studentData, 
            [ event.target.name ]: event.target.value
            
        });
    }

    
    const submitForm=()=>{
        const studentFormData=new FormData();
        studentFormData.append('password', studentData.password)

        try {
            axios.post(`${baseUrl}/user-change-password/`+student_id+'/', studentFormData)
            .then((response) => {
                if(response.data.bool===true) {
                    setsuccessMsg(response.data.msg);
                    seterrorMsg('');
                }else{
                    seterrorMsg(response.data.msg);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const studentLoginStatus =localStorage.getItem('studentLoginStatus')
    if(studentLoginStatus==='true') {
        navigate('/user-dashboard');
        // window.location.href='/student-dashboard'
    }
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">Enter your password</h5>
                        <div className="card-body">
                            {successMsg && <p className="text-danger">{successMsg}</p>}
                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                            <div className="mb-3">
                                <label htmlFor="exampleInputpassword1" className="form-label">Password</label>
                                <input value={studentData.password} name="password" onChange={handleChange} type="password" className="form-control" />
                            </div>
                            <button type="submit" onClick={submitForm} className="btn btn-primary">Change</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserForgotChangePassword;