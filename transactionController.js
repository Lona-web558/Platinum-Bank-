const User = require("./User");
const Transaction = require("./Transaction");

// Deposit
exports.deposit = async (req, res) => {
    try {
        const { userId, amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                message: "Invalid amount"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.balance += Number(amount);

        await user.save();

        await Transaction.create({
            userId,
            type: "Deposit",
            amount
        });

        res.json({
            success: true,
            balance: user.balance
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

// Withdraw
exports.withdraw = async (req, res) => {

    try {

        const { userId, amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                message: "Invalid amount"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.balance < amount) {

            return res.status(400).json({
                message: "Insufficient funds"
            });

        }

        user.balance -= Number(amount);

        await user.save();

        await Transaction.create({
            userId,
            type: "Withdraw",
            amount
        });

        res.json({
            success: true,
            balance: user.balance
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};



exports.transfer = async (req,res)=>{

    try{

        const {

            senderId,

            recipientAccount,

            amount

        } = req.body;

        if(amount <= 0){

            return res.status(400).json({

                message:"Invalid amount"

            });

        }

        const sender = await User.findById(senderId);

        if(!sender){

            return res.status(404).json({

                message:"Sender not found"

            });

        }

        const recipient = await User.findOne({

            accountNumber:recipientAccount

        });

        if(!recipient){

            return res.status(404).json({

                message:"Recipient not found"

            });

        }

        if(sender.accountNumber === recipient.accountNumber){

            return res.status(400).json({

                message:"Cannot transfer to yourself"

            });

        }

        if(sender.balance < amount){

            return res.status(400).json({

                message:"Insufficient funds"

            });

        }

        sender.balance -= Number(amount);

        recipient.balance += Number(amount);

        await sender.save();

        await recipient.save();

        await Transaction.create({

            userId:sender._id,

            type:"Transfer",

            amount,

            recipient:recipient.accountNumber,

            description:"Transfer Sent"

        });

        await Transaction.create({

            userId:recipient._id,

            type:"Deposit",

            amount,

            recipient:sender.accountNumber,

            description:"Transfer Received"

        });

        res.json({

            success:true,

            balance:sender.balance

        });

    }catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};

// Transaction History
exports.history = async (req, res) => {

    try {

        const transactions = await Transaction.find({
            userId: req.params.id
        }).sort({
            createdAt: -1
        });

        res.json(transactions);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};
