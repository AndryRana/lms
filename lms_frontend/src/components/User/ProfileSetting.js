import Sidebar from './Sidebar';
import {useState, useEffect} from 'react';
import axios from "axios";
import Swal from 'sweetalert2'
const baseUrl='http://127.0.0.1:8000/api';
function ProfileSetting(){
    useEffect(() => {
        document.title='My Profile';
    });
    const [studentData, setstudentData]=useState({
        'full_name':'',
        'email':'',
        'username':'',
        'interested_categories':'',
        'profile_img':'',
        'p_img':'',
        'login_via_otp':''
    });
    const studentId =localStorage.getItem('studentId');
    useEffect(()=>{
        // Fetch current student data
        try {
            axios.get(`${baseUrl}/student/`+studentId)
            .then((res) => {
                setstudentData({
                    full_name:res.data.full_name,
                    email:res.data.email,
                    username:res.data.username,
                    interested_categories:res.data.interested_categories,
                    profile_img:res.data.profile_img,
                    p_img:'',
                    login_via_otp:res.data.login_via_otp
                });
            });
        } catch (error) {
            console.log(error);
        }
        // End
    },[]);

    // Change element value
    const handleChange=(event)=>{
        setstudentData({
            ...studentData,
            [ event.target.name]:event.target.value
        });
    }
    // End

    const handleFileChange=(event) =>{
        setstudentData({
            ...studentData,
            [event.target.name]:event.target.files[0]
        });
    }
    // Submit Form
    const submitForm=()=>{
        const studentFormData=new FormData();
        studentFormData.append("full_name", studentData.full_name);
        studentFormData.append("email", studentData.email);
        studentFormData.append("username", studentData.username);
        studentFormData.append("interested_categories", studentData.interested_categories);
        studentFormData.append("login_via_otp", studentData.login_via_otp);
        if(studentData.p_img!=='') {
            studentFormData.append('profile_img', studentData.p_img,studentData.p_img.name);
        }

        try {
            axios.put(`${baseUrl}/student/`+studentId+'/', studentFormData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response)=>{
                if(response.status ===200) {
                    Swal.fire({
                        title: 'Data has been updated!',
                        icon: 'success',
                        toast:true,
                        timer:3000,
                        position:'top-right',
                        timerProgressBar:true,
                        showConfirmButton:false
                    });
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
        window.location.href='/user-login'
    }

    return (
        <div className="container mt-4">
            <div className="row">
            <aside className="col-md-3" >
                <Sidebar/>
            </aside>
            <section className="col-md-9" >
            <div className="card mt-4">
                <h5 className="card-header">Profile Settings</h5>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
                        <input value={studentData.full_name} onChange={handleChange} name="full_name" type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input value={studentData.email} onChange={handleChange} name="email" type="email" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Profile Image</label>
                        <input  name='p_img'  onChange={handleFileChange} type="file" className="form-control" id="img"/>
                        {studentData.profile_img &&
                        <p className="mt-2"><img src={studentData.profile_img} width="300" alt={studentData.full_name}/></p>
                        }
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                        <input value={studentData.username} onChange={handleChange} name="username" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Interested categories</label>
                        <textarea value={studentData.interested_categories} onChange={handleChange} name="interested_categories" className= "form-control"></textarea>
                        <div id="emailHelp" className="form-text">PHP, Python, JavaScript, etc</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Login via OTP</label>
                        <input value={studentData.login_via_otp} onChange={handleChange} name="login_via_otp" type="text" className="form-control" />
                    </div>
                    <button onClick={submitForm}  type="submit" className="btn btn-primary">Update</button>
                </div>
            </div>
            </section>
            </div>
        </div>
    );
}

export default ProfileSetting;