import { Link } from "react-router-dom";

export default function ProjectCard({data}) {

    const shortDescription = (description) => {
        if (description.length > 20) {
            return description.slice(0, 20) + "..."
        }

        return description
    }

    return (
        <div className="border rounded-lg p-6 flex flex-col justify-between">
            <div>
                <h2 className="text-lg font-medium">{(data.name).charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                <div>{shortDescription(data.description)}</div>
                <div className="mt-4">Status : <span className={data.status === "Completed" ? "text-green-400" : data.status === "Not Started" ? "text-red-500" : "text-yellow-500"}>{data.status} </span></div>
            </div>
            
            <Link to={`/projects/${data.id}`} className="bg-pink-500/60 text-white px-4 py-2 rounded-xl hover:bg-pink-500/75 flex items-center w-fit mt-4 self-end">View</Link>
        </div>
    )
}
