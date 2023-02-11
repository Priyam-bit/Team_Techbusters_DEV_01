const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const NGO = require('../Models/NGO_user');

const router = require('express').Router();

//Create NGO
router.post("/", async (req,res) => {
    const body = req.body;
    //encrypt the password before saving in db
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    const ngo = new NGO(body);
    try {
        const savedNGO = await ngo.save();
        res.status(200).json({
            success : "1",
            message : savedNGO
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success : "0",
            message : "Something went wrong with the query"
        });
    }
})

//get all Ngos
router.get('/', async (req,res) => {
    NGO.find((err,ngos) => {
        if(err) {
            return res.status(500).json({
                success : "0",
                message : "Something went wrong with the query"
            });
        };
        return res.status(200).json({
            success : "1",
            data : ngos
        })
    })
})

//get ngo by id
router.get('/:id', async (req,res) => {
    NGO.findById(req.params.id, (err, ngo) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success : "0",
                message : "Something went wrong with the query"
            });
        }
        return res.status(200).json({
            success : "1",
            data : ngo
        });
    })
})

// Delete an NGO
router.delete('/:id', async (req,res) => {
    const ngo = await NGO.findById(req.params.id);
    if(ngo === null) {
        return res.status(404).json({
            success : "0",
            message : "NGO not found"
        });
    }
    try {
        await ngo.deleteOne();
        res.status(200).json({
            success : "1",
            message : "NGO deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            success : "0",
            message : "Something went wrong with the query"
        });
    }
})

//update an NGO
router.patch('/:id', async (req,res) => {
    const body = req.body;
    body.id = req.params.id;
    if(body.password) {
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
    }
    const ngo = await NGO.findById(req.params.id);
    if(!ngo) {
        return res.status(404).json({
            success : "0",
            message : 'NGO not found'
        });
    }
    try {
        await NGO.updateOne({$set : body});
        res.status(200).json({
            success : "1",
            message : 'NGO updated successfully'
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
    const ngo = await NGO.findOne({email : body.email});
    if(ngo === null) {
        return res.status(404).json({
            success : "0",
            message : "Either email or password wrong"
        });
    }   
    const passwordMatch = compareSync(body.password, ngo.password);
    if (passwordMatch) {
        return res.status(200).json({
            success : 1,
            message : "Logged in successfully",
            userId : ngo._id
        });
    }
    else {
        return res.status(404).json({
            success : 0,
            message : "Either email or password wrong"
        })
    }
})

module.exports = router;