import { useEffect, useState } from "react";
import {useParams,useNavigate} from 'react-router-dom';
import axios from "axios";
const baseUrl='http://127.0.0.1:8000/api';
function VerifyTeacher(){
    const navigate=useNavigate();
    useEffect(() => {
        document.title='Verify Student ';
    });
    const [studentData, setstudentData]=useState({
        otp_digit:'',
    });

    const [errorMsg,seterrorMsg]=useState('');
    const handleChange=(event) => {
        setstudentData({
            ...studentData, 
            [ event.target.name ]: event.target.value
        });
    }
    
    
    const {student_id}=useParams();

    const submitForm=()=>{
        const studentFormData=new FormData();
        studentFormData.append('otp_digit', studentData.otp_digit)

        try {
            axios.post(`${baseUrl}/verify-student/`+student_id+'/', studentFormData)
            .then((response) => {
                if(response.data.bool===true) {
                    localStorage.setItem('studentLoginStatus', true);
                    localStorage.setItem('studentId', response.data.student_id);
                    navigate('/user-dashboard');
                    // window.location.href='/user-dashboard';
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
        // window.location.href='/student-dashboard';
    }
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">Enter 6 Digit OTP</h5>
                        <div className="card-body">
                                {errorMsg && <p className="text-danger">{errorMsg}</p>}
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">OTP</label>
                                    <input value={studentData.otp_digit} name="otp_digit" onChange={handleChange} type="number" className="form-control" />
                                </div>
                                <button type="submit" onClick={submitForm} className="btn btn-primary">Verify</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerifyTeacher;