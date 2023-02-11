const router = require('express').Router();
const Group = require('../Models/')

//create a group
router.post('/', async(req,res) => {
    const newGroup = new Group(req.body);
    try{
        const savedGroup = await newGroup.save();
        res.status(200).json({
            success : "1",
            data : savedGroup
        });
    } catch(err) {
        res.status(500).json({
            success : "0",
            message : "Something went wrong"
        });
    }
});

//update a group
router.patch('/:id', async (req,res) => {
    try{
        const group = await Group.findById(req.params.id);
        if(group.admin === req.body.userId){
            await group.updateOne({$set : req.body});
            res.status(200).json({
                success : "1", 
                message : "group has been updated successfuly"
            });
        } else{
            res.status(403).json({
                success : "0",
                message : "You are not the group admin"
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

//delete a group
router.delete('/:id', async (req,res) => {
    try{
        const group = await Group.findById(req.params.id);
        if(group.admin === req.body.userId){
            await group.deleteOne();
            res.status(200).json({
                success : "1",
                message : "Group has been deleted successfuly"
            });
        } else{
            res.status(403).json({
                success : "0",
                message : "You are not the group admin"
            });
        }
    } catch(err) {
        res.status(500).json({
            success : "0",
            message : "Something went wrong"
        });
    }
});

//get group posts
router.get('/:groupId', async (req,res) => {
    try {
        const groupPosts = await Post.find({groupId : req.params.groupId});
        res.status(200).json({
            success : "1",
            data : groupPosts
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            success : "0",
            message : "Something went wrong"
        });
    }
})

//get all groups
router.get('/', async (req,res) => {
    Group.find((err,groups) => {
        if(err) {
            return res.status(500).json({
                success : "0",
                message : "Something went wrong with the query"
            });
        };
        return res.status(200).json({
            success : "1",
            data : groups
        })
    })
})


module.exports = router;