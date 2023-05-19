import {Link,useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from "axios";
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';

function StudyMaterials(){
    const [studyData,setstudyData] = useState([]);
    const [totalResult,settotalResult] = useState(0);
    const {course_id}=useParams();
    // fetch courses when page load
    useEffect(()=>{
        try {
            axios.get(`${baseUrl}/study-materials/`+course_id)
            .then((response) => {
                settotalResult(response.data.length);
                setstudyData(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    },[]);
    
    // delete Data
    const handleDeleteClick =(study_id)=>{
        Swal.fire({
            title: 'Confirm!',
            text: 'Do you want to delete?',
            icon: 'info',
            confirmButtonText: 'Confirm',
            showCancelButton:true
        }).then((result) => {
            if(result.isConfirmed) {
                try {
                    axios.delete(baseUrl +'/study-material/'+study_id)
                    .then((res) => {
                        Swal.fire('success', 'Data has been deleted.');
                        try {
                            axios.get(`${baseUrl}/study-materials/`+course_id)
                            .then((response) => {
                                settotalResult(response.data.length);
                                setstudyData(response.data);
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
                        <h5 className="car-header mt-1">All Study Materials ({totalResult}) <Link className="me-3 btn btn-success btn-sm float-end" to={`/add-study/`+course_id}>Add Study Material</Link></h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Upload</th>
                                        <th>Remarks</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studyData.map((row,index)=>
                                    <tr>
                                        <td>{row.title} </td>
                                        <td>
                                            <Link to={`${ row.upload }`}>File</Link>
                                    
                                        </td>
                                        <td> {row.remarks}</td>
                                        <td>
                                            <button onClick={()=>handleDeleteClick(row.id)} className="btn btn-danger btn-sm ms-1"><i class="bi bi-trash"></i></button>
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

export default StudyMaterials;