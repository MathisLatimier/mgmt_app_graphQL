import { useEffect, useState } from "react"
import { FaXmark } from "react-icons/fa6";
import { GET_CLIENT, GET_CLIENTS } from "../../queries/clientQueries";
import { useQuery, useMutation } from "@apollo/client";
import Spinner from "../Spinner";
import { ADD_PROJECT } from "../../mutations/projectMutation";
import { GET_PROJECTS } from "../../queries/projectQueries";

export default function AddProject({onClose, onSuccess}) {
    const [project, setProject] = useState({
        name: "",
        description: "",
        status: "",
        clientId: ""
    })
    const [errors, setErrors] = useState()
    const {loading, error, data} = useQuery(GET_CLIENTS)
    const statusValue = ['new', 'progress', 'completed']

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: {name: project.name, description: project.description, status: project.status, clientId: project.clientId},
        refetchQueries: [{query: GET_CLIENT, variables: {id: project.clientId}}],
        update(cache, {data: {addProject}}) {
            const {projects} = cache.readQuery({query: GET_PROJECTS});
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject] },
            });
        },
        onCompleted: () => {
            // Fermer la modal après l'ajout du client
            onSuccess();
        },
        
    });

    useEffect(() => {
        const modal = document.getElementById("parent-modal");
        modal.style.transform = "scale(1)"
    }, [])

    const handleClickInside = (e) => {
        e.stopPropagation(); // Empêche la propagation du clic au parent
    };
    const handleChange = (e) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        });
    };

    const onAdd = (e) => {
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
        if (!project.clientId || project.clientId.trim() === "") {
            setErrors('Please select a Owner for the project')
            return;
        }

        addProject()
    }
    return (
        <div onClick={() => onClose(false)} id="parent-modal" className='absolute top-0 right-0 left-0 bottom-0 bg-black/25 z-20 duration-200' style={{transform: "scale(0)", transition: "transform 0.3s ease-in-out"}}>
            <div onClick={handleClickInside} className='absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 bg-white p-14 rounded-xl shadow-xl lg:w-1/3 w-11/12 '>
                <div className='flex justify-between items-start mb-4'>
                    <h1 className='text-2xl'>Add A project</h1>
                    <button onClick={() => onClose(false)} className=''><FaXmark className='h-6' /></button>

                </div>
                {errors && (
                    <p className='text-white bg-red-400/75 p-2 border-2 rounded-md border-red-400'>{errors}</p>
                )}
                <form className='flex flex-col gap-4' onSubmit={onAdd}>
                    <label htmlFor="name" className='flex flex-col'>
                        Name
                        <input onChange={handleChange} type="text" name='name' placeholder='Name' className='p-2 border border-pink-300/50 rounded-md bg-pink-100/25 focus:bg-white'/>
                    </label>
                    <label htmlFor="description" className='flex flex-col'>
                        Description
                        <textarea onChange={handleChange} type="text" name='description' placeholder='Description' className='p-2 border border-pink-300/50 rounded-md bg-pink-100/25 focus:bg-white'/>
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
                    <label htmlFor="clientId" className="flex flex-col">
                        Owner
                        {!data ? (<Spinner />) : (
                            <select name="clientId" id="clientId" onChange={handleChange} defaultValue={""} className='p-2 border border-pink-300/50 rounded-md bg-pink-100/25 focus:bg-white'>
                                <option value="" disabled>Select a Client</option>
                                
                                {data.clients.map((client) => (
                                    <option key={client.id} value={client.id}>{client.name}</option>
                                ))}
                            </select>
                        )}
                        
                    </label>
                    <button className='bg-pink-500/60 text-white px-4 py-2 rounded-xl mb-4 hover:bg-pink-500/75 font-medium duration-150 active:scale-95'>Add</button>
                </form>
            </div>
        </div>
    )
}
