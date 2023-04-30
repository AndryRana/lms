import {Link} from 'react-router-dom';

function Sidebar(){
    return (
        <div className="card">
        <h5 className="card-header"> Dashboard</h5>
            <div className="list-group list-group-flush">
                <Link to="/user-dashboard" className=" list-group-item list-group-item-action">Dashboard</Link>
                <Link to="/my-courses" className=" list-group-item list-group-item-action">My courses</Link>
                <Link to="/favorite-courses" className=" list-group-item list-group-item-action">Favorite courses</Link>
                <Link to="/recommended-courses" className=" list-group-item list-group-item-action">Recommended courses</Link>
                <Link to="/profile-setting" className=" list-group-item list-group-item-action">Profile setting</Link>
                <Link to="/change-password" className=" list-group-item list-group-item-action">Change Password</Link>
                <Link to="/user-login" className=" list-group-item list-group-item-action">Logout</Link>
            </div>
        </div>
    );
}

export default Sidebar;
