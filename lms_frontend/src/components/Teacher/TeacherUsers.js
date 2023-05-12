import {useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from "axios";
const baseUrl='http://127.0.0.1:8000/api';
function TeacherUsers(){
    const [studentData,setstudentData] = useState([]);

    const teacherId =localStorage.getItem('teacherId');
    // fetch courses when page load
    useEffect(()=>{
        try {
            axios.get(`${baseUrl}/fetch-all-enroll-students/`+teacherId)
            .then((response) => {
                setstudentData(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    },[]);

// console.log(courseData);

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3" >
                    <TeacherSidebar/>
                </aside>
                <section className="col-md-9" >
                    <div className="card">
                        <h5 className="card-header">All enrolled Student List</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Username</th>
                                        <th>Interested categories</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentData.map((row,index)=>
                                    <tr>
                                        <td>{row.student.full_name} </td>
                                        <td> {row.student.email}</td>
                                        <td> {row.student.username}</td>
                                        <td>
                                        {row.student.interested_categories}
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

export default TeacherUsers;