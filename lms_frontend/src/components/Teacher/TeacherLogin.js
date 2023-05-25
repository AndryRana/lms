import { useEffect, useState } from "react";
import axios from "axios";
import {Link,useNavigate} from 'react-router-dom';
const baseUrl='http://127.0.0.1:8000/api';
function TeacherLogin(){
    const navigate=useNavigate();
    useEffect(() => {
        document.title='Teacher Login';
    });
    const [teacherLoginData, setteacherLoginData]=useState({
        email:'',
        password:'',
    });

    const [errorMsg,seterrorMsg]=useState('');

    const handleChange=(event) => {
        setteacherLoginData({
            ...teacherLoginData, 
            [ event.target.name ]: event.target.value
        });
    }

    
    const submitForm=()=>{
        const teacherFormData=new FormData();
        teacherFormData.append('email', teacherLoginData.email)
        teacherFormData.append('password', teacherLoginData.password)

        try {
            axios.post(`${baseUrl}/teacher-login`, teacherFormData)
            .then((response) => {
                if(response.data.bool===true) {
                    if(response.data.bool===true) {
                        navigate('/verify-teacher/'+response.data.teacher_id);
                    }else{
                        localStorage.setItem('teacherLoginStatus', true);
                        localStorage.setItem('teacherId', response.data.teacher_id);
                        navigate('/teacher-dashboard');
                        // window.location.href='/teacher-dashboard';
                    }
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
        window.location.href='/teacher-dashboard'
    }
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">Teacher Login</h5>
                        <div className="card-body">
                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                                <input value={teacherLoginData.email} name="email" onChange={handleChange} type="text" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input value={teacherLoginData.password} name="password" onChange={handleChange} type="password" className="form-control" id="exampleInputPassword1"/>
                            </div>
                            {/**
                                * 
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                <label className="form-check-label" for="exampleCheck1">Remember Me</label>
                            </div>
                            *  */}
                            <button type="submit" onClick={submitForm} className="btn btn-primary">Login</button>
                            <p className="mt-3"><Link to="/teacher-forgot-password" className="text-danger mt-3">Forgot Password</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherLogin;