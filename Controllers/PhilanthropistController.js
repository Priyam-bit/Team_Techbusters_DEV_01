const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const NGO = require('../Models/NGO_user');
const Philanthropist = require('../Models/Philanthropist_user');

const router = require('express').Router();

//Create Philanthropist user
router.post("/", async (req,res) => {
    const body = req.body;
    //encrypt the password before saving in db
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    const user = new Philanthropist(body);
    try {
        const savedUser = await user.save();
        res.status(200).json({
            success : "1",
            message : savedUser
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success : "0",
            message : "Something went wrong with the query"
        });
    }
})

//get all Philanthropists
router.get('/', async (req,res) => {
    Philanthropist.find((err,users) => {
        if(err) {
            return res.status(500).json({
                success : "0",
                message : "Something went wrong with the query"
            });
        };
        return res.status(200).json({
            success : "1",
            data : users
        })
    })
})

//get philanthropist by id
router.get('/:id', async (req,res) => {
    Philanthropist.findById(req.params.id, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success : "0",
                message : "Something went wrong with the query"
            });
        }
        return res.status(200).json({
            success : "1",
            data : user
        });
    })
})

// Delete a philanthropist
router.delete('/:id', async (req,res) => {
    const user = await Philanthropist.findById(req.params.id);
    if(user === null) {
        return res.status(404).json({
            success : "0",
            message : "User not found"
        });
    }
    try {
        await user.deleteOne();
        res.status(200).json({
            success : "1",
            message : "User deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            success : "0",
            message : "Something went wrong with the query"
        });
    }
})

//update a philanthropist
router.patch('/:id', async (req,res) => {
    const body = req.body;
    body.id = req.params.id;
    if(body.password) {
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
    }
    const user = await Philanthropist.findById(req.params.id);
    if(!user) {
        return res.status(404).json({
            success : "0",
            message : 'User not found'
        });
    }
    try {
        await Philanthropist.updateOne({$set : body});
        res.status(200).json({
            success : "1",
            message : 'User updated successfully'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success : "0",
            message : "Something went wrong with the query"
        });
    }
})

router.post('/login', async (req,res) => {
    const body = req.body;
    const user = await Philanthropist.findOne({email : body.email});
    if(user === null) {
        return res.status(404).json({
            success : "0",
            message : "Either email or password wrong"
        });
    }   
    const passwordMatch = compareSync(body.password, user.password);
    if (passwordMatch) {
        return res.status(200).json({
            success : 1,
            message : "Logged in successfully",
            userId : user._id
        });
    }
    else {
        return res.status(404).json({
            success : 0,
            message : "Either email or password wrong"
        })
    }
})

// return fund status of ngos that user has donated to
router.get("/:id/fundStatus", async (req,res) => {
    const user = await Philanthropist.findById(req.params.id);
    if(user === null) {
        return res.status(404).json({
            success : "0",
            message : "User not found"
        });
    }
    let fund_status = [];
    try {
        for (let i = 0; i < user.NGOs_donated_to.length; i++) {
            const ngo = await NGO.findById(user.NGOs_donated_to[i]);
            if(ngo) {
                fund_status.push({ngoId : ngo._id.toString(), reqd : ngo.fund_required, received : ngo.fund_received})
            }
        }
        res.status(200).json({
            success : "1",
            data : fund_status
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success : "0",
            message : "Something went wrong with the query"
        })
    }
})

module.exports = router;