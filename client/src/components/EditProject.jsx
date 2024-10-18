import { useParams } from "react-router-dom"
import { GET_PROJECT, GET_PROJECTS } from "../queries/projectQueries"
import { useQuery } from "@apollo/client"
import Spinner from "./Spinner"
import { useEffect, useState } from "react"
import { UPDATE_PROJECT } from "../mutations/projectMutation"
import { useMutation } from "@apollo/client"
import { useNavigate } from "react-router-dom"
export default function EditProject() {
    const {id} = useParams()
    const [errors, setErrors] = useState();
    const statusValue = ['new', 'progress', 'completed']

    const navigate = useNavigate()


    const {loading, error, data} = useQuery(GET_PROJECT, {
        variables: {id: id}
    })

    const [project, setProject] = useState({
        name: "",
        description: "",
        status: ""
    });

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: {id: id, name: project.name, description: project.description, status: project.status},
        refetchQueries: [{query: GET_PROJECT, variables: {id: id}}],
        update(cache, {data: {updateProject}}) {
            const {projects} = cache.readQuery({query: GET_PROJECTS});
            const updatedProjects = projects.map((p) => 
                p.id === id ? { ...p, ...updateProject } : p
            );
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: updatedProjects },
            });
        },
        onCompleted: () => {
            // Fermer la modal après l'ajout du client
            navigate('./..')
        },
    })



    

    // Utiliser useEffect pour mettre à jour l'état lorsque les données sont chargées
    useEffect(() => {
        if (data && data.project) {
            setProject({
                name: data.project.name,
                description: data.project.description,
                status: data.project.status // Assurez-vous que `status` est bien récupéré
            });
        }
    }, [data]);


    const handleChange = (e) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        });
    };

    const handleEdit = (e) => {
        e.preventDefault()
        setErrors()

        if (!project.name || project.name.trim() === "") {
            setErrors('Please enter a Name for the project')
            return;
        }
        if (!project.description || project.description.trim() === "") {
            setErrors('Please enter a Description for the project')
            return;
        }
        if (!project.status || project.status.trim() === "") {
            setErrors('Please select a Status for the project')
            return;
        }
        if (!statusValue.includes(project.status) ) {
            setErrors('Please enter a valid Status')
        }

        updateProject()
    }

    if (loading) return <Spinner />


    return (
        <>
        <div className='w-1/2 right-0 translate-x-1/2 border rounded-2xl p-16'>
            <h1 className="text-3xl mb-6">Edit Project {(data.project.name).charAt(0).toUpperCase() + data.project.name.slice(1)}</h1>
            {errors && (
                <p className='text-white bg-red-400/75 p-2 border-2 rounded-md border-red-400'>{errors}</p>
            )}
            <form onSubmit={handleEdit} className="flex flex-col gap-6">
                <label htmlFor="name" className='flex flex-col'>
                    Name
                    <input onChange={handleChange} value={project.name} type="text" name='name' placeholder='Name' className='p-2 border border-pink-300/50 rounded-md bg-pink-100/25 focus:bg-white'/>
                </label>
                <label htmlFor="description" className='flex flex-col'>
                    Description
                    <textarea onChange={handleChange} value={project.description} type="text" name='description' placeholder='Description' className='p-2 border border-pink-300/50 rounded-md bg-pink-100/25 focus:bg-white'/>
                </label>
                <label htmlFor="status" className='flex flex-col'>
                    Status
                    <select name="status" id="status" onChange={handleChange} defaultValue={""} className='p-2 border border-pink-300/50 rounded-md bg-pink-100/25 focus:bg-white'>
                        <option value="" disabled>Select a Status</option>
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </label>
                
                <button className='bg-pink-500/60 text-white px-4 py-2 rounded-xl mb-4 hover:bg-pink-500/75 font-medium duration-150 active:scale-95'>Update</button>
            </form>
        </div>
        </>
        
    )
}
