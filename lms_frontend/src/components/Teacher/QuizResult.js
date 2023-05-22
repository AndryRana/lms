

import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
const baseUrl='http://127.0.0.1:8000/api';
function QuizResult(props){
    const [resultData,setresultData] = useState([]);
    // fetch courses when page load
    useEffect(()=>{
        try {
            axios.get(`${baseUrl}/fetch-quiz-result/${props.quiz}/${props.student}`)
            .then((response) => {
                setresultData(response.data);
            });
        } catch (error) {
            console.log(error);
        }

    },[]);

    return (
        
        <div className="modal-dialog ">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Total Questions</th>
                            <th>Attempted Questions</th>
                            <th>Total correct Answer</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{resultData.total_questions}</td>
                            <td>{resultData.total_attempted_questions}</td>
                            <td>{resultData.total_correct_ans}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
    );

}

export default QuizResult;