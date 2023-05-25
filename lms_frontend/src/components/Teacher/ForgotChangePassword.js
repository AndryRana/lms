import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate, useParams } from 'react-router-dom';
const baseUrl='http://127.0.0.1:8000/api';
function ForgotChangePassword(){
    const navigate=useNavigate();
    useEffect(() => {
        document.title='Teacher - Change Password';
    });
    const [teacherData, setteacherData]=useState({
        password:'',
    });

    const {teacher_id}=useParams();

    const [successMsg,setsuccessMsg]=useState('');
    const [errorMsg,seterrorMsg]=useState('');

    const handleChange=(event) => {
        setteacherData({
            ...teacherData, 
            [ event.target.name ]: event.target.value
            
        });
    }

    
    const submitForm=()=>{
        const teacherFormData=new FormData();
        teacherFormData.append('password', teacherData.password)

        try {
            axios.post(`${baseUrl}/teacher-change-password/`+teacher_id+'/', teacherFormData)
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

    const teacherLoginStatus =localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus==='true') {
        navigate('/teacher-dashboard');
        // window.location.href='/teacher-dashboard'
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
                                <input value={teacherData.password} name="password" onChange={handleChange} type="password" className="form-control" />
                            </div>
                            <button type="submit" onClick={submitForm} className="btn btn-primary">Change</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotChangePassword;