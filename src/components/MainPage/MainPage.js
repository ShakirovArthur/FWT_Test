import "./MainPage.css";
import React, { useCallback, useEffect, useState } from "react";
import { Painting } from "./Painting";
import { PaginationPage } from "../Pagination/Pagination";
import { SearchAndFilter } from "../SearchAndFilter/SearchAndFilter";
import { fetchPaintings } from "../FwtAPI";

export const MainPage = ({theme}) => {
    const [paintings, setPaintings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [beforeDate, setBeforeDate] = useState();
    const [authorId, setAuthorId] = useState()
    const [locationId, setLocationId] = useState()

    const handlePageChange = useCallback((newPage) => {
        if (newPage >= 1 && newPage <= 5) {
            setCurrentPage(newPage);
        }
    }, []);

    const updateFromDate = (date) => {
        setFromDate(date)
    }

    const updateBeforeDate = (beforeDate) => {
        setBeforeDate(beforeDate)
    }

    useEffect(() => {
        fetchPaintings(currentPage, searchText, fromDate, beforeDate, authorId, locationId).then((result) => {
            setPaintings(result);
        }).catch((error) => {
            console.log(error)
        });
    }, [currentPage, searchText, fromDate, beforeDate, authorId, locationId]);

    return (
        <div className='main-page'>
            <SearchAndFilter updateText={setSearchText} fromDate={fromDate} beforeDate={beforeDate}
                             updateFromDate={updateFromDate} updateBeforeDate={updateBeforeDate}
                             filterAuthor={setAuthorId} filterLocation={setLocationId} theme={theme}/>
            <div className='paintings'>
                {paintings?.map((painting, index) => (
                    <Painting imageUrl={painting?.imageUrl} name={painting?.name} key={painting?.id}
                              delay={index * 100} theme={theme}/>))}
            </div>
            <PaginationPage currentPage={currentPage} handlePageChange={handlePageChange} theme={theme}/>
        </div>)
}