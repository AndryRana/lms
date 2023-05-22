import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';
import axios from "axios";
const baseUrl='http://127.0.0.1:8000/api';
function Category() {
    const [categoryData,setcategoryData] = useState([])
    useEffect(()=>{
        try {
            axios.get(`${baseUrl}/category/`)
            .then((response) => {
                setcategoryData(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    },[]);
    return (
        <div className="container mt-4">
            <h3 className="pb-1 mb-4 " >All Categories</h3>
            <div className="row mb-4" >
            {categoryData && categoryData.map((row, index) => 
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"> <Link to={`/course/${row.id}/${row.title}`}>{row.title} ({row.total_courses})</Link> </h5>
                            <p className="card-text">{row.description}</p>
                        </div>
                    </div>
                </div>
            )}
            </div>
            {/** Pagination Start */}
            {/**<nav aria-label="Page navigation example mt-4">
                <ul className="pagination justify-content-center">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav>*/}
            {/** End Pagination */}
        </div>
    );
}

export default Category;