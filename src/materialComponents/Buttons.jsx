import React from 'react';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';

function Buttons() {
    return (
        <div>
            <h2>Buttons</h2>
            <Button variant='contained'> Hello </Button>
            <Button variant='outlined'> Hello </Button>
            <Button variant='text'> Hello </Button>

            <h2>Color & Event Listener</h2>
            <Button variant='contained'
                style={{
                    marginRight: '8px',
                    backgroundColor: 'lightGreen'
                }}
            > Hello </Button>
            <Button variant='text' color='primary' href="https://material-ui.com/"
            > Hello </Button>
            <Button variant='text' color='secondary' onClick={() => { alert("Hello"); }}
            > Hello </Button>

            <h2>Icons inside buttons</h2>
            <Button varient='contained' color='primary' style={{ marginRight: '8px' }} startIcon={<SendIcon></SendIcon>}>Send</Button>
            <Button varient='outlined' color='secondary' startIcon={<DeleteIcon></DeleteIcon>}>Delete</Button>

            <h2>Size</h2>
            <Button varient='outlined' color='primary' style={{ marginRight: '8px' }} startIcon={<SendIcon></SendIcon>} size='small'>Send</Button>
            <Button varient='contained' color='primary' style={{ marginRight: '8px' }} startIcon={<DeleteIcon></DeleteIcon>} size='large'>Delete</Button>
        
            <h2>Icons</h2>
            <IconButton>
                <SendIcon>

                </SendIcon>
            </IconButton>

            <IconButton>
                <DeleteIcon onClick={() => {
                    alert("Delete");
                }}>

                </DeleteIcon>
            </IconButton>

        </div>
    )
}

export default Buttons
