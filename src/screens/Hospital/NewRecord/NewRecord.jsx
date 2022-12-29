import React, { useContext, useState } from "react";
import { EHRContext } from "../../../Context/EHRContext";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Sidebar from '../../../components/HospitalSidebar/HSidebar';
import styles from './NewRecord.module.css';
import { LinearProgress, Snackbar } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
const theme = createTheme();
export default () => {
    // userAdd,
    // docName,
    // recordHash,
    // recordName,
    // issueDate,
    // testSuggested
    const [newRecord, setNewRecord] = useState({
        userAdd: '',
        docName: '',
        recordHash: '',
        recordName: '',
        issueDate: '',
        testSuggested: '',
    });
    const [IssueDate, setIssueDate] = useState(null);
    const { createNewRecord } = useContext(EHRContext);
    const [uploading, setUploading] = useState("false");
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        setOpen(false);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const RecordObj = {
            recordName: data.get('recordName'),
            docName: data.get('docName'),
            userAdd: data.get('userAdd'),
            recordHash: data.get('recordHash'),
            issueDate: IssueDate,
            testSuggested: data.get('testSuggested'),
        }
        setNewRecord(RecordObj);
        console.log(RecordObj);

        let res = await createNewRecord(newRecord.userAdd,newRecord.docName, newRecord.recordHash, newRecord.recordName, newRecord.issueDate, newRecord.testSuggested);
        setOpen(true);

        // handleUser(userObj);
    };
    let button;
    if (uploading == "false") {
        button = <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
            Create Record
        </Button>
    } else {
        button = <CircularProgress />
    }

    return (
        <div className={styles.dashboard_wrapper}>
            <Snackbar
                open={open}
                autoHideDuration={600}
                onClose={handleClose}
                message="Note archived"
            />
            <Sidebar value="Profile" />
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Create Record
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autocomplete="Record Name"
                                        name="recordName"
                                        required
                                        fullWidth
                                        id="recordName"
                                        label="Record Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="docName"
                                        label="Doctor Name"
                                        name="docName"
                                        autoComplete="tDoctor's Name"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autocomplete="User Address"
                                        name="userAdd"
                                        required
                                        fullWidth
                                        id="userAdd"
                                        label="User Address"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autocomplete="Record Hash"
                                        name="recordHash"
                                        required
                                        fullWidth
                                        id="recordHash"
                                        label="Record Hash"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            required
                                            label="Issue Date"
                                            id="issueDate"
                                            name="issueDate"
                                            value={IssueDate}
                                            onChange={(newValue) => {
                                                setIssueDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="testSuggested"
                                        label="Test Suggested"
                                        name="testSuggested"
                                        autoComplete="test Suggested"
                                    />
                                </Grid>
                            </Grid>
                            {button}

                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
};