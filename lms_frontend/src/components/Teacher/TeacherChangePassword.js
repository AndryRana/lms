import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from "axios";
import Swal from 'sweetalert2'
const baseUrl='http://127.0.0.1:8000/api';
function TeacherChangePassword(Teacher){
    useEffect(() => {
        document.title='Teacher change password';
    });
    const [teacherData, setteacherData]=useState({
        'password':''
    });
    const teacherId =localStorage.getItem('teacherId');

    // Change element value
    const handleChange=(event)=>{
        setteacherData({
            ...teacherData,
            [ event.target.name]:event.target.value
        });
    }
    // End

    // Submit Form
    const submitForm=()=>{
        const teacherFormData=new FormData();
        teacherFormData.append("password", teacherData.password);

        try {
            axios.post(`${baseUrl}/teacher/change-password/`+teacherId+'/', teacherFormData)
            .then((response)=>{
                if(response.status ===200) {
                    window.location.href='/teacher-logout';
                }else{
                    alert('Oops ... some error occurred');
                }
            });
        } catch(error) {
            console.log(error);
            setteacherData({'status':'error'});
        }
    };
    // End Submit form

    const teacherLoginStatus =localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus!=='true') {
        window.location.href='/teacher-login';
    }

    return (
        <div className="container mt-4">
            <div className="row">
            <aside className="col-md-3" >
                <TeacherSidebar/>
            </aside>
            <section className="col-md-9" >
            <div className="card mt-4">
                <h5 className="card-header">Change Password</h5>
                <div className="card-body">
                    <div className="mb-3 row">
                        <label for="inputPassword" className="col-sm-2 col-form-label">New Password</label>
                        <div className="col-sm-10">
                            <input type="text" onChange={handleChange} value={teacherData.password} name="password" className="form-control" id="inputPassword"/>
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

export default TeacherChangePassword;