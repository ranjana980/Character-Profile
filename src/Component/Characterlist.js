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
        const result = await axios.get(`https://rickandmortyapi.com/api/character?page=${page + 1}`)
        setUserList(result.data.results)
    }

    // get default all Character List
    const getdata = async () => {
        setLoader(true)
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

    // function for next page button click
    const handleNext = () => {
        if (activePage !== totalPages) {
            if (!UserName) {
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
        if (!UserName) {
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
        navigate(`/Character/${id}`)
    }

    // function for filter data by character name ,location and episodes
    const handleSearchCharacter = async () => {
        if (UserName || Location || Episodes) {
            var urlList = []
            if (UserName) {
                const result = await axios.get(`https://rickandmortyapi.com/api/character/?name=${UserName}`)
                result.data.results.map((item) => {
                    if (!urlList.includes(item.url)) {
                        console.log(item.url)
                        urlList.push(item.url)
                    }
                })
            }

            if (Location) {
                const result1 = await axios.get(`https://rickandmortyapi.com/api/location/?name=${Location}`)
                result1.data.results[0].residents.map((item) => {
                    if (!urlList.includes(item)) {
                        urlList.push(item)
                    }
                })
            }

            if (Episodes != "") {
                const result2 = await axios.get(`https://rickandmortyapi.com/api/episode/?name=${Episodes}`)
                result2.data.results[0].characters.map((item) => {
                    if (!urlList.includes(item)) {
                        urlList.push(item)
                    }
                })
            }

            var count = urlList.length
            var pages = ((urlList.length) / 20)
            var list2 = []
            for (var i = 0; i < (urlList.length); i++) {
                const urlres = await axios.get(urlList[i])
                list2.push(urlres.data)
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
        }
        else {
            getdata()

        }

    }

    return (
        <div className='p-5'>
            <div className='flex justify-end'>
                <div>
                    <input className='p-2 mr-2 w-[315px]' placeholder='Search by Location Name...' onChange={(e) => setLocation(e.target.value)} />
                    <input className='p-2 mr-2 w-[315px]' placeholder='Search by Episodes Name...' onChange={(e) => setEpisodes(e.target.value)} />
                    <input className='p-2 mr-2 w-[315px]' placeholder='Search by Character Name...' onChange={(e) => setUserName(e.target.value)} />
                </div>
                <button className='bg-teal-400  w-[90px] h-[37px] rounded-[10px] text-white  text-sm cursor-pointer' onClick={() => handleSearchCharacter(activePage)}>Search</button>
            </div>
            <div className='grid grid-cols-12 mb-5'>
                {userlist.map((item) => (
                    <div key={item.id} className='drop-shadow-lg xl:col-span-2 lg:col-span-3 md:col-span-4 sm:col-span-4 xs:col-span-6 bg-teal-600 m-2 rounded-[15px] cursor-pointer hover:scale-105 hover:bg-green-600 ' onClick={() => getDetails(item.id)}>
                        <div className="xl:p-3 lg:p-3 md:pl-4 sm:p-4 xs:p-3 text-white font-['Open_Sans']">
                            <img src={item.image} className='h-[200px] rounded-[15px]' />
                            <h1><span className='font-semibold xs:text-sm'>Name:</span> {item.name}</h1>
                            <h2 ><span className='font-semibold xs:text-sm'>Type:</span> <span className='text-sm'>{item.type ? item.type : 'Unknown Type'}</span></h2>
                            <h2><span className='font-semibold  xs:text-sm'>Total Episodes:</span> {item.episode.length}</h2>
                            <h2><span className='font-semibold xs:text-sm'>Location</span> <span className='lg:text-sm xs:text-sm'>{item.location.name}</span></h2>
                        </div>
                    </div>
                ))}
            </div>
            {loader ? "" :
                <Pagination
                    username={UserName}
                    location={Location}
                    episode={Episodes}
                    count={totalCount}
                    totalPagesList={totalPagesList}
                    handlePageChange={handlePageChange}
                    pages={totalPages}
                    activePage={activePage}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                />
            }
        </div>
    )
}
