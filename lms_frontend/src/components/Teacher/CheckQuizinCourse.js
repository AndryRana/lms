import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
const baseUrl='http://127.0.0.1:8000/api';
function CheckQuizinCourse(props){
    const [quizData,setquizData] = useState([]);
    const teacherId =localStorage.getItem('teacherId');
    // fetch courses when page load
    useEffect(()=>{
        try {
            axios.get(`${baseUrl}/fetch-quiz-assign-status/${props.quiz}/${props.course}`)
            .then((response) => {
                setquizData(response.data);
            });
        } catch (error) {
            console.log(error);
        }

    },[]);

// Assign quiz to course
const assignQuiz=(quiz_id) => {
    const _formData=new FormData();
    _formData.append('teacher', teacherId);
    _formData.append('course', props.course);
    _formData.append('quiz', props.quiz);
    try {
        axios.post(`${baseUrl}/quiz-assign-course/`, _formData,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then((res)=>{
            if(res.status ===200 || res.status===201) {
                Swal.fire({
                    title: 'Quis is successfull assigned in the course!',
                    icon: 'success',
                    toast:true,
                    timer:10000,
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
}
    return (
        <td>
            {quizData.bool==false &&
                <button onClick={()=>assignQuiz(props.quiz)}  className="btn btn-success btn-sm">Assign Quiz</button>
            }
            {quizData.bool==true &&
                <>
                <span className="badge bg-info text-black">
                Assigned 
                </span>
                <Link to={`/attempted-students/`+props.quiz} className='badge bg-warning ms-2 text-decoration-none'>Attempted Students</Link>
                </>
            }
           
        </td>
    );

}

export default CheckQuizinCourse;