import {useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
const baseUrl='http://127.0.0.1:8000/api';
function EditQuiz(){
    const [quizData, setquizData]=useState({
        title:'',
        detail:'',
    });
    const teacherId =localStorage.getItem('teacherId');
    const {quiz_id}=useParams();
    // Fetch categories when page load
    useEffect(()=>{

        // Fetch current quiz data
        try {
            axios.get(`${baseUrl}/teacher-quiz-detail/`+quiz_id)
            .then((res) => {
                setquizData({
                    title:res.data.title,
                    detail:res.data.detail,
                });
            });
        } catch (error) {
            console.log(error);
        }
        // End
    },[]);

    const handleChange=(event) =>{
        setquizData({
            ...quizData,
            [event.target.name]:event.target.value
        });
    }
    const formSubmit=()=>{
        const _formData=new FormData();
        _formData.append('teacher', teacherId);
        _formData.append('title', quizData.title);
        _formData.append('detail', quizData.detail);
        try {
            axios.put(`${baseUrl}/teacher-quiz-detail/`+quiz_id, _formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status ===200) {
                    Swal.fire({
                        title: 'Data has been updated!',
                        icon: 'success',
                        toast:true,
                        timer:3000,
                        position:'top-right',
                        timerProgressBar:true,
                        showConfirmButton:false
                    });
                }
            });

        } catch (error) {
            console.log(error);
        }
        
    };

//   console.log('quizData:', quizData);


    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3" >
                    <TeacherSidebar/>
                </aside>
                <section className="col-md-9" >
                    <div className="card">
                        <h5 className="card-header">Edit Quiz</h5>
                        <div className="card-body">
                            <div className="mb-3 row">
                                <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                                <div className="col-sm-10">
                                    <input  name='title'  value={quizData.title}  onChange={handleChange} type="text" readonly className="form-control" id="title" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="detail" className="col-sm-2 col-form-label">Detail</label>
                                <div className="col-sm-10">
                                    <textarea  name='detail'  value={quizData.detail}  onChange={handleChange} className= "form-control" id="description" ></textarea>
                                </div>
                            </div>
                            <button type="button" onClick={formSubmit} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default EditQuiz;