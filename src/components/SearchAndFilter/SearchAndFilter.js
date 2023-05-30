import { InputBase, MenuItem, Select } from "@mui/material";
import { Input } from "fwt-internship-uikit";
import { fetchAuthors, fetchLocations } from "../FwtAPI";
import "./SearchAndFilter.css";
import { useCallback, useEffect, useState } from "react";


export const SearchAndFilter = ({
                                    updateText,
                                    updateFromDate,
                                    updateBeforeDate,
                                    filterAuthor,
                                    filterLocation,
                                    fromDate,
                                    beforeDate,
                                    theme
                                }) => {
    const [authors, setAuthors] = useState();
    const [locations, setLocations] = useState();
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        fetchAuthors().then((result) => {
            setAuthors(result)
        }).catch((error) => {
            console.log(error)
        })
        fetchLocations().then((result) => {
            setLocations(result)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const handleChange = useCallback((e) => {
        updateText(e.target.value)
    }, [updateText])

    const handleChangeFromDate = useCallback((e) => {
        updateFromDate(e.target.value)
    }, [updateFromDate]);

    const handleChangeBeforeDate = useCallback((e) => {
        updateBeforeDate(e.target.value)
    }, [updateBeforeDate])

    const handleChangeFilterAuthor = useCallback((e) => {
        filterAuthor(e.target.value)
    }, [filterAuthor])

    const handleChangeFilterLocation = useCallback((e) => {
        filterLocation(e.target.value);
    }, [filterLocation])
    const handleClose = () => {
        setIsOpen(false)
    }
    const handleOpen = () => {
        setIsOpen(true)
    }
    const handleInputMouseDown = (event) => {
        event.stopPropagation();
        handleOpen();
    };

    return (
        <div className='search-filter'>
            <Input isDarkTheme={theme === 'dark'} placeholder='Name' className='input-search' onChange={handleChange}/>
            <Select displayEmpty className={theme === 'dark' ? 'select-filter dark' : 'select-filter'}
                    onChange={handleChangeFilterAuthor} defaultValue={''}>
                <MenuItem value='' selected>Author</MenuItem>
                {authors?.map((author) => (
                    <MenuItem key={author?.id} value={author?.id}
                              title={author?.name}>{author?.name.length > 15 ? `${author?.name.slice(0, 15)}...` : author?.name}</MenuItem>
                ))}
            </Select>
            <Select displayEmpty className={theme === 'dark' ? 'select-filter dark' : 'select-filter'}
                    onChange={handleChangeFilterLocation} defaultValue={''} MenuProps={{
                PaperProps: {
                    style: {
                        maxHeight: 376,
                        overflowY: 'auto'
                    }
                },
            }}>
                <MenuItem value=''>Location</MenuItem>
                {locations?.map((site) => (
                    <MenuItem key={site?.id} value={site?.id}
                              title={site?.location}>{site?.location.length > 15 ? `${site?.location.slice(0, 15)}...` : site?.location}</MenuItem>
                ))}
            </Select>
            <Select className={theme === 'dark' ? 'select-filter dark' : 'select-filter'} open={isOpen}
                    onOpen={handleOpen} onClose={handleClose}
                    value={fromDate && beforeDate ? `${fromDate} - ${beforeDate}` : ''}
                    displayEmpty
            >
                <MenuItem value='' disabled>
                    Range Date
                </MenuItem>
                {fromDate && beforeDate && (
                    <MenuItem value={`${fromDate} - ${beforeDate}`} onClick={handleClose}>
                        {`${fromDate} - ${beforeDate}`}
                    </MenuItem>
                )}
                <div className='range-input'>
                    <InputBase placeholder='from' className='range-input-from' onChange={handleChangeFromDate}
                               onClick={handleInputMouseDown}/> <p>-</p>
                    <InputBase placeholder='before' className='range-input-before' onChange={handleChangeBeforeDate}
                               onClick={handleInputMouseDown}/>
                </div>

            </Select>
        </div>
    )
}