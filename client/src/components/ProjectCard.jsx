import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa6";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../mutations/projectMutation";
import { GET_PROJECTS } from "../queries/projectQueries";
import toast from 'react-hot-toast';
import { GET_CLIENT } from "../queries/clientQueries";


export default function ProjectCard({project}) {

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: {id: project.id},
        refetchQueries: [{query: GET_CLIENT, variables: {id: project.client.id}}],
        // update(cache, {data: {deleteProject}}) {
        //     const {projects} = cache.readQuery({query: GET_PROJECTS});
        //     cache.writeQuery({
        //         query: GET_PROJECTS,
        //         data: {projects: projects.filter(project => project.id !== deleteProject.id)},
        //     });
        // },
        onCompleted: () => {
            toast.success('Project Successfully Deleted', {
                duration: 3000
            })
            
        },

    });

    const shortDescription = (description) => {
        if (description.length > 20) {
            return description.slice(0, 20) + "..."
        }

        return description
    }
    
    

    return (
        <>
        <div className="border rounded-lg p-6 flex flex-col justify-between">
            <div>
                <h2 className="text-xl font-medium">{(project.name).charAt(0).toUpperCase() + project.name.slice(1)}</h2>
                <div className="text-wrap break-words">{shortDescription(project.description)}</div>
                <div className="mt-4">Status : <span className={project.status === "Completed" ? "text-green-400" : project.status === "Not Started" ? "text-red-500" : "text-yellow-500"}>{project.status} </span></div>
            </div>
            <div className="flex justify-between mt-4">
                <button onClick={deleteProject} title='Delete Project' className="rounded-full px-4 py-2 bg-red-400 hover:bg-red-500"><FaTrash className='text-white'/></button>

                <Link to={`/projects/${project.id}`} className="bg-pink-500/60 text-white px-4 py-2 rounded-xl hover:bg-pink-500/75 flex items-center w-fit ">View</Link>

            </div>
        </div>
        </>
        
    )
}
