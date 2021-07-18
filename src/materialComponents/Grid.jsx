import { Container,Grid, makeStyles, Paper } from '@material-ui/core'
import React from 'react'

function GridContainer() {
    let useStyles = makeStyles({
        size:{
            height:"20vh",
            backgroundColor:"lightgray"
        },
        color:{
            color:"lightgreen"
        }
    })

    let classes = useStyles();

    // grid contains total of 12 columns which we can divide acc. to our requirements
    return (
        <div>
            <Container>
                <Grid container spacing={5}>
                    <Grid item xs={5} sm={3} md={5} lg={10}>
                        <Paper className={[classes.size,classes.color]}>Hello</Paper>
                    </Grid>
                    <Grid item xs={5} sm={3} md={5} lg={2}>
                        <Paper className={classes.size}>Hello</Paper>
                    </Grid>
                    <Grid item xs={5} sm={6} md={2}>
                        <Paper className={classes.size}>Hello</Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default GridContainer
