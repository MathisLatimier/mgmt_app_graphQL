import React, { useState } from 'react'
import { FaXmark } from 'react-icons/fa6'
import { ADD_CLIENT } from '../../mutations/clientMutations';
import { GET_CLIENTS } from '../../queries/clientQueries';
import { empty } from '@apollo/client';
import { useMutation } from '@apollo/client';

export default function AddUser({onClose, onSuccess}) {
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: ""
    })
    const handleClickInside = (e) => {
        e.stopPropagation(); // Empêche la propagation du clic au parent
    };
    const [error, setError] = useState()
    const [addClient] = useMutation(ADD_CLIENT, {
        variables: {name: data.name, email: data.email, phone: data.phone},
        update(cache, {data: {addClient}}) {
            const {clients} = cache.readQuery({query: GET_CLIENTS});
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient] },
            });
        },
        onCompleted: () => {
            // Fermer la modal après l'ajout du client
            onSuccess();
        },
        
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const onAdd = (e) => {
        e.preventDefault()
        setError("")
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        console.log(data)
        if (!data.name && empty(data.name)) {
            setError('Please enter a name')
            return;
        }
        if (!data.email && empty(data.email)) {
            setError('Please enter an email')
            return;
        }
        if (!emailRegex.test(data.email)) {
            setError('Please enter a valid email')
            return;
        }
        if (!data.phone && empty(data.phone)) {
            setError('Please enter a phone number')
            return;
        }        
        if (!phoneRegex.test(data.phone)) {
            setError('Please enter a valid phone number')
            return;
        }

        addClient()

    }
    return (
        <div onClick={() => onClose(false)} className='absolute top-0 right-0 left-0 bottom-0 bg-black/25 z-20' >
            <div onClick={handleClickInside} className='absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 bg-white p-14 rounded-xl shadow-xl'>
                <div className='flex justify-between items-start mb-4'>
                    <h1 className='text-2xl'>Add A Client</h1>
                    <button onClick={() => onClose(false)} className=''><FaXmark className='h-6' /></button>

                </div>
                {error && (
                    <p className='text-white bg-red-400/75 p-2 border-2 rounded-md border-red-400'>{error}</p>
                )}
                <form className='flex flex-col gap-4 w-72' onSubmit={onAdd}>
                    <label htmlFor="name" className='flex flex-col'>
                        Name
                        <input onChange={handleChange} type="text" name='name' placeholder='Name' className='p-2 border border-pink-300/50 rounded-md bg-pink-100/25 focus:bg-white'/>
                    </label>
                    <label htmlFor="email" className='flex flex-col'>
                        Email
                        <input onChange={handleChange} type="text" name='email' placeholder='Email' className='p-2 border border-pink-300/50 rounded-md bg-pink-100/25 focus:bg-white'/>
                    </label>
                    <label htmlFor="email" className='flex flex-col'>
                        Phone
                        <input onChange={handleChange} type="text" name='phone' placeholder='Phone' className='p-2 border border-pink-300/50 rounded-md bg-pink-100/25 focus:bg-white'/>
                    </label>
                    <button className='bg-pink-500/60 text-white px-4 py-2 rounded-xl mb-4 hover:bg-pink-500/75 font-medium'>Add</button>
                </form>
            </div>
        </div>
    )
}
