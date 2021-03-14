const router = require("express").Router();
const {produceSimilarItems} = require("./../searchingAlgo/FuzzyMatcher");
const haystacks = require("./../data/test");

router.get('/', (req, res)=>{
    
    try{
        let {search : pattern} = req.query;

        if(!haystacks || !pattern) {
            res.status(500).send("no data stored!");
            return;
        }
        console.time('resqueted');

        const similarItems = produceSimilarItems(haystacks, pattern).slice(0, 10);

        console.timeEnd('resqueted');
        res.json({
            similarItems
        })
    }
    catch(err){
        console.error(err);
        res.status(500).send(err);
    }
    



})


module.exports = router;