import Sidebar from './Sidebar';
import {useState, useEffect} from 'react';
import axios from "axios";
const baseUrl='http://127.0.0.1:8000/api';
function ChangePassword(Teacher){
    useEffect(() => {
        document.title='Student change password';
    });
    const [studentData, setstudentData]=useState({
        'password':''
    });
    const studentId =localStorage.getItem('studentId');

    // Change element value
    const handleChange=(event)=>{
        setstudentData({
            ...studentData,
            [ event.target.name]:event.target.value
        });
    }
    // End

    // Submit Form
    const submitForm=()=>{
        const studentFormData=new FormData();
        studentFormData.append("password", studentData.password);

        try {
            axios.post(`${baseUrl}/student/change-password/`+studentId+'/', studentFormData)
            .then((response)=>{
                if(response.status ===200) {
                    window.location.href='/user-logout';
                }else{
                    alert('Oops ... some error occurred');
                }
            });
        } catch(error) {
            console.log(error);
            setstudentData({'status':'error'});
        }
    };
    // End Submit form

    const studentLoginStatus =localStorage.getItem('studentLoginStatus')
    if(studentLoginStatus!=='true') {
        window.location.href='/user-login';
    }

    return (
        <div className="container mt-4">
            <div className="row">
            <aside className="col-md-3" >
                <Sidebar/>
            </aside>
            <section className="col-md-9" >
            <div className="card mt-4">
                <h5 className="card-header">Change Password</h5>
                <div className="card-body">
                    <div className="mb-3 row">
                        <label for="inputPassword" className="col-sm-2 col-form-label">New Password</label>
                        <div className="col-sm-10">
                            <input type="text" onChange={handleChange} value={studentData.password} name="password" className="form-control" id="inputPassword"/>
                        </div>
                    </div>
                    <hr/>
                    <button type="submit" onClick={submitForm} className="btn btn-primary">Update</button>
                </div>
            </div>
            </section>
            </div>
        </div>
    );
}

export default ChangePassword;