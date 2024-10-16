import { ClipLoader } from 'react-spinners'

export default function Spinner() {
    return (
        <div className='flex justify-center items-center'>
            <ClipLoader size={60} color={'#E10098'}/>
        </div>
    )
}
