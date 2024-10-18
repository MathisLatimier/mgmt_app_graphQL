import { Routes, Route, useParams, NavLink } from 'react-router-dom';
import { GET_PROJECT } from '../queries/projectQueries';
import { useQuery } from '@apollo/client';
import Spinner from './Spinner';

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
                <NavLink to={`/clients/${data.project.client.id}`} title={`See ${data.project.client.name}'s Profil`} className='hover:underline text-[#E10098]'>{data.project.client.name}</NavLink>
                <h1 className='font-medium text-3xl mb-6'>{(data.project.name).charAt(0).toUpperCase() + data.project.name.slice(1)}</h1>
                <p>{data.project.description}</p>
                <p className='mt-4 mb-4'>Status : <span className={data.project.status === "Completed" ? "text-green-400" : data.project.status === "Not Started" ? "text-red-500" : "text-yellow-500"}>{data.project.status}</span></p>
                <NavLink to={'edit'} className='bg-blue-400 text-white rounded-lg px-4 py-2 hover:bg-blue-500 duration-150 active:scale-95'>Edit</NavLink>
            </div>
        )}
        </>
    )
}
