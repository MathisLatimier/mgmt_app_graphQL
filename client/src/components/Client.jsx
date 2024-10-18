import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { GET_CLIENT } from "../queries/clientQueries"
import Spinner from "./Spinner"
import ProjectCard from "./ProjectCard"

export default function Client() {
    const {id} = useParams()

    const {loading, error, data} = useQuery(GET_CLIENT, {
        variables: {id: id}
    })

    if (loading) return <Spinner />
    if (error) return <div>A problem occurred</div>

  return (
    <div className="grid md:grid-cols-2 gap-10">
        <section className="border rounded-xl p-10">
            <h2 className="text-3xl mb-6">Detail</h2>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col bg-pink-100/50 px-4 py-2 rounded-lg">
                    <span className="font-medium text-lg">Name</span>
                    <span>{data.client.name}</span>
                </div>
                <div className="flex flex-col bg-pink-100/50 px-4 py-2 rounded-lg">
                    <span className="font-medium text-lg">Email</span>
                    <span>{data.client.email}</span>
                </div>
                <div className="flex flex-col bg-pink-100/50 px-4 py-2 rounded-lg">
                    <span className="font-medium text-lg">Phone</span>
                    <span>{data.client.phone}</span>
                </div>
            </div>
        </section>
        {data.client.projects.length > 0 && (
            <section className="border rounded-xl p-10">
                <h2 className="text-3xl mb-6">Projects</h2>
                <div className="grid lg:grid-cols-2 gap-4">
                    {data.client.projects.map((project) => (
                        <ProjectCard project={project} key={project.id}/>
                    ))}
                </div>
            </section>
        )}
        
    </div>
  )
}
