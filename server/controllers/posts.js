import Post from "../models/Post.js"
import User from "../models/User.js"

/* CREATE */

export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body
        const user = await User.findById(userId)
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save()

        const post = await Post.find() //grab all the posts so the front end gets updated to the front
        res.status(201).json(post)
    } catch (error) {
        res.status(409).json({ message: error.message }) // 409 (conflict in creating)
    }
}

/* READ */

export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.findAll()
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message }) // 409 (can't find)
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params
        const post = await Post.find({ userId })
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message }) // 409 (can't find)
    }    
}


/* UPDATE */

export const likePost = async (req, res) => {
    try {
        const { id } = req.params
        const { userId } = req.body
        const post = await Post.findById(id)
        const isLiked = post.likes.get(userId)

        if(isLiked) {
            post.likes.delete(userId)
        } else {
            post.likes.set(userId, true)
        }

        const updatePost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true}
        ) // When new: true is set, the updated document is returned as the result of the findByIdAndUpdate method, which can then be used in the response. If new: true is not set, the method will return the original document before the update was made.

        res.status(200).json(updatedPosts)
    } catch (error) {
        res.status(404).json({ message: error.message }) // 409 (can't find)
    }    
}