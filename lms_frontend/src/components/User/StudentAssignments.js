import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import {useState, useEffect} from 'react';
import axios from "axios";
const baseUrl='http://127.0.0.1:8000/api';
function StudentAssignments(){
    const [assignmentData,setassignmentData] = useState([]);

    const studentId =localStorage.getItem('studentId');
    // fetch students when page load
    useEffect(()=>{
        try {
            axios.get(`${baseUrl}/my-assignments/`+studentId)
            .then((response) => {
                setassignmentData(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    },[]);
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3" >
                    <Sidebar/>
                </aside>
                <section className="col-md-9" >
                    <div className="card">
                        <h5 className="card-header">My assignments</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>detail</th>
                                        <th>Teacher</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {assignmentData.map((row,index)=>
                                    <tr>
                                        <td>{row.title}</td>
                                        <td>{row.detail}</td>
                                        <td> <Link to={`/teacher-detail/${row.teacher.id}`}>{row.teacher.full_name} </Link></td>
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

export default StudentAssignments;