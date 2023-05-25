import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
const baseUrl='http://127.0.0.1:8000/api';
function UserForgotPassword(){
    const navigate=useNavigate();
    useEffect(() => {
        document.title='Student - Forgot Password';
    });
    const [studentData, setstudentData]=useState({
        email:'',
    });

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
        studentFormData.append('email', studentData.email)

        try {
            axios.post(`${baseUrl}/user-forgot-password/`, studentFormData)
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
        navigate('/user-dashboard')
        // window.location.href='/user-dashboard';
    }
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">Enter your email</h5>
                        <div className="card-body">
                            {successMsg && <p className="text-danger">{successMsg}</p>}
                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">email</label>
                                <input value={studentData.email} name="email" onChange={handleChange} type="email" className="form-control" />
                            </div>
                            <button type="submit" onClick={submitForm} className="btn btn-primary">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserForgotPassword;