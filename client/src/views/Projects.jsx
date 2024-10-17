import Spinner from "../components/Spinner"
import { useQuery } from "@apollo/client"
import { GET_PROJECTS } from "../queries/projectQueries"
import ProjectCard from "../components/ProjectCard"

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS)

  if (loading) return <Spinner />
  if (error) return <div>Something Went Wrong</div>
  
  return (
    <>
    {data.projects.length > 0 ? (
      <div className="grid grid-cols-3 gap-10">
        {data.projects.map((project) => (
          <ProjectCard key={project.id} data={project}></ProjectCard>
        ))}
      </div>
    ) : (
      <div>No Projects availables</div>
    )}
    </>
  )
}
