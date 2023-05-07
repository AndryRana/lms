import {Link,useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from "axios";
import Swal from 'sweetalert2'

const baseUrl='http://127.0.0.1:8000/api';

function CourseChapters(){
    const [chapterData,setchapterData] = useState([]);
    const [totalResult,settotalResult] = useState(0);
    const {course_id}=useParams();
    // fetch courses when page load
    useEffect(()=>{
        try {
            axios.get(`${baseUrl}/course-chapters/`+course_id)
            .then((response) => {
                settotalResult(response.data.length);
                setchapterData(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    },[]);
    
    // delete Data
    const Swal = require('sweetalert2')
    const handleDeleteClick =(chapter_id)=>{
        Swal.fire({
            title: 'Confirm!',
            text: 'Do you want to delete?',
            icon: 'info',
            confirmButtonText: 'Confirm',
            showCancelButton:true
        }).then((result) => {
            if(result.isConfirmed) {
                try {
                    axios.delete(baseUrl +'/chapter/'+chapter_id)
                    .then((res) => {
                        Swal.fire('success', 'Data has been deleted.');
                        try {
                            axios.get(`${baseUrl}/course-chapters/`+course_id)
                            .then((response) => {
                                settotalResult(response.data.length);
                                setchapterData(response.data);
                            });
                        } catch (error) {
                            console.log(error);
                        }
                    });
                } catch (error) {
                    Swal.fire('error', 'Data has not been deleted!');
                    
                }
            }else{
                Swal.fire('error', 'Data has not been deleted!');
            }
        });
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3" >
                    <TeacherSidebar/>
                </aside>
                <section className="col-md-9" >
                    <div className="card">
                        <h5 className="car-header mt-1">All Chapters ({totalResult}) <Link className="me-3 btn btn-success btn-sm float-end" to={`/add-chapter/`+course_id}>Add Chapter</Link></h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Video</th>
                                        <th>Remarks</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chapterData.map((chapter,index)=>
                                    <tr>
                                        <td><Link to={`/edit-chapter/`+chapter.id}>{chapter.title}</Link> </td>
                                        <td>
                                            <video controls width="250">
                                                <source src={chapter.video.url} type="video/webm"/>
                                            
                                                <source src={chapter.video.url} type="video/mp4"/>
                                            </video>
                                    
                                        </td>
                                        <td> {chapter.remarks}</td>
                                        <td>
                                            <Link to={`/edit-chapter/`+chapter.id} className="btn btn-info text-white btn-sm "><i class="bi bi-pencil-square"></i></Link>
                                            <button onClick={()=>handleDeleteClick(chapter.id)} className="btn btn-danger btn-sm ms-1"><i class="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default CourseChapters;