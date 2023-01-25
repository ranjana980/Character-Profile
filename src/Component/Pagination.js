import React from 'react'

export default function Pagination(props) {
    return (
        <div>
            <ul className='flex lg:w-[100px] md:w-[10px] xs:w-[80px] md:w-[100px] '>
                <li>
                    <button disabled={props.activePage == 0} className={`${props.activePage == 0 ? 'bg-gray-400' : 'bg-blue-400'} p-1 rounded-[10px] text-white m-1 text-xs cursor-pointer`} onClick={props.handlePrev}>Prev</button>
                </li>
                {props.totalPagesList.map((item, index) => (
                    (props.activePage != props.pages
                        && (index < props.activePage + 10)
                        && (index >= props.activePage - 1)) ?
                        <li className={`${props.activePage + 1 == item ? 'bg-blue-400' : 'bg-gray-400'} p-1 rounded-[50%] text-white m-1 text-xs cursor-pointer`} key={index} onClick={() => props.handlePageChange(item)}>{item}</li>
                        : ""
                )
                )}
                {(props.pages) - 9 > props.activePage + 1 ? <h1 className='font-bold text-gray-400'>...</h1> : ""}
                <li >
                    <button disabled={props.pages === props.activePage + 1 ? true : false} className={`${props.pages === props.activePage + 1 ? 'bg-gray-400' : 'bg-blue-400'} p-1 rounded-[10px] text-white m-1 text-xs cursor-pointer`} onClick={props.handleNext} >Next</button>
                </li>
            </ul>
        </div>
    )
}
