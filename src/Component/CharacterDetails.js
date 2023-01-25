import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function CharacterDetails() {
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
    }

    const getEpisode = async (episode) => {
        var list = []
        var i = 0
        while (i < episode.length) {
            const result1 = await axios.get(`https://rickandmortyapi.com/api/episode/${i + 1}`)
            list.push(result1.data.name)
            i++
        }
        setEpisodes(list)
    }




    return (
        <div className='flex justify-center xs:m-5'>

            {Details.name == undefined ? "" :
                <div className='bg-teal-600 xs:p-2 min-h-[400px] drop-shadow-xl mt-20 w-[600px] lg:p-4  rounded-[12px]'>
                    <div className='flex   justify-center text-white  '>
                        <div className=' relative bottom-[70px]'>
                            <div className='h-[150px]'>
                                <img src={Details.image} className="w-[150px] rounded-full   " />
                                <h1 className='text-center'><span className='font-semibold '> {Details.name}</span></h1>
                                <h1 className='text-center'><span className={`font-bold  ${Details.status == "Dead" ? "text-red-400" : "text-green-400"}`}> {Details.status}</span></h1>
                            </div>
                        </div>

                    </div>
                    <div className='flex justify-start text-white'>
                        <div>
                            <h2><span className='font-semibold'>Gender:</span> <span className='text-md'>{Details.gender}</span></h2>
                            <h2 ><span className='font-semibold '>Origin:</span> <span className='text-md'>{Details.origin.name}</span></h2>
                            <h2><span className='font-semibold w-[100px] '>Episodes:</span> {Episodes.map((item, index) => (<span key={index} className='p-1 text-sm'>{index + 1}. {item}{index < Episodes.length - 1 ? ',' : ""}</span>))}</h2>
                            <h2><span className='font-semibold'>Url:</span> <span className='text-md'>{Details.url}</span></h2>
                            <h2><span className='font-semibold'>Location:</span> <span className='text-md'>{Details.location.name}</span></h2>
                        </div>
                    </div>
                </div>
            }

        </div >
    )
}
