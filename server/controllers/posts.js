import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"

export const getPosts = async (req, res)=>{
    try{
        const postMessages = await PostMessage.find()

        console.log(postMessages)
        res.status(200).json(postMessages)
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
}
export const createPost = async(req, res) =>  {
    const post = req.body

    const newPostMessage = new PostMessage( post)
    try{
        await newPostMessage.save();
        res.status(201).json(newPostMessage)
    }catch(error){
        res.status(409).json({message: error.message})
    }
}

export const updatePost = async (req, res) =>{
    const {id} = req.params
    const { title, message, creator, selectedFile, tags } = req.body;
    

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(updatedPost)
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deletePost = async (req, res) =>{
    const {id} = req.params

    await PostMessage.findByIdAndRemove(id)

    res.json({message: "post Deleted sucesfully"})
}

export const likePost = async (req, res) =>{
    const{id} = req.params

    const post = await PostMessage.findById(id)
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true})
    res.json(updatedPost)
}