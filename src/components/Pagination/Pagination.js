import { Pagination } from "fwt-internship-uikit";
import "./Pagination.css";

export const PaginationPage = ({currentPage, handlePageChange, theme}) => {
    return (
        <div className={theme === 'dark' ? 'pagination-dark' : 'pagination'}>
            <Pagination pagesAmount={3} currentPage={currentPage} isDarkTheme={theme === 'dark'}
                        onChange={handlePageChange}/>
        </div>
    )
}