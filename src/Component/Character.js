import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Character() {
    const { id } = useParams()
    const [Details, setDetails] = useState({})
    const [Episodes, setEpisodes] = useState([])

    useEffect(() => {
        getFullDetails()
    }, [])

    const getFullDetails = async () => {
        const result = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
        setDetails(result.data)
        getEpisode(result.data.episode)
        console.log(result.data)
    }

    const getEpisode = async (episode) => {
        var list = []
        var i = 0
        while (i < episode.length) {
            const result1 = await axios.get(`https://rickandmortyapi.com/api/episode/${i + 1}`)
            list.push(result1.data.name)
            console.log(result1)
            i++
        }
        setEpisodes(list)
    }




    return (
        <div className='flex justify-center'>
            <div className='bg-teal-600 drop-shadow-xl mt-20 w-[600px] p-4 flex justify-center rounded-[12px]'>
                {Details.name == undefined ? "" :
                    <div className=' text-white  relative bottom-[70px]'>
                        <div className='flex justify-center '>
                            <div className=''>
                                <img src={Details.image} className="w-[150px] rounded-full   " />
                                <h1 className='text-center'><span className='font-semibold '> {Details.name}</span></h1>
                                <h1 className='text-center'><span className={`font-bold  ${Details.status == "Dead" ? "text-red-400" : "text-green-400"}`}> {Details.status}</span></h1>
                            </div>
                        </div>
                        <h2><span className='font-semibold'>Gender:</span> <span className='text-md'>{Details.gender}</span></h2>
                        <h2 ><span className='font-semibold '>Origin:</span> <span className='text-md'>{Details.origin.name}</span></h2>
                        <h2><span className='font-semibold w-[100px] '>Episodes:</span> {Episodes.map((item, index) => (<span className='p-1 text-sm'>{index + 1}. {item}{index < Episodes.length - 1 ? ',' : ""}</span>))}</h2>
                        <h2><span className='font-semibold'>Url:</span> <span className='text-md'>{Details.url}</span></h2>
                        <h2><span className='font-semibold'>Location:</span> <span className='text-md'>{Details.location.name}</span></h2>
                    </div>}
            </div>
        </div >
    )
}
