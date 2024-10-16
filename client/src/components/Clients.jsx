import { gql, useQuery } from "@apollo/client"
import ClientRow from "./ClientRow"
import { GET_CLIENTS } from "../queries/clientQueries"
import Spinner from "./Spinner"



export default function Clients() {
    const {loading, error, data} = useQuery(GET_CLIENTS)

    if (loading) return <Spinner/>
    if (error) return <p>Something Went Wrong</p>
  return (
    <>
    <button>Add Client</button>
    {!loading && !error && (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-xl overflow-hidden shadow">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Phone
                    </th>
                    <th scope="col" className="px-6 py-3">
                        ID
                    </th>
                    <th scope="col" className="px-6 py-3">
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
    )
    }
    </>
)
}
