import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Pagination from './Pagination'

export default function Characterlist() {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [userlist, setUserList] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [activePage, setActivePage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [totalPagesList, setTotalPagesList] = useState([])
    const [UserName, setUserName] = useState("")
    const [Location, setLocation] = useState("")
    const [Episodes, setEpisodes] = useState("")

    useEffect(() => {
        getdata()
    }, [])

    // function for getting data from api when page will be change
    const getPageChangeData = async (page) => {
        setLoader(true)
        try {
            const result = await axios.get(`https://rickandmortyapi.com/api/character?page=${page + 1}`)
            setUserList(result.data.results)
            setLoader(false)
        }
        catch (err) {
            console.log(err, 'err')
            setLoader(false)

        }
    }

    // get default all Character List
    const getdata = async () => {
        setLoader(true)
        try {
            const result = await axios.get('https://rickandmortyapi.com/api/character')
            setUserList(result.data.results)
            setTotalCount(result.data.info.count)
            setTotalPages(result.data.info.pages)
            var list = []
            var index = 0
            while (index < result.data.info.pages) {
                list.push(index + 1)
                index++
            }
            setTotalPagesList(list)
            setLoader(false)
        }
        catch (err) {
            setLoader(false)
            console.log(err)
        }

    }

    // function for next page button click
    const handleNext = () => {
        if (activePage !== totalPages) {
            if (!UserName && !Location && !Episodes) {
                getPageChangeData(activePage + 1)
            }
            else {
                handleSearchCharacter(activePage + 1)
            }
            setActivePage(activePage + 1)
        }
    }

    // function for Previoues page button click
    const handlePrev = () => {
        if (!UserName && !Location && !Episodes) {
            getPageChangeData(activePage - 1)
        }
        else {
            handleSearchCharacter(activePage - 1)
        }
        setActivePage(activePage - 1)
    }

    // function for getting page by click buttons of number
    const handlePageChange = (page) => {
        if (!UserName && !Location && !Episodes) {
            console.log(UserName)
            getPageChangeData(page - 1)
        }
        else {
            handleSearchCharacter(page - 1)
        }
        setActivePage(page - 1)
    }

    const getDetails = (id) => {
        navigate(`/CharacterDetails/${id}`)
    }

    // function for filter data by character name ,location and episodes
    const handleSearchCharacter = async (page) => {
        if (UserName || Location || Episodes) {
            var urlList = []
            setUserList(urlList)
            if (UserName) {
                try {
                    const result = await axios.get(`https://rickandmortyapi.com/api/character/?name=${UserName}`)
                    result.data.results.map((item) => {
                        if (!urlList.includes(item.url)) {
                            urlList.push(item.url)
                        }
                    })
                }
                catch (err) {
                    console.log(err, 'err')

                }
            }

            if (Location) {
                try {
                    const result1 = await axios.get(`https://rickandmortyapi.com/api/location/?name=${Location}`)
                    result1.data.results.map((item1) => {
                        item1.residents.map((item) => {
                            if (!urlList.includes(item)) {
                                urlList.push(item)
                            }
                        })
                    })
                }
                catch (err) {
                    console.log(err)
                }
            }

            if (Episodes) {
                try {
                    const result2 = await axios.get(`https://rickandmortyapi.com/api/episode/?name=${Episodes}`)
                    result2.data.results.map((item1) => {
                        item1.characters.map((item) => {
                            if (!urlList.includes(item)) {
                                urlList.push(item)
                            }
                        })
                    })
                }
                catch (err) {
                    console.log(err)
                }

            }

            var count = urlList.length
            var pages = ((urlList.length) / 20)
            var list2 = []
            setLoader(true)
            for (var i = 0; i < (urlList.length); i++) {
                try {
                    const urlres = await axios.get(urlList[i])
                    if (i < (page + 1) * 20 && i > (page) * 20) {
                        list2.push(urlres.data)
                    }
                }
                catch (err) {
                    console.log(err)
                }
            }
            setUserList(list2)
            setTotalCount(count)
            setTotalPages(pages)
            var list = []
            var index = 0
            while (index < pages) {
                list.push(index + 1)
                index++
            }
            setTotalPagesList(list)
            setLoader(false)

        }
        else {
            getdata()

        }

    }

    return (
        <div className='lg:p-5 xs:p-2'>
            <div className='flex justify-end'>
                <div className='lg:mr-2'>
                    <input className='border-teal-300 border-[1px] lg:p-2 xs:p-1 xs:m-1 mr-2  xs:w-[260px] lg:w-[315px] lg:placeholder:text-sm md:placeholder:text-sm xs:placeholder:text-xs rounded-[5px]' placeholder='Search by Location Name...' onChange={(e) => setLocation(e.target.value)} />
                    <input className='border-teal-300 border-[1px] lg:p-2 xs:p-1 xs:m-1 mr-2 xs:w-[260px] lg:w-[315px] lg:placeholder:text-sm  md:placeholder:text-sm xs:placeholder:text-xs rounded-[5px]' placeholder='Search by Episodes Name...' onChange={(e) => setEpisodes(e.target.value)} />
                    <input className='border-teal-300 border-[1px] lg:p-2 xs:p-1  xs:m-1 mr-2 xs:w-[260px] lg:w-[315px] lg:placeholder:text-sm  md:placeholder:text-sm xs:placeholder:text-xs rounded-[5px]' placeholder='Search by Character Name...' onChange={(e) => setUserName(e.target.value)} />
                </div>
                <button className='bg-teal-400 xs:w-[200px]  lg:w-[90px] xs:h-[32px] lg:h-[37px] rounded-[10px] text-white  text-sm cursor-pointer' onClick={() => handleSearchCharacter(activePage)}>Search</button>
            </div>
            {loader ?
                <h1 className='text-xl text-white font-bold text-center mt-10'>Loading...</h1> :
                userlist.length > 1 ?
                    <>
                        <div className='grid grid-cols-12 mb-5'>
                            {userlist.map((item) => (
                                <div key={item.id} className='drop-shadow-lg xl:col-span-2 lg:col-span-3 md:col-span-4 sm:col-span-4 xs:col-span-6 bg-teal-600 lg:m-2 xs:m-1 rounded-[15px] cursor-pointer hover:scale-105 hover:bg-green-600 ' onClick={() => getDetails(item.id)}>
                                    <div className="xl:p-3 lg:p-3 md:pl-4 sm:p-4 xs:p-3 text-white font-['Open_Sans']">
                                        <img src={item.image} className='xl:h-[240px] lg:h-[240px] md:h-[290px] xs:h-[220px] sm:h-[240px] rounded-[15px]' />
                                        <h1><span className='font-semibold xs:text-sm'>Name:</span> <span className='lg:text-sm xs:text-sm'>{item.name}</span></h1>
                                        <h2 ><span className='font-semibold xs:text-sm'>Type:</span> <span className='text-sm'>{item.type ? item.type : 'Unknown Type'}</span></h2>
                                        <h2><span className='font-semibold  xs:text-sm'>Total Episodes:</span> <span className='lg:text-sm xs:text-sm'>{item.episode.length}</span></h2>
                                        <h2><span className='font-semibold xs:text-sm'>Location</span> <span className='lg:text-sm xs:text-sm'>{item.location.name}</span></h2>
                                    </div>
                                </div>
                            ))}

                        </div>
                        <Pagination
                            count={totalCount}
                            totalPagesList={totalPagesList}
                            handlePageChange={handlePageChange}
                            pages={totalPages}
                            activePage={activePage}
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                        />
                    </>
                    : <h1 className='text-xl text-white font-bold text-center mt-10'>Sorry No Data Found..</h1>}

        </div>
    )
}
