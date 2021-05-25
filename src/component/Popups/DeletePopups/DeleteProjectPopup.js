import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { API_ENDPOINT } from '../../../config';
import axios from 'axios';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Typography } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
    form: {
      marginTop: theme.spacing(1),
    },
  }));
export default function Popup(props) {
    const {  openProjectDeletePopup, setOpenProjectDeletePopup,project } = props
    const accessToken = localStorage.getItem('token');

    const [errormsg, setMessage] = useState("");
    const classes = useStyles();
    const authAxios = axios.create({
        baseURL: API_ENDPOINT,
        headers: {
            Authorization: `Bearer ${accessToken}`

        },
        
        });
    const DeleteProject= async (setMsg) => {
        try {
         

        
          await authAxios.delete(`/Projects/${project.id}`, {
          
          });
    
          setOpenProjectDeletePopup(false);
          window.location.reload();

        }
        catch (err) {
          console.log(err);
          setMessage(err);
    
        }
    
      };
    return (

        <Dialog open={openProjectDeletePopup}>
            <DialogTitle>
                <div>
                    <Typography variant="h6" component="div">
                        Warning: Deleting A Project
                    </Typography>
                </div>
            </DialogTitle>
            <DialogContent>
            <p style={{ color: 'red' }} id="Msg" className={classes.center}>{errormsg}</p>
            <p>Entry To Delete: {project.title}</p>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenProjectDeletePopup(false)} color="primary">
                    Disagree
          </Button>
                <Button onClick={() => DeleteProject()} color="primary">
                    Agree
          </Button>
            </DialogActions>
        </Dialog>
    )
}