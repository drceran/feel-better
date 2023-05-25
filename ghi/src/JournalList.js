import React, {useCallback, useEffect, useState} from "react";

function JournalList () {
    const [journals, setJournalsList] = useState();


    useEffect(() => {
        async function getData() {
            const url = `http://localhost:8000/journals/`;
            const response = await fetch(url);
            console.log(response);
        }
        getData();
    }, []);

    // const fetchData = useCallback(async () => {
    //     const url = "http://localhost:8000/journals/";
        
    // })
}

export default JournalList;
