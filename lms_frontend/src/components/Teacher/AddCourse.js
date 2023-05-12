import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from "axios";
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';
function AddCourse(){
    const [cats, setCats]=useState([]);
    const [courseData, setCourseData]=useState({
        category:'',
        title:'',
        description:'',
        f_img:'',
        techs:''
    });


    // Fetch categories when page load
    useEffect(()=>{
        try {
            axios.get(`${baseUrl}/category`)
            .then((response) => {
                setCats(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    },[]);

    const handleChange=(event) =>{
        setCourseData({
            ...courseData,
            [event.target.name]:event.target.value
        });
    }
    const handleFileChange=(event) =>{
        setCourseData({
            ...courseData,
            [event.target.name]:event.target.files[0]
        });
    }
    const formSubmit=(event)=>{
        const teacherId =localStorage.getItem('teacherId');
        event.preventDefault();
        const _formData=new FormData();
        _formData.append('category', courseData.category);
        _formData.append('teacher', teacherId);
        _formData.append('title', courseData.title);
        _formData.append('description', courseData.description);
        _formData.append('feature_img', courseData.f_img,courseData.f_img.name);
        _formData.append('techs', courseData.techs);
        try {
            axios.post(`${baseUrl}/course/`, _formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status ===200 || res.status===201) {
                    Swal.fire({
                        title: 'Data has been added!',
                        icon: 'success',
                        toast:true,
                        timer:3000,
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

//   console.log('courseData:', courseData);

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3" >
                    <TeacherSidebar/>
                </aside>
                <section className="col-md-9" >
                    <div className="card">
                        <h5 className="card-header">Add Course</h5>
                        <div className="card-body">
                            <form action="">
                                <div className="mb-3 row">
                                    <label htmlFor="category" className="col-sm-2 col-form-label">Category</label>
                                    <div className="col-sm-10">
                                        <select  name="category" onChange={handleChange} id="" className='form-control'>
                                            {cats.map((category,index)=>{return <option key={index} value={category.id}>{category.title}</option>})}
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                                    <div className="col-sm-10">
                                        <input  name='title' onChange={handleChange} type="text" readonly className="form-control" id="title" />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-10">
                                        <textarea  name='description' onChange={handleChange} className= "form-control" id="description" ></textarea>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="img" className="col-sm-2 col-form-label">Featured Image</label>
                                    <div className="col-sm-10">
                                        <input  name='f_img' onChange={handleFileChange} type="file" className="form-control" id="img"/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="techs" className="col-sm-2 col-form-label">Technologies</label>
                                    <div className="col-sm-10">
                                        <textarea  name='techs' onChange={handleChange} className= "form-control" id="techs" placeholder="Php, Python, HTML, CSS, Javascript"></textarea>
                                    </div>
                                </div>
                                <hr/>
                                <button type="submit" onClick={formSubmit} className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AddCourse;