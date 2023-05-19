import {Link} from 'react-router-dom';

function Sidebar(){
    return (
        <div className="card">
        <h5 className="card-header"> Dashboard</h5>
            <div className="list-group list-group-flush">
                <Link to="/teacher-dashboard" className=" list-group-item list-group-item-action">Dashboard</Link>
                <Link to="/teacher-courses" className=" list-group-item list-group-item-action">My courses</Link>
                <Link to="/add-course" className=" list-group-item list-group-item-action">Add course</Link>
                <Link to="/teacher-users" className=" list-group-item list-group-item-action">My Users</Link>
                <Link to="/quiz" className=" list-group-item list-group-item-action">Quiz</Link>
                <Link to="/add-quiz" className=" list-group-item list-group-item-action">Add Quiz</Link>
                <Link to="/teacher-profile-setting" className=" list-group-item list-group-item-action">Profile setting</Link>
                <Link to="/teacher-change-password" className=" list-group-item list-group-item-action">Change Password</Link>
                <Link to="/teacher-logout" className=" list-group-item list-group-item-action">Logout</Link>
            </div>
        </div>
    );
}

export default Sidebar;
