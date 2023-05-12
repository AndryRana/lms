import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from "axios";
import Swal from 'sweetalert2'
const baseUrl='http://127.0.0.1:8000/api';
function TeacherProfileSetting(){
    useEffect(() => {
        document.title='Teacher Profile';
    });
    const [teacherData, setteacherData]=useState({
        'full_name':'',
        'email':'',
        'qualification':'',
        'mobile_no':'',
        'skills':'',
        'profile_img':'',
        'p_img':'',
        'status':''
    });
    const teacherId =localStorage.getItem('teacherId');
    useEffect(()=>{
        // Fetch current teacher data
        try {
            axios.get(`${baseUrl}/teacher/`+teacherId)
            .then((res) => {
                setteacherData({
                    full_name:res.data.full_name,
                    email:res.data.email,
                    qualification:res.data.qualification,
                    mobile_no:res.data.mobile_no,
                    skills:res.data.skills,
                    profile_img:res.data.profile_img,
                    p_img:''
                });
            });
        } catch (error) {
            console.log(error);
        }
        // End
    },[]);

    // Change element value
    const handleChange=(event)=>{
        setteacherData({
            ...teacherData,
            [ event.target.name]:event.target.value
        });
    }
    // End

    const handleFileChange=(event) =>{
        setteacherData({
            ...teacherData,
            [event.target.name]:event.target.files[0]
        });
    }
    // Submit Form
    const submitForm=()=>{
        const teacherFormData=new FormData();
        teacherFormData.append("full_name", teacherData.full_name);
        teacherFormData.append("email", teacherData.email);
        teacherFormData.append("qualification", teacherData.qualification);
        teacherFormData.append("mobile_no", teacherData.mobile_no);
        teacherFormData.append("skills", teacherData.skills);
        if(teacherData.p_img!=='') {
            teacherFormData.append('profile_img', teacherData.p_img,teacherData.p_img.name);
        }

        try {
            axios.put(`${baseUrl}/teacher/`+teacherId+'/', teacherFormData,{
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
            setteacherData({'status':'error'});
        }
    };
    // End Submit form

    const teacherLoginStatus =localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus!=='true') {
        window.location.href='/teacher-login'
    }

    return (
        <div className="container mt-4">
            <div className="row">
            <aside className="col-md-3" >
                <TeacherSidebar/>
            </aside>
            <section className="col-md-9" >
            <div className="card mt-4">
                <h5 className="card-header">Profile Settings</h5>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
                        <input value={teacherData.full_name} onChange={handleChange} name="full_name" type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input value={teacherData.email} onChange={handleChange} name="email" type="email" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Profile Image</label>
                        <input  name='p_img'  onChange={handleFileChange} type="file" className="form-control" id="img"/>
                        {teacherData.profile_img &&
                        <p className="mt-2"><img src={teacherData.profile_img} width="300" alt={teacherData.full_name}/></p>
                        }
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Qualification</label>
                        <textarea value={teacherData.qualification} onChange={handleChange} name="qualification" className="form-control">  </textarea>
                        <div className="form-text">BCA | MCA</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Skills</label>
                        <textarea value={teacherData.skills} onChange={handleChange} name="skills" className= "form-control"></textarea>
                        <div id="emailHelp" className="form-text">PHP, Python, JavaScript, etc</div>
                    </div>
                    <button onClick={submitForm}  type="submit" className="btn btn-primary">Update</button>
                </div>
            </div>
            </section>
            </div>
        </div>
    );
}

export default TeacherProfileSetting;