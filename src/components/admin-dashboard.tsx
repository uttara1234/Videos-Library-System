
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom";
import type { VideoContract } from "../contract/videocontract";
import axios from "axios";

export function AdminDashboard(){

    const [cookies, setCookies, removeCookie] = useCookies(['admin_id']);
    const [videos, setVideos] = useState<VideoContract[]>();

    let navigate = useNavigate();

    function LoadVideos(){
        axios.get(`http://127.0.0.1:5053/get-videos`)
        .then(response=>{
            setVideos(response.data);
            console.log(response.data,"category_idcategory_id")
        })
    }

    useEffect(()=>{
         LoadVideos();
    },[])


    function handleSignout(){
        removeCookie('admin_id');
        navigate('/');
    }

    return(
        <div>
            <header className="d-flex justify-content-between">
                <h2>Admin Dashboard <button className="btn btn-link" onClick={handleSignout}></button> </h2>
            </header>
            <section>
                <Link to="/add-video" className="btn btn-primary bi bi-camera-video"> Add New Video </Link>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Preview</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          videos?.map(video => <tr key={video.video_id}>
                            <td>{video.title}</td>
                            <td>
                                <iframe src={video.url} width={200} height={100}></iframe>
                            </td>
                            <td>
                                <Link to={`/edit-video/${video.video_id}`} className="btn btn-warning"> <span className="bi bi-pen-fill"></span> </Link>
                                <Link to={`/delete-video/${video.video_id}`} className="btn btn-danger mx-2"> <span className="bi bi-trash-fill"></span> </Link>
                            </td>
                          </tr>)
                        }
                    </tbody>
                </table>
            </section>
        </div>
    )
}