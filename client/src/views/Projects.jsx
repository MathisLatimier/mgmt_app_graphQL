import Spinner from "../components/Spinner"
import { useQuery } from "@apollo/client"
import { GET_PROJECTS } from "../queries/projectQueries"
import ProjectCard from "../components/ProjectCard"
import AddProject from "../components/modals/AddProject"
import { useState } from "react"
import toast from 'react-hot-toast';


export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS)
  const [isModalOpen, setIsModalOpen] = useState(false)


  if (loading) return <Spinner />
  if (error) return <div>Something Went Wrong</div>

  const onSuccessAdd = () => {
    toast.success('Project Successfully Created', {
        duration: 3000
    })
    setIsModalOpen(false)
  }


  
  return (
    <>
    <button onClick={() => setIsModalOpen(true)} className="bg-pink-500/60 text-white px-4 py-2 rounded-xl mb-4 hover:bg-pink-500/75 flex items-center duration-150 active:scale-95">Add Project</button>

    {isModalOpen && (
      <AddProject onClose={() => setIsModalOpen(false)} onSuccess={onSuccessAdd}/>
    )}
    {data.projects.length > 0 ? (
      <div className="grid md:grid-cols-3 gap-10">
        {data.projects.map((project) => (
          <ProjectCard key={project.id} project={project}></ProjectCard>
        ))}
      </div>
    ) : (
      <div>No Projects availables</div>
    )}
    </>
  )
}
