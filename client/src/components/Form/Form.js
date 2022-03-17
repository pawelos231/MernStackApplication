import React, {useState, useEffect} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import {useSelector} from 'react-redux'

const Form = ({setCurrentId, currentId}) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
    })
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(currentId){
            dispatch(updatePost(currentId, postData)) 
        }else{
            dispatch(createPost(postData))
        }
        clear()
    }
    useEffect(()=>{
        if(post) setPostData(post)
    },[post])
    const clear = () =>{
        setCurrentId(null)
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: '',
        })
    }
    return (
    <Paper className={classes.paper}>
        <form autoComplete='off' noValidate className={classes.form} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
            <Typography variant='h6'>
                <TextField 
                name='creator' 
                variant='outlined' 
                label="Creator" 
                fullWidth
                value={postData.creator}
                onChange={(e)=>setPostData({...postData, creator: e.target.value})}> </TextField>
            </Typography>
            <Typography variant='h6'>
                <TextField 
                name='title' 
                variant='outlined' 
                label="Title" 
                fullWidth
                value={postData.title}
                onChange={(e)=>setPostData({...postData, title: e.target.value})}> </TextField>
            </Typography>
            <Typography variant='h6'>
                <TextField 
                name='message' 
                variant='outlined' 
                label="Message" 
                fullWidth
                value={postData.message}
                onChange={(e)=>setPostData({...postData, message: e.target.value})}> </TextField>
            </Typography>
            <Typography variant='h6'>
                <TextField 
                name='tags' 
                variant='outlined' 
                label="Tags" 
                fullWidth
                value={postData.tags}
                onChange={(e)=>setPostData({...postData, tags: e.target.value.split(',')})}> </TextField>
            </Typography>
            <div className={classes.fileInput}>
                <FileBase
                type="file"
                multiple={false}
                onDone={(base64)=> setPostData({ ...postData, selectedFile: base64})}
                />
            </div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

        </form>
    </Paper> );
}
 
export default Form;