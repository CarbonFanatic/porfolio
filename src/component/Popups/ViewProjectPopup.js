import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Typography, Card, CardActionArea, CardContent, CardMedia, CardActions } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: theme.spacing(1),
    },
}));


export default function Popup(props) {

    const { openProjectPopup, setOpenProjectPopup, project } = props



    const classes = useStyles();
    const test = e => {
        e.preventDefault();
    }


    return (

        <Dialog open={openProjectPopup}
            fullWidth
        >
            <DialogTitle style={{ backgroundColor: 'black'}}>

            </DialogTitle>
            <DialogContent style={{ backgroundColor: 'black'}}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="myProject"
                            height="532"
                            image={project.imageUrl}
                            title={project.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {project.title} - {project.type}
                            </Typography>
                            <Typography variant="body2"  component="p">
                                {project.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        {project.link
                            ? <div className="portfolio-button"> <a className="rn-btn" href={project.link}>Go to project</a></div>
                            : <></>
                        }

                    </CardActions>
                </Card>



            </DialogContent>


            <DialogActions style={{ backgroundColor: 'black'}}>
                <Button onClick={() => setOpenProjectPopup(false)} color="primary" style={{opacity: 1}} >
                    Close
          </Button>

            </DialogActions>
        </Dialog >
    )
}