import React from 'react'
import styled from 'styled-components'

const Section = styled.section`
    display: flex;
    align-items: center;
    margin: 1rem 0 13rem 0;
    .selected-page {
        width: 2rem;
        height: 2rem;
        border-bottom: 2px solid #e54b4b;
        cursor: pointer;
        color: #e54b4b;
        font-weight: 600;
        &:hover {
            color: #000000;
            border-bottom: 2px solid #000000;
        }
    }
    a {
        color: #1c252b;
    }
`

const PaginationArrow = styled.div`
    display: flex;
    align-items: center;
    color: #767F8B;
    font-size: 17px;
    font-weight: bold;
    width: 1rem;
    height: 3rem;
    cursor: pointer;
    &:hover {
        color: #000000;
    }
`

const Points = styled.span`
    height: 18px;
    margin: 0 0.75rem 0 0;
    align-self: center;
`

const Page = styled.span`
    cursor: pointer;
    color: #767F8B;
    &:hover {
        color: #000000;
    }
`

const Pages = styled.section`
    display: flex;
    align-items: center;
    & > * {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 0.5rem;
    }
`

const Pagination = (props) => {

    const isFirstPage = (currentPage) => {
        return currentPage === 0;
    }

    const isLastPage = (pageCount, currentPage) => {
        return currentPage === pageCount - 1;
    }

    const isPageDisplayed = (page) => {
        const {pageCount, currentPage, pagesDisplayedAroundSelected} = props;
        return !(((currentPage + pagesDisplayedAroundSelected + 1) < pageCount) && (page > (currentPage + pagesDisplayedAroundSelected + 1)) && (page < pageCount))
            && !(((currentPage - pagesDisplayedAroundSelected - 1) > 1) && (page < (currentPage - pagesDisplayedAroundSelected - 1)) && (page > 1));
    }

    const {pageCount, currentPage, itemsOnPage, pagesDisplayedAroundSelected, fetchData, queryObject, style} = props;
    let pages = [];
    for (let i = 1; i < pageCount + 1; i++) {

        if (((currentPage + pagesDisplayedAroundSelected + 1) < pageCount) && (i === (currentPage + pagesDisplayedAroundSelected + 1))) {
            pages.push(<Points key={i}>...</Points>);
        } else if (((currentPage - pagesDisplayedAroundSelected - 1) > 1) && (i === (currentPage - pagesDisplayedAroundSelected - 1))) {
            pages.push(<Points key={i}>...</Points>);
        } else if (isPageDisplayed(i)) {
            pages.push(<Page key={i} className={((i === currentPage + 1) ? 'selected-page' : '')}
                             onClick={() => fetchData({pageSize: itemsOnPage, page: i - 1, ...queryObject})}
            >
                {i}
            </Page>)
        }
    }

    if (pageCount == 0 || pageCount == 1) {
        return null
    }

    return (
        <Section style={style}>
            <PaginationArrow style={isFirstPage(currentPage) ? {display: 'none'} : {}}
                             onClick={() => fetchData({
                                 pageSize: itemsOnPage,
                                 page: currentPage - 1, ...queryObject
                             })}
            >
                <span>&#60;</span>
            </PaginationArrow>
            <Pages className='d-flex align-items-center'>
                {pages}
            </Pages>
            <PaginationArrow style={isLastPage(pageCount, currentPage) ? {display: 'none'} : {}}
                             onClick={() => fetchData({
                                 pageSize: itemsOnPage,
                                 page: currentPage + 1, ...queryObject
                             })}
            >
                <span>&#62;</span>
            </PaginationArrow>
        </Section>
    )
}

export default Pagination