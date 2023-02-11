const router = require('express').Router();
const Post = require('../Models/Post');

//create a post
router.post('/', async(req,res) => {
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json({
            success : "1",
            data : savedPost
        });
    } catch(err) {
        res.status(500).json({
            success : "0",
            message : "Something went wrong"
        });
    }
});

//update a post
router.patch('/:id', async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set : req.body});
            res.status(200).json({
                success : "1", 
                message : "Post has been updated successfuly"
            });
        } else{
            res.status(403).json({
                success : "0",
                message : "You can only update your own posts"
            });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({
            success : "0",
            message : "Something went wrong"
        });
    }
});

//delete a post
router.delete('/:id', async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json({
                success : "1",
                message : "Post has been deleted successfuly"
            });
        } else{
            res.status(403).json({
                success : "0",
                message : "You can only delete your own posts"
            });
        }
    } catch(err) {
        res.status(500).json({
            success : "0",
            message : "Something went wrong"
        });
    }
});

//like / unlike a post
router.patch('/:id/like', async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)) {
            //like
            await post.updateOne({$push : {likes : req.body.userId}});
            res.status(200).json({
                success : "1",
                message : "The post has been liked"
            });
        } else{
            //unlike
            await post.updateOne({$pull : {likes : req.body.userId}});
            res.status(200).json({
                success : "1", 
                message : "The post has been unliked"
            });
        }
    } catch(err){
        console.log(err);
        res.status(500).json({
            success : "0",
            message : "Something went wrong"
        });
    }
});

//get a post
router.get('/:id', async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json({
            success : "1",
            data : post
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            success : "0",
            message : "Something went wrong"
        });
    }
})

module.exports = router;