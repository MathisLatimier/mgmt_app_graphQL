import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries';
import toast, { Toaster } from 'react-hot-toast';


export default function ClientRow({client}) {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: {id: client.id},
        // refetchQueries: [{query: GET_CLIENTS}]
        update(cache, {data: {deleteClient}}) {
            const {clients} = cache.readQuery({query: GET_CLIENTS});
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {clients: clients.filter(client => client.id !== deleteClient.id)},
            });
        },
        onCompleted: () => {
            // Fermer la modal après l'ajout du client
            toast.success('User Successfully Deleted', {
                duration: 3000
            })
        },

    });

    const onDeleteClient = () => {
    }

    return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td className="px-6 py-4">{client.name}</td>
        <td className="px-6 py-4">{client.email}</td>
        <td className="px-6 py-4">{client.phone}</td>
        <td className="px-6 py-4">{client.id}</td>
        <td className='px-6 py-4'>
            <button onClick={deleteClient} className="rounded-full p-2 bg-red-400 hover:bg-red-500"><FaTrash className='text-white'/></button>
        </td>
    </tr>
)
}
