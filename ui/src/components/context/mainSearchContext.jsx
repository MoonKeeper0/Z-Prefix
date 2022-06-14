import React, { useContext, useState } from 'react';

const searchContext = React.createContext();
const searchUpdateContext = React.createContext();

export const useSearch = () => {
    return useContext(searchContext);
};

export const useUpdateSearch = () => {
    return useContext(searchUpdateContext);
};

export const SearchProvider = ({ children }) => {
    const [search, setSearch] = useState({student: "", faculty: "", dept: "", room: "", date: "06-06-2022"});

    function updateSearch(newSearch) {
        let tmpSearch = {...search}
        tmpSearch[Object.keys(newSearch)] = newSearch[Object.keys(newSearch)]
        setSearch(tmpSearch);
    };

    return (
        <searchContext.Provider value={search}>
            <searchUpdateContext.Provider value={updateSearch}>
                {children}
            </searchUpdateContext.Provider>
        </searchContext.Provider>
    );
};