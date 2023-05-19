import { Link,useParams } from "react-router-dom";
import {useState, useEffect} from 'react';
import axios from "axios";
const baseUrl='http://127.0.0.1:8000/api';
function Search() {
    const [courseData,setCourseData] = useState([])
    const {searchstring}=useParams();
    // fetch search when page load
    useEffect(()=>{
        try {
            axios.get(`${baseUrl}/search-courses/`+searchstring)
            .then((response) => {
                setCourseData(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    },[]);
    return (
        <div className="container mt-4">
            {/** Latest Courses */} 
            <h3 className="pb-1 mb-4 " >Search for <span className="text-primary">{searchstring}</span></h3>
            <div className="row mb-4" >
            {courseData && courseData.map((course, index) => 
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to={`/detail/${course.id}`}><img src={course.feature_img} className="card-img-top" alt={course.title}/></Link>
                        <div className="card-body">
                            <h5 className="card-title"> <Link to={`/detail/${course.id}`}>{course.title}</Link> </h5>
                        </div>
                    </div>
                </div>
            )}
            </div>
            {/** End Latest Courses */}
            {/** Pagination Start */}
            <nav aria-label="Page navigation example mt-4">
                <ul className="pagination justify-content-center">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav>
            {/** End Pagination */}
        </div>
    );
}

export default Search;