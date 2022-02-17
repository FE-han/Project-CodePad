import React, { useState } from 'react';

function usePagination(data:any, itemsPerPage:any){
    const [currPage, setCurrPage] = useState(1);
    const MaxPage = Math.ceil(data.length / itemsPerPage);
    console.log(data)

    function currentData(){
        const begin = (currPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return data.slice(begin,end)
    }

    function next(){
        setCurrPage(currPage => Math.min(currPage + 1, MaxPage));
    }

    function prev(){
        setCurrPage(currPage => Math.max(currPage - 1, 1));
    }

    function jump(page: number){
        const pageNumber = Math.max(1, page)
        setCurrPage(currPage => Math.min(pageNumber,MaxPage));
    }

    return { next, prev, jump, currentData, currPage, MaxPage}
}

export default usePagination;