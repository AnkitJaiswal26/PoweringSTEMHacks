import React, { useContext, useState } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { EHRContext } from "../Context/EHRContext";
export default () => {
    const [myDocuments, setMyDocuments] = useState();
    const {fetchMyDocuments, createNewRecord } = useContext(EHRContext);
    const fetchDocuments = async() => {
        const docs = await fetchMyDocuments();
        console.log(docs[0].docName);
        setMyDocuments(docs);
        console.log(docs);
    }
    const userAdd= '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    const docName= 'doctor who';
    const recordHash = 'hash this';
    const recordName = 'name of record';
    const issueDate = 122334;
    const testSuggested = 'string this test';
    const createRecord = () => {
        createNewRecord(userAdd, docName, recordHash, recordName, issueDate, testSuggested);
    }
    
    return (
        <React.Fragment>
            <Button variant="outlined" endIcon={<DownloadForOfflineIcon />} onClick={() => { createRecord()}}>
                Create record
            </Button>
            <Button variant="outlined" endIcon={<DownloadForOfflineIcon />} onClick={() => { fetchDocuments()}}>
                Fetch My Documents
            </Button>
        </React.Fragment>
    )
}