import * as React from 'react';
import {useState} from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  FormControlLabel,
  Grid,
  TextField
} from '@mui/material';
import {Plus} from 'react-feather'
import Switch from './../components/Switch'

export default function Add({data, setData}) {
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = useState();
  const [account, setAccount] = useState();
  const [text, setText] = useState();
  const [isDebit, hasDebit] = useState(false);
  const [date, setDate] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    let value = [...data]
    value.push({amount, account, isDebit, text, date})
    setData(value)
    handleClose()
  };
  
  return (
    <>
      <Fab variant="outlined" color='success' style={{position: 'absolute', right: 24, bottom: 16}}
           onClick={handleClickOpen}>
        <Plus/>
      </Fab>
      <Dialog open={open} onClose={handleClose} maxWidth='md'>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Amount"
                fullWidth
                value={amount || ""}
                onChange={e => setAmount(e.target.value)}
                variant="filled"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Account number"
                type="number"
                fullWidth
                value={account || ""}
                onChange={e => setAccount(e.target.value)}
                variant="filled"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="date"
                label="Birthday"
                type="date"
                margin="dense"
                defaultValue="2017-05-24"
                value={date}
                variant='filled'
                fullWidth
                onChange={e => setDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Message text"
                type="number"
                fullWidth
                rows={2}
                multiline
                value={text || ""}
                onChange={e => setText(e.target.value)}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                checked={isDebit}
                style={{marginLeft: 2, marginRight: 2}}
                onChange={e => hasDebit(e.target.checked)}
                control={<Switch/>}
                label='is debit ?'
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
