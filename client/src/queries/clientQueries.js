import { gql, useQuery } from "@apollo/client"


const GET_CLIENTS = gql`
    query getClients {
        clients{
            id
            name
            email
            phone
        }
    }
`;

const GET_CLIENT = gql `
    query getClient($id: ID!) {
        client(id: $id) {
            id
            name
            email
            phone
            projects {
                id
                name
                description
                status
                client {
                    id
                }
            }
        }
    }
`

export { GET_CLIENTS, GET_CLIENT }