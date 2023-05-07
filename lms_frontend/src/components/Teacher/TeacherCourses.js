import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from "axios";
const baseUrl='http://127.0.0.1:8000/api';
function MyCourses(){
    const [courseData,setCourseData] = useState([])
    
    const teacherId =localStorage.getItem('teacherId');
    // console.log(teacherId);

    // fetch courses when page load
    useEffect(()=>{
        try {
            axios.get(`${baseUrl}/teacher-courses/`+teacherId)
            .then((response) => {
                setCourseData(response.data);
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
                        <h5 className="car-header">My courses</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Total Enrolled</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseData.map((course,index)=>
                                    <tr>
                                        <td><Link to={`/all-chapters/`+ course.id}>{course.title}</Link> </td>
                                        <td><img src={course.feature_img} width="80" className='rounded' alt={course.title} /> </td>
                                        <td> <Link to="/">123</Link></td>
                                        <td>
                                        <Link className="btn btn-info btn-sm" to={`/edit-course/`+ course.id} >Edit</Link>
                                        <Link className="btn btn-success btn-sm ms-2" to={`/add-chapter/`+ course.id} >Add Chapter</Link>
                                        <button className="btn btn-danger btn-sm ms-2">Delete</button>
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

export default MyCourses;