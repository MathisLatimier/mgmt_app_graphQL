import React from 'react'
import { FaTrash, FaEye } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries';
import toast from 'react-hot-toast';
import { GET_PROJECTS } from '../queries/projectQueries';
import { NavLink } from 'react-router-dom';


export default function ClientRow({client}) {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: {id: client.id},
        refetchQueries: [{query: GET_CLIENTS}, {query: GET_PROJECTS}],
        // update(cache, {data: {deleteClient}}) {
        //     const {clients} = cache.readQuery({query: GET_CLIENTS});
        //     cache.writeQuery({
        //         query: GET_CLIENTS,
        //         data: {clients: clients.filter(client => client.id !== deleteClient.id)},
        //     });
        // },
        onCompleted: () => {
            // Fermer la modal après l'ajout du client
            toast.success('Client Successfully Deleted', {
                duration: 3000
            })
        },

    });

    return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td className="px-6 py-4">{client.name}</td>
        <td className="px-6 py-4">{client.email}</td>
        <td className="px-6 py-4">{client.phone}</td>
        <td className="px-6 py-4">{client.id}</td>
        <td className='px-6 py-4 flex gap-2'>
            <NavLink to={`./${client.id}`} title='See the client' className="rounded-full p-2 bg-blue-400 hover:bg-blue-500"><FaEye className='text-white'/></NavLink>
            <button onClick={deleteClient} title='Delete the client' className="rounded-full p-2 bg-red-400 hover:bg-red-500"><FaTrash className='text-white'/></button>
        </td>
    </tr>
)
}
