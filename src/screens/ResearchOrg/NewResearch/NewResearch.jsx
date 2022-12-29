import React, { useContext, useState } from "react";
import { EHRContext } from "../../../Context/EHRContext";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from '../../../components/HospitalSidebar/HSidebar';
import styles from './NewResearch.module.css'
import { Snackbar } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
const theme = createTheme();
export default () => {
    // name, 
    //description, 
    //cid
    const [NewResearch, setNewResearch] = useState({
    name:'' , 
    description:'' , 
    cid:'' ,
    });
    const { createNewResearch } = useContext(EHRContext);
    const [uploading, setUploading] = useState("false");
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        setOpen(false);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const RecordObj = {
            name: data.get('name'),
            description: data.get('description'),
            cid: data.get('cid'),
        }
        setNewResearch(RecordObj);
        console.log(RecordObj);

        let res = await createNewResearch(NewResearch.name,NewResearch.docName, NewResearch.description, NewResearch.cid);
        setOpen(true);
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
        <div className={styles.hospitals_wrapper}>
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
                            Add New Reseach
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autocomplete="Research Name"
                                        name="name"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Reseach Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="cid"
                                        label="cid"
                                        name="cid"
                                        autoComplete="cid"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        multiline
                                        rows={2}
                                        autocomplete="Description"
                                        name="description"
                                        required
                                        fullWidth
                                        id="description"
                                        label="description"
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