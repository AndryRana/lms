import Sidebar from './TeacherSidebar';

function TeacherProfileSetting(){
    return (
        <div className="container mt-4">
            <div className="row">
            <aside className="col-md-3" >
                <Sidebar/>
            </aside>
            <section className="col-md-9" >
            <div className="card mt-4">
                <h5 className="card-header">Profile Settings</h5>
                <div className="card-body">
                    <div className="mb-3 row">
                        <label for="staticEmail" className="col-sm-2 col-form-label">Full Name</label>
                        <div className="col-sm-10">
                            <input type="text" readonly className="form-control" id="staticEmail" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="text" readonly className="form-control" id="staticEmail" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="inputPassword" className="col-sm-2 col-form-label">Profile photo</label>
                        <div className="col-sm-10">
                            <input type="file" className="form-control" id="inputPassword"/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputPassword"/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="inputPassword" className="col-sm-2 col-form-label">Skills</label>
                        <div className="col-sm-10">
                            <textarea className= "form-control"></textarea>
                            <div id="emailHelp" className="form-text">PHP, Python, JavaScript, etc</div>
                        </div>
                    </div>
                    <hr/>
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </div>
            </section>
            </div>
        </div>
    );
}

export default TeacherProfileSetting;