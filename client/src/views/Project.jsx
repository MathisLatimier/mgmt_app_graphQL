import { Routes, Route, useParams } from 'react-router-dom';
import { GET_PROJECT } from '../queries/projectQueries';
import { useQuery } from '@apollo/client';
import Spinner from '../components/Spinner';

export default function Project() {
    let {id} = useParams('id');

    const {loading, error, data} = useQuery(GET_PROJECT, {
        variables: {id: id}
    })

    if (loading) return <Spinner />
    if (error) return <p>Something Went Wrong</p>

    
    return (
        <>
        {data && (
            <div className='w-1/2 right-0 translate-x-1/2 border rounded-2xl p-16'>
                <h2 className='text-sm'>{data.project.client.name}</h2>
                <h1 className='font-medium text-3xl mb-6'>{(data.project.name).charAt(0).toUpperCase() + data.project.name.slice(1)}</h1>
                <p>{data.project.description}</p>
                <p className='mt-4'>Status : <span className={data.project.status === "Completed" ? "text-green-400" : data.project.status === "Not Started" ? "text-red-500" : "text-yellow-500"}>{data.project.status}</span></p>
            </div>
        )}
        </>
    )
}
