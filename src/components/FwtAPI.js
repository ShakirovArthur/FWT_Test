export const fetchAuthors = async () => {
    try {
        const response = await fetch(`https://test-front.framework.team/authors`)
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}
export const fetchLocations = async () => {
    try {
        const response = await fetch(`https://test-front.framework.team/locations`)
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

export const fetchPaintings = async (currentPage, searchText, fromDate, beforeDate, locationId, authorId) => {
    try {
        const response = await fetch(
            `https://test-front.framework.team/paintings?_page=${currentPage}&_limit=${12}&q=${searchText}&created_gte=${fromDate}&created_lte=${beforeDate}&${locationId ? `&locationId=${locationId}` : ''}&${authorId ? `&authorId=${authorId}` : ''}`
        );
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}