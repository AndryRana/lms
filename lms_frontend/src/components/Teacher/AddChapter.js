import {useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState} from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
const baseUrl='http://127.0.0.1:8000/api';
function AddChapter(){
    const [chapterData, setChapterData]=useState({
        title:'',
        description:'',
        video:'',
        remarks:''
    });


    const handleChange=(event) =>{
        setChapterData({
            ...chapterData,
            [event.target.name]:event.target.value
        });
    }
    const handleFileChange=(event) =>{
        setChapterData({
            ...chapterData,
            [event.target.name]:event.target.files[0]
        });
    }
    const {course_id}=useParams();
    const formSubmit=(event)=>{
        event.preventDefault();
        const _formData=new FormData();
        _formData.append('course', course_id);
        _formData.append('title', chapterData.title);
        _formData.append('description', chapterData.description);
        _formData.append('video', chapterData.video,chapterData.video.name);
        _formData.append('remarks', chapterData.remarks);
        try {
            axios.post(`${baseUrl}/chapter/`, _formData,{
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
                        <h5 className="card-header">Add Chapter</h5>
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
                                <label for="video" className="col-sm-2 col-form-label">Video</label>
                                <div className="col-sm-10">
                                    <input type="file" className="form-control" onChange={handleFileChange} name="video"  id="video"/>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label for="techs" className="col-sm-2 col-form-label">Remarks</label>
                                <div className="col-sm-10">
                                    <textarea className= "form-control" onChange={handleChange} name="remarks"  id="techs" placeholder="This video is focused on basic introduction"></textarea>
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

export default AddChapter;