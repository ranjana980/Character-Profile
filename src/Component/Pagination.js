import React from 'react'

export default function Pagination(props) {
   const {activePage,pages,totalPagesList,handlePrev,handlePageChange,handleNext}=props
    return (
        <div>
            <ul className='flex lg:w-[100px] md:w-[10px] xs:w-[80px] md:w-[100px] '>
                <li>
                    <button disabled={activePage == 0} className={`${activePage == 0 ? 'bg-gray-400' : 'bg-blue-400'} p-1 rounded-[10px] text-white m-1 text-xs cursor-pointer`} onClick={handlePrev}>Prev</button>
                </li>
                {totalPagesList.map((item, index) => (
                    (activePage != pages
                        && (index < activePage + 10)
                        && (index >= activePage - 1)) ?
                        <li className={`${activePage + 1 == item ? 'bg-blue-400' : 'bg-gray-400'} p-1 rounded-[50%] text-white m-1 text-xs cursor-pointer`} key={index} onClick={() => handlePageChange(item)}>{item}</li>
                        : ""
                )
                )}
                {(pages) - 9 > activePage + 1 ? <h1 className='font-bold text-gray-400'>...</h1> : ""}
                <li >
                    <button disabled={pages === activePage + 1 ? true : false} className={`${pages === activePage + 1 ? 'bg-gray-400' : 'bg-blue-400'} p-1 rounded-[10px] text-white m-1 text-xs cursor-pointer`} onClick={handleNext} >Next</button>
                </li>
            </ul>
        </div>
    )
}
