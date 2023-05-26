const express = require('express');
const AccountModel = require('../models/account');


const router = express.Router();

class AuthDB {
    static _inst_;
    static getInst = () => {
        if ( !AuthDB._inst_ ) AuthDB._inst_ = new AuthDB();
        return AuthDB._inst_;
    }

    constructor() { console.log("[Auth-DB] DB Init Completed"); }

    register = async (username,password) => {
        try {
            const ee = await AccountModel.find({"username" : username}).count();
            console.log(ee);
            if (ee > 0 ){
                return { success: false, data: '이미 있는 아이디입니다!' };
            } else {
                const newItem = new AccountModel({ username ,password});
                const res = await newItem.save();
                return { success: true, data: `${username}로 회원가입 했습니다!` };
            }
        } catch (e) {
            return { success: false, data: `DB Error - ${ e }` };
        }
    }

    getBalance = async (username,password) => {
        try {
            const res = await AccountModel.findOne({ username,password });
            return { success: true, data: `${res.username}로 로그인 했습니다!`};
        } catch (e) {
            return { success: false, data: `DB Error - ${ e }` };
        }
    }


}

const authDBInst = AuthDB.getInst();

router.post('/register', async (req, res) =>{
    try {
        const { success, data } = await authDBInst.register(req.body.username,req.body.password);
        console.log(data);
        if (success) return res.status(200).json({ msg: data });
        else return res.status(500).json({ error: data });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/getInfo', async (req, res) => {
    try {
        const { success, data } = await authDBInst.getBalance(req.body.username, req.body.password);
        console.log(data);
        if (success) return res.status(200).json({ msg: data });
        else return res.status(500).json({ error: data });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});



module.exports = router;