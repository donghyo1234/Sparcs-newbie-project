const express = require('express');
const PostModel = require('../models/post');

const router = express.Router();

class PostDB {
    static _inst_;
    static getInst = () => {
        if ( !PostDB._inst_ ) PostDB._inst_ = new PostDB();
        return PostDB._inst_;
    }

    // #id = 1; #itemCount = 1; #LDataDB = [{ id: 0, title: "test1", content: "Example body" }];

    constructor() { console.log("[Post-DB] DB Init Completed"); }

    selectItems = async ( count, search ) => {
        try {
            if (count === 0) return { success: true, data: [] };
            // We'll Remove the Item Count Limit for Search... (Really, this is unnecessary)
            /*
            const DBItemCount = await PostModel.countDocuments();
            if (count > DBItemCount) return { success: false, data: "Too many items queried"  };
            if (count < 0) return { success: false, data: "Invalid count provided" };
            */
            const findArguments = search === "" ? {} : {$or: [ { title: { "$regex": search } }, { content: { "$regex": search } } ]};
            const res = await PostModel.find(findArguments).sort({'createdAt': -1}).limit(count).exec();
            return { success: true, data: res };
        } catch (e) {
            console.log(`[Post-DB] Select Error: ${ e }`);
            return { success: false, data: `DB Error - ${ e }` };
        }
    }

    insertItem = async ( item ) => {
        const { title, content,author } = item;
        if (title==="" || content===""){
            return;
        }
        try {
            const newItem = new PostModel({ title, content,author });
            const res = await newItem.save();
            return true;
        } catch (e) {
            console.log(`[Post-DB] Insert Error: ${ e }`);
            return false;
        }
    }

    deleteItem = async ( id ) => {
        try {
            const ODeleteFiler = { _id: id };
            const res = await PostModel.deleteOne(ODeleteFiler);
            return true;
        } catch (e) {
            console.log(`[Post-DB] Delete Error: ${ e }`);
            return false;
        }
    }
}

const postDBInst = PostDB.getInst();

router.get('/getPost', async (req, res) => {
    try {
        const requestCount = parseInt(req.query.count);
        const searchString = req.query.search;
        const dbRes = await postDBInst.selectItems(requestCount, searchString);
        if (dbRes.success) return res.status(200).json(dbRes.data);
        else return res.status(500).json({ error: dbRes.data })
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/addPost', async (req, res) => {
   try {
       const { title, content,author } = req.body;
       const addResult = await postDBInst.insertItem({ title, content, author });
       if (!addResult) return res.status(500).json({ error: dbRes.data })
       else return res.status(200).json({ isOK: true });
   } catch (e) {
       return res.status(500).json({ error: e });
   }
});

router.post('/deletePost', async (req, res) => {
    try {
        const { id } = req.body;
        const deleteResult = await postDBInst.deleteItem(id);
        if (!deleteResult) return res.status(500).json({ error: "No item deleted" })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
})

module.exports = router;