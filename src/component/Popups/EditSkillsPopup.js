import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Typography, TextField } from '@material-ui/core'
import { API_ENDPOINT } from '../../config';
import axios from 'axios';
import { TextareaAutosize } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
}));


export default function Popup(props) {

  const { openSkillEditPopup, setOpenSkillEditPopup, mySkill } = props
  const [skillName, setSkillName] = useState(mySkill.skillName);
  const [description, setDescription] = useState(mySkill.description);
  const accessToken = localStorage.getItem('token');

  

  const [errormsg, setMessage] = useState("");
  //Edit WorkExperience Function
  const authAxios = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
            Authorization: `Bearer ${accessToken}`

        },

  });
  const EditSkill = async (setMsg) => {
    try {
      const update = {
        id: mySkill.id,
      };
      if (description) {
        update.description = description
      } else {
        update.description = mySkill.description
      }
      if (skillName) {
        update.skillName = skillName
      } else {
        update.skillName =  mySkill.skillName
      }
    
      await authAxios.put(`/Skill/${mySkill.id}`, update);

      setOpenSkillEditPopup(false);
      window.location.reload();

    }
    catch (err) {
      console.log(err);
      setMessage(err);

    }

  };

  useEffect(() => {
  }, [setOpenSkillEditPopup])



  const classes = useStyles();
  const test = e => {
    e.preventDefault();
  }


  return (

    <Dialog open={openSkillEditPopup}
      fullWidth
    >
      <DialogTitle>
        <div>
          <Typography variant="h6" component="div">
            Edit
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent>
        <p style={{ color: 'red' }} id="Msg" className={classes.center} >{errormsg}</p>
        <form onSubmit={test} className={classes.form}>

          <Typography
            variant="h6"
            style={{ margin: '20px', marginLeft: '0px' }}
          >
            Edit your Skill

            </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Skill"
            label="Skill"
            defaultValue={mySkill.skillName}
            onChange={(e) => setSkillName(e.target.value)}
            id="Skill"
          />
          <TextareaAutosize
            style={{ minWidth: "500px", minHeight: "100px", marginTop: "30px", marginBottom: "30px" }}
            onChange={(e) => setDescription(e.target.value)}
            defaultValue={mySkill.description}
            aria-label="minimum height"
            placeholder="Enter your Description" />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => EditSkill()}

            className={classes.submit}
          >
            Save changes
          </Button>

        </form>
      </DialogContent>


      <DialogActions>
        <Button onClick={() => setOpenSkillEditPopup(false)} color="primary">
          Close
          </Button>

      </DialogActions>
    </Dialog >
  )
}