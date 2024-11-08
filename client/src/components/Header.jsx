import { NavLink } from 'react-router-dom'
import GraphQLLogo from './../assets/GraphQL_Logo.png'

export default function Header() {
  return (
    <header>
        <nav className='w-full bg-purple-100/50 p-4'>
            <div className='container mx-auto flex gap-2 items-center lg:px-8'>
                <NavLink to={"/"} className="mr-10">
                    <div className="flex items-center gap-4">
                        <img src={GraphQLLogo} alt="" className='h-10' />
                        <h1 className='text-xl'>ProjectMgmt</h1>
                    </div>
                </NavLink>
                <NavLink to={'/clients'} className={({ isActive }) => 
                    `py-2 px-4 rounded-full duration-200 ${isActive ? 'bg-pink-500/50 text-white shadow' : 'bg-pink-100/50 hover:bg-pink-100'}`}>
                    Clients
                </NavLink>
                <NavLink to={'/projects'} className={({ isActive }) => 
                    `py-2 px-4 rounded-full duration-200 ${isActive ? 'bg-pink-500/50 text-white shadow' : 'bg-pink-100/50 hover:bg-pink-100'}`}>
                    Projects
                </NavLink>
            </div>
        </nav>
    </header>

)
}
