import { Link,useParams } from "react-router-dom";
import {useState, useEffect} from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
const siteUrl='http://127.0.0.1:8000/';
const baseUrl='http://127.0.0.1:8000/api';
function CourseDetail(){
    const [courseData,setcourseData] = useState([]);
    const [chapterData,setchapterData] = useState([]);
    const [teacherData,setteacherData] = useState([]);
    const [relatedCourseData,setrelatedCourseData] = useState([]);
    const [techListData,settechListData] = useState([]);
    const [userLoginStatus,setuserLoginStatus] = useState();
    const [enrollStatus,setenrollStatus] = useState();
    const [ratingStatus,setratingStatus] = useState();
    const [avgRating,setavgRating] = useState(0);
    const [favoriteStatus,setfavoriteStatus] = useState();
    const studentId =localStorage.getItem('studentId');
    let {course_id}=useParams();

    // fetch courses when page load
    useEffect(()=>{
        try {
            axios.get(`${baseUrl}/course/`+course_id)
            .then((response) => {
                setcourseData(response.data);
                setchapterData(response.data.course_chapters);
                setteacherData(response.data.teacher);
                setrelatedCourseData(JSON.parse(response.data.related_videos));
                settechListData(response.data.tech_list);
                if(response.data.course_rating!==''&& response.data.course_rating!==null){
                    setavgRating(response.data.course_rating);
                }
            });
        } catch (error) {
            console.log(error);
        }

        //  Fetch enroll status
        try {
            axios.get(`${baseUrl}/fetch-enroll-status/`+studentId+'/'+course_id)
            .then((response) => {
                if(response.data.bool===true) {
                    setenrollStatus('success');
                }
                console.log(response.data);
            });
        } catch (error) {
            console.log(error);
        }

        //  Fetch rating status
        try {
            axios.get(`${baseUrl}/fetch-rating-status/`+studentId+'/'+course_id)
            .then((response) => {
                if(response.data.bool===true) {
                    setratingStatus('success');
                }
                console.log(response.data);
            });
        } catch (error) {
            console.log(error);
        }

        //  Fetch enroll status
        try {
            axios.get(`${baseUrl}/fetch-favorite-status/`+studentId+'/'+course_id)
            .then((response) => {
                if(response.data.bool===true) {
                    setfavoriteStatus('success');
                }else{
                    setfavoriteStatus('');
                }
                console.log(response.data);
            });
        } catch (error) {
            console.log(error);
        }

        const studentLoginStatus =localStorage.getItem('studentLoginStatus')
        if(studentLoginStatus==='true') {
            setuserLoginStatus('success')
    }
    },[]);

    // console.log(relatedCourseData);

    const enrollCourse=() => {
        const _formData=new FormData();
        _formData.append('course', course_id);
        _formData.append('student', studentId);
        try {
            axios.post(`${baseUrl}/student-enroll-course/`, _formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status ===200 || res.status===201) {
                    Swal.fire({
                        title: 'You have successfully enroll in this course!',
                        icon: 'success',
                        toast:true,
                        timer:10000,
                        position:'top-right',
                        timerProgressBar:true,
                        showConfirmButton:false
                    });
                    setenrollStatus('success');
                }
            });

        } catch (error) {
            console.log(error);
        }
    }

    // Mark as Favorite Course
    const markAsFavorite = ()=> {
        const _formData=new FormData();
        _formData.append('course', course_id);
        _formData.append('student', studentId);
        _formData.append('status', true);
        try {
            axios.post(`${baseUrl}/student-add-favorite-course/`, _formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status ===200 || res.status===201) {
                    Swal.fire({
                        title: 'The course has been added in your wish list!',
                        icon: 'success',
                        toast:true,
                        timer:3000,
                        position:'top-right',
                        timerProgressBar:true,
                        showConfirmButton:false
                    });
                    setfavoriteStatus('success');
                }
            });

        } catch (error) {
            console.log(error);
        }
    }
    // End Add favorite
    // Remove Favorite Course
    const removeFavorite = (pk)=> {
        const _formData=new FormData();
        _formData.append('course', course_id);
        _formData.append('student', studentId);
        _formData.append('status', false);
        try {
            axios.get(`${baseUrl}/student-remove-favorite-course/`+course_id+'/'+studentId,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status ===200 || res.status===201) {
                    Swal.fire({
                        title: 'The course has been removed from your wish list!',
                        icon: 'success',
                        toast:true,
                        timer:3000,
                        position:'top-right',
                        timerProgressBar:true,
                        showConfirmButton:false
                    });
                    setfavoriteStatus('');
                }
            });

        } catch (error) {
            console.log(error);
        }
    }
    // End Remove

    // Add Rating
    const [ratingData, setratingData]=useState({
        rating:'',
        reviews:'',
    });


    const handleChange=(event) =>{
        setratingData({
            ...ratingData,
            [event.target.name]:event.target.value
        });
    }

    const formSubmit=(event)=>{
        event.preventDefault();
        const _formData=new FormData();
        _formData.append('course', course_id);
        _formData.append('student', studentId);
        _formData.append('rating', ratingData.rating);
        _formData.append('reviews', ratingData.reviews);
        try {
            axios.post(`${baseUrl}/course-rating/`, _formData)
            .then((res)=>{
                if(res.status ===200 || res.status===201) {
                    Swal.fire({
                        title: 'Rating has been saved!',
                        icon: 'success',
                        toast:true,
                        timer:5000,
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
        <div className="container mt-3">
            <div className="row">
                <div className="col-4">
                    <img src={courseData.feature_img} className="img-thumbnail" alt={courseData.title}/>
                </div>
                <div className="col-8">
                    <h3>{courseData.title}</h3>
                    <p>{courseData.description}</p>
                    <p className="fw-bold">Course by: <Link to={`/teacher-detail/${teacherData.id}`}>{teacherData.full_name}</Link></p>
                    <p className="fw-bold">Techs: &nbsp;
                    {techListData.map((tech,index)=>
                        <Link to={`/category/${tech.trim()}`} className="badge bg-pill bg-warning text-dark ms-2 text-decoration-none">{tech.trim()}</Link>
                    )}
                     </p>
                    <p className="fw-bold">Duration: 3 Hours 30 Minutes</p>
                    <p className="fw-bold">Total Enrolled: {courseData.total_enrolled_students} Student(s)</p>
                    <p className="fw-bold">
                    Rating: {avgRating}/5 
                    {enrollStatus==='success' && userLoginStatus==='success' && 
                        <>
                        { ratingStatus!='success' &&
                        <button className="btn btn-success btn-sm ms-2" data-bs-toggle="modal" data-bs-target="#ratingModal">Rating</button>
                        }
                        { ratingStatus=='success' &&
                        <small className="badge bg-info text-dark ms-2">You have already rated this course</small>
                        }
                        <div className="modal fade" id="ratingModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Rate for {courseData.title} </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label for="exampleInputEmail1" className="form-label">Rating</label>
                                            <select onChange={handleChange} className="form-control" name="rating">
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label for="exampleInputPassword1" className="form-label">Review</label>
                                            <textarea onChange={handleChange} className="form-control" name="reviews" rows="10"></textarea>
                                        </div>
                                        <button type="button" onClick={formSubmit} className="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </>
                    }
                    </p>
                    {enrollStatus==='success' && userLoginStatus==='success' &&
                        <p><span>You have already enrolled in this course</span></p>
                    }
                    {userLoginStatus==='success' && enrollStatus!=='success' &&
                        <p><button onClick={enrollCourse} type="button" className="btn btn-success">Enroll in this course</button></p>
                    }
                    {userLoginStatus==='success' && favoriteStatus !=='success' &&
                        <p><button onClick={markAsFavorite} title="Add in your favorite course list" type="button" className="btn btn-outline-danger"><i class="bi bi-heart-fill"></i></button></p>
                    }
                    {userLoginStatus==='success' && favoriteStatus ==='success' &&
                        <p><button onClick={removeFavorite} title="Remove from your favorite course list" type="button" className="btn btn-danger"><i class="bi bi-heart-fill"></i></button></p>
                    }
                    {userLoginStatus!=='success' &&
                        <p><Link to="/user-login">Please Login to enroll in this course</Link></p>
                    }

                </div>
            </div>
            {/** Course Video */}
            {enrollStatus==='success' && userLoginStatus==='success' &&
            <div className="card mt-4">
                <h5 className="card-header">
                    Chapters
                </h5>
                <ul className="list-group list-group-flush">
                {chapterData.map((chapter,index)=>
                    <li className="list-group-item">{chapter.title}
                        <span className="float-end">
                            <span className="me-3">1Hour 30 Minutes</span>
                            <button className="btn btn-sm btn-danger"><i className="bi bi-play-btn-fill" data-bs-toggle="modal" data-bs-target="#videoModal1"></i></button> 
                        </span>
                        {/* Video Modal Start*/}
                        <div className="modal fade" id="videoModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-xl">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Video 1</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="ratio ratio-16x9">
                                            <iframe src={chapter.video} title={chapter.title} allowfullscreen></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Video Modal */}
                    </li>
                )}
                </ul>
            </div>
            }

            <h3 className="pb-1 mb-4 mt-5 " >Related Courses</h3>
            <div className="row mb-4" >
            {relatedCourseData.map((rcourse,index)=>
                <div className="col-md-3">
                    <div className="card">
                        <Link target="_blank" to={`/detail/${rcourse.pk}`}><img src={`${siteUrl}media/${rcourse.fields.feature_img}`} className="card-img-top" alt={rcourse.fields.title}/></Link>
                        <div className="card-body">
                            <h5 className="card-title"> <Link to={`/detail/${rcourse.pk}`}>{rcourse.fields.title}</Link> </h5>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}

export default CourseDetail;