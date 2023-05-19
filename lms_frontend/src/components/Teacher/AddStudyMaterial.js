import {useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState} from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
const baseUrl='http://127.0.0.1:8000/api';
function AddStudyMaterial(){
    const [studyData, setstudyData]=useState({
        title:'',
        description:'',
        upload:'',
        remarks:''
    });


    const handleChange=(event) =>{
        setstudyData({
            ...studyData,
            [event.target.name]:event.target.value
        });
    }
    const handleFileChange=(event) =>{
        window.URL=window.URL ||window.webkitURL;
        var upload = document.createElement('upload');
        upload.src=URL.createObjectURL(event.target.files[0]);
        setstudyData({
            ...studyData,
            [event.target.name]:event.target.files[0]
        });
    }
    const {course_id}=useParams();
    const formSubmit=()=>{
        const _formData=new FormData();
        _formData.append('course', course_id);
        _formData.append('title', studyData.title);
        _formData.append('description', studyData.description);
        _formData.append('upload', studyData.upload,studyData.upload.name);
        _formData.append('remarks', studyData.remarks);
        try {
            axios.post(`${baseUrl}/study-materials/`+course_id, _formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status ===200 || res.status===201) {
                    Swal.fire({
                        title: 'Data has been added!',
                        icon: 'success',
                        toast:true,
                        timer:3000,
                        position:'top-right',
                        timerProgressBar:true,
                        showConfirmButton:false
                    });
                    window.location.reload();
                }
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
                        <h5 className="card-header">Add Study</h5>
                        <div className="card-body">
                            <div className="mb-3 row">
                                <label for="title" className="col-sm-2 col-form-label">Title</label>
                                <div className="col-sm-10">
                                    <input type="text" onChange={handleChange} name="title"  className="form-control" id="title" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label for="description" className="col-sm-2 col-form-label">Description</label>
                                <div className="col-sm-10">
                                    <textarea className= "form-control" onChange={handleChange} name="description"  id="description" ></textarea>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label for="upload" className="col-sm-2 col-form-label">Upload</label>
                                <div className="col-sm-10">
                                    <input type="file" className="form-control" onChange={handleFileChange} name="upload"  id="upload"/>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label for="remarks" className="col-sm-2 col-form-label">Remarks</label>
                                <div className="col-sm-10">
                                    <textarea className= "form-control" onChange={handleChange} name="remarks"  id="remarks" ></textarea>
                                </div>
                            </div>
                            <hr/>
                            <button type="button" onClick={formSubmit} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AddStudyMaterial;