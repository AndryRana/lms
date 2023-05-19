import {useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState} from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
const baseUrl='http://127.0.0.1:8000/api';
function AddAssignment(){
    const [assignmentData, setassignmentData]=useState({
        title:'',
        detail:'',
    });


    const handleChange=(event) =>{
        setassignmentData({
            ...assignmentData,
            [event.target.name]:event.target.value
        });
    }
    const {student_id}=useParams();
    const {teacher_id}=useParams();

    const formSubmit=()=>{
        const _formData=new FormData();
        _formData.append('teacher', teacher_id);
        _formData.append('title', assignmentData.title);
        _formData.append('detail', assignmentData.detail);
        _formData.append('student', student_id);
        try {
            axios.post(`${baseUrl}/student-assignment/`+teacher_id+'/'+student_id, _formData)
            .then((res)=>{
                if(res.status ===200 || res.status===201) {
                    Swal.fire({
                        title: 'Assignment has been added!',
                        icon: 'success',
                        toast:true,
                        timer:3000,
                        position:'top-right',
                        timerProgressBar:true,
                        showConfirmButton:false
                    });
                    const _notifData=new FormData();
                    _notifData.append('teacher', teacher_id);
                    _notifData.append('notif_subject', 'assignment');
                    _notifData.append('notif_for', 'student');
                    _notifData.append('student', student_id);
                    axios.post(`${baseUrl}/save-notification/`, _notifData,{
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    })
                    .then((res)=>{
                        console.log('Notification Added');
                    })
                    // End Notification
                    window.location.reload();
                }
                // End SweetAlert
            });

        } catch (error) {
            console.log(error);
        }
        
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3" >
                    <TeacherSidebar/>
                </aside>
                <section className="col-md-9" >
                    <div className="card">
                        <h5 className="card-header">Add Assignment</h5>
                        <div className="card-body">
                            <div className="mb-3 row">
                                <label for="title" className="col-sm-2 col-form-label">Title</label>
                                <div className="col-sm-10">
                                    <input type="text" onChange={handleChange} name="title"  className="form-control" id="title" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label for="detail" className="col-sm-2 col-form-label">Description</label>
                                <div className="col-sm-10">
                                    <textarea className= "form-control" onChange={handleChange} name="detail"  id="detail" ></textarea>
                                </div>
                            </div>
                            <button type="button" onClick={formSubmit} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AddAssignment;