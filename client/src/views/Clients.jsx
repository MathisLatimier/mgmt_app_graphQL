import { gql, useQuery } from "@apollo/client"
import ClientRow from "../components/ClientRow"
import { GET_CLIENTS } from "../queries/clientQueries"
import Spinner from "../components/Spinner"
import AddUser from "../components/modals/AddUser"
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast';
import { FaUser } from "react-icons/fa6";


export default function Clients() {
    const {loading, error, data} = useQuery(GET_CLIENTS)
    const [isModalOpen, setIsModalOpen] = useState(false)

    if (loading) return <Spinner/>
    if (error) return <p>Something Went Wrong</p>

    const onSuccessAdd = () => {
        toast.success('User Successfully Created', {
            duration: 3000
        })
        setIsModalOpen(false)
    }
    return (
    <>
    <Toaster />
    <button onClick={() => setIsModalOpen(true)} className="bg-pink-500/60 text-white px-4 py-2 rounded-xl mb-4 hover:bg-pink-500/75 flex items-center">
        <FaUser className="mr-2"/>
        <span>Add Client</span>
    </button>
    {isModalOpen && (
        <AddUser onClose={setIsModalOpen} onSuccess={onSuccessAdd}/>
    )}
    {!loading && !error && (
        <div style={{ maxHeight: '80vh', overflow: 'auto' }} className="rounded-xl shadow-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 " >
                <thead className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
                    <tr className="">
                        <th scope="col" className="px-6 py-3 sticky top-0 z-10">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 sticky top-0 z-10">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3 sticky top-0 z-10">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3 sticky top-0 z-10">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3 sticky top-0 z-10">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.clients.map(client => (
                        <ClientRow key={client.id} client={client}></ClientRow>
                    ))}
                </tbody>
            </table>
        </div>
        
    )
    }
    </>
)
}
