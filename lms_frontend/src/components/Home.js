import { Link } from "react-router-dom";
import AllCourses from "./AllCourses";
import {useState, useEffect} from 'react';
import axios from "axios";
const baseUrl='http://127.0.0.1:8000/api';

function Home() {
    const [courseData,setCourseData] = useState([]);
    const [popularcourseData,setpopularcourseData] = useState([]);
    const [popularteacherData,setpopularteacherData] = useState([]);
    const [testimonialData,settestimonialData] = useState([]);

    // fetch courses when page load
    useEffect(()=>{
        document.title='LMS | Home Page';
        try {
            axios.get(`${baseUrl}/course/?result=4`)
            .then((response) => {
                console.log('popular_course',response.data);
                setCourseData(response.data.results);
            });
        } catch (error) {
            console.log(error);
        }
        // fetch popular Courses
        try {
            axios.get(`${baseUrl}/popular-courses/?popular=1`)
            .then((response) => {
                setpopularcourseData(response.data);
            });
        } catch (error) {
            console.log(error);
        }
        // fetch popular Teachers
        try {
            axios.get(`${baseUrl}/popular-teachers/?popular=1`)
            .then((response) => {
                setpopularteacherData(response.data);
            });
        } catch (error) {
            console.log(error);
        }
        // fetch Student Testimonial
        try {
            axios.get(`${baseUrl}/student-testimonial/`)
            .then((response) => {
                settestimonialData(response.data);
            });
        } catch (error) {
            console.log(error);
        }

    },[]);
    return (
        <div className="container mt-4">
        {/** Latest Courses */} 
        <h3 className="pb-1 mb-4 " >Latest Courses <Link to="/all-courses" className="float-end">See All</Link> </h3>
            <div className="row mb-4" >
                {courseData && courseData.map((course, index) => 
                    <div className="col-md-3 mb-4">
                        <div className="card">
                            <Link to={`/detail/${course.id}`}><img src={course.feature_img} className="card-img-top" alt={course.title}/></Link>
                            <div className="card-body">
                                <h5 className="card-title"> <Link to={`/detail/${course.id}`}>{course.title}</Link></h5>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        {/** End Latest Courses */}
        {/** Popular Courses */} 
        <h3 className="pb-1 mb-4 mt-5" > Popular Courses <Link to="/popular-courses" className="float-end">See All</Link></h3>
            <div className="row mb-4" >
                {popularcourseData && popularcourseData.map((row, index) =>
                    <div className="col-md-3">
                        <div className="card">
                            <Link to={`/detail/${row.course.id}`}><img src={row.course.feature_img} className="card-img-top" alt={row.course.title}/></Link>
                            <div className="card-body">
                                <h5 className="card-title"> <Link to={`/detail/${row.course.id}`}>{row.course.title}</Link> </h5>
                            </div>
                            <div className="card-footer">
                                <div className="title">
                                    <span>Rating: {row.rating}/5</span>
                                    <span className="float-end">Views: {row.course.course_views}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/** End Popular Courses */}
        {/** Popular Teachers */} 
        <h3 className="pb-1 mb-4 mt-5" > Popular Teachers <Link to="/popular-teachers" className="float-end">See All</Link></h3>
                <div className="row mb-4" >
                {popularteacherData && popularteacherData.map((teacher, index) =>
                    <div className="col-md-3">
                        <div className="card">
                        <Link to="/teacher-detail/1"><img src={teacher.profile_img} className="card-img-top" alt="..."/></Link >
                            <div className="card-body">
                                <h5 className="card-title"> <Link to={`/teacher-detail/${teacher.id}`}>{teacher.full_name}</Link > </h5>
                            </div>
                            <div className="card-footer">
                            <div className="title">
                                <span>Total Courses: {teacher.total_teacher_courses}</span>
                                
                            </div>
                        </div>
                        </div>
                    </div>
                )}
                </div>
            {/** End Popular Teachers */}
        {/** Student Testimonial */} 
        <h3 className="pb-1 mb-4 mt-5" > Student Testimonial <a href="#" className="float-end">See All</a></h3>
        <div id="carouselExampleIndicators" className="carousel slide bg-dark text-white py-5" data-bs-ride="carousel">
            <div className="carousel-indicators">
            {testimonialData && testimonialData.map((row, index) =>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index===0 ? "active" : "" }></button>
            )}
            </div>
            <div className="carousel-inner">
            {testimonialData && testimonialData.map((row, i) =>
                <div className={i === 0 ? "carousel-item text-center active" : "carousel-item text-center "}>
                    <figure className="text-center">
                        <blockquote className="blockquote">
                            <p>{row.reviews}</p>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                            {row.course.title} <cite title="Source Title">{row.student.full_name} </cite>
                        </figcaption>
                    </figure>
                </div>
            )}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        {/** End Student Testimonial */}
        </div>
    );
}

export default Home;
