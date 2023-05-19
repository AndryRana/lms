import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from "axios";
const baseUrl='http://127.0.0.1:8000/api';
function Sidebar(){
    const [notifData,setnotifData] = useState([]);
    const studentId=localStorage.getItem('studentId');
      // fetch courses
      useEffect(()=>{
        try {
            axios.get(`${baseUrl}/student/fetch-all-notifications/`+studentId)
            .then((response) => {
                console.log(response.data);
                setnotifData(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    },[]);
    return (
        <div className="card">
        <h5 className="card-header"> Dashboard</h5>
            <div className="list-group list-group-flush">
                <Link to="/user-dashboard" className=" list-group-item list-group-item-action">Dashboard</Link>
                <Link to="/my-courses" className=" list-group-item list-group-item-action">My courses</Link>
                <Link to="/favorite-courses" className=" list-group-item list-group-item-action">Favorite courses</Link>
                <Link to="/recommended-courses" className=" list-group-item list-group-item-action">Recommended courses</Link>
                <Link to="/my-assignments" className=" list-group-item list-group-item-action">Assignments
                 <span className="float-end badge bg-danger mt-1">{notifData.length}</span> </Link>
                <Link to="/profile-setting" className=" list-group-item list-group-item-action">Profile setting</Link>
                <Link to="/change-password" className=" list-group-item list-group-item-action">Change Password</Link>
                <Link to="/user-logout" className=" list-group-item list-group-item-action">Logout</Link>
            </div>
        </div>
    );
}

export default Sidebar;
