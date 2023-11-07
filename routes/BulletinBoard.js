const auth = require('../middleware/auth');
const router = require('express').Router();
const {BulletinBoard,validateBulletinBoard} = require('../models/BulletinBoard');

//get message
router.get('/',auth,async(req,res)=>{
    const BulletinBoards = await BulletinBoard.find();
    res.send(BulletinBoards);
 })

//post message
router.post('/',auth,async(req,res)=>{
    const {error} = validateBulletinBoard(req.body);
        if(error) return res.status(400).json(error.details[0].message);
    const bulletinBoard = new BulletinBoard(req.body);
    bulletinBoard.save();
    
    res.send(bulletinBoard);
})

//get a single post
router.get('/:id',auth,async(rq,res)=>{
    const bulletinBoard = await BulletinBoard.findById(req.params.id);
    if(bulletinBoard) return res.send(bulletinBoard);
    res.sendStatus(404);
})


// delete message
router.delete('/:id', auth, async (req, res) => {
    try {
      console.log(req.params);
      const result = await BulletinBoard.deleteOne({ _id: req.params.id });
      console.log('Delete result:', result);
  
      if (result.deletedCount === 1) {
        res.send({ message: 'Bulletin board deleted successfully' });
      } else {
        res.status(404).send({ error: 'Bulletin board not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'An error occurred while deleting the bulletin board' });
    }
  });
  
  


module.exports = router