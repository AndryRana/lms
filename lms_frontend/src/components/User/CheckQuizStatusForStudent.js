import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import Sidebar from './Sidebar';
import {useState, useEffect} from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
const baseUrl='http://127.0.0.1:8000/api';
function CheckQuizStatusForStudent(props){
    const [quizData,setquizData] = useState([]);
    const studentId =localStorage.getItem('studentId');
    // fetch courses when page load
    useEffect(()=>{
        try {
            axios.get(`${baseUrl}/fetch-quiz-attempt-status/${props.quiz}/${props.student}`)
            .then((response) => {
                setquizData(response.data);
            });
        } catch (error) {
            console.log(error);
        }

    },[]);


    return (
        <td>
            {quizData.bool==false &&
                <Link to={`/take-quiz/${props.quiz}`} className="btn btn-success btn-sm">Take Quiz</Link>
            }
            {quizData.bool==true &&
                <span className="badge bg-info">Attempted</span>
            }
       
        </td>
    );

}

export default CheckQuizStatusForStudent;