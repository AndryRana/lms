import { useEffect, useState } from "react";
import axios from "axios";
import {Link,useNavigate} from 'react-router-dom';
const baseUrl='http://127.0.0.1:8000/api';
function Login(){
    const navigate=useNavigate();
    useEffect(() => {
        document.title='Student Login';
    });
    const [studentLoginData, setstudentLoginData]=useState({
        email:'',
        password:'',
    });

    const [errorMsg,seterrorMsg]=useState('');

    const handleChange=(event) => {
        setstudentLoginData({
            ...studentLoginData, 
            [ event.target.name ]: event.target.value
        });
    }

    const submitForm=()=>{
        const studentFormData=new FormData();
        studentFormData.append('email', studentLoginData.email)
        studentFormData.append('password', studentLoginData.password)

        try {
            axios.post(`${baseUrl}/student-login`, studentFormData)
            .then((response) => {
                if(response.data.bool===true) {
                    if(response.data.bool===true) {
                        navigate('/verify-student/'+response.data.student_id);
                    }else{
                        localStorage.setItem('studentLoginStatus', true);
                        localStorage.setItem('studentId', response.data.student_id);
                        navigate('/user-dashboard');
                        // window.location.href='/student-dashboard';
                    }
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
        window.location.href='/user-dashboard'
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">User Login</h5>
                        <div className="card-body">
                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Email</label>
                                <input type="text" name="email" value={studentLoginData.email} onChange={handleChange}  className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password"  name="password" value={studentLoginData.password} onChange={handleChange}  className="form-control" id="exampleInputPassword1"/>
                            </div>
                           {/*<div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                <label className="form-check-label" for="exampleCheck1">Remember Me</label>
                            </div>*/}
                            <button type="submit" onClick={submitForm} className="btn btn-primary">Login</button>
                            <p className="mt-3"><Link to="/user-forgot-password" className="text-danger mt-3">Forgot Password</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;