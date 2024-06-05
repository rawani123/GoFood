import Order from "../models/order.model.js";

const foodData = async (req, res) => {
    try {
        return res.status(200).send([global.foodData , global.catData]);
    } catch (error) {
        console.log("Error in fetching food data: ", error.message);
        return res.status(500).json({ error: error.message, success: false });
    }
}

const orderData = async (req,res)=>{
    let data = req.body.order_data;
    await data.splice(0,0,{Order_date:req.body.order_date});

    let eId = await Order.findOne({'email':req.body.email});

    if(eId===null){
        try {
            await Order.create({
                email:req.body.email,
                order_data:[data]
            }).then(()=>{
                return res.status(200).json({ success: true, message: "Order Placed Successfully" });
            });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ error: error.message, success: false });
        }
    }else{
        try {
            await Order.findOneAndUpdate({email:req.body.email},{$push:{order_data:data}}).then(()=>{
                res.status(200).json({ success: true, message: "Order Placed Successfully"
            })});
        } catch (error) {
            res.send("Server Error",error.message)
        }
    }
}

const myOrderData = async (req,res)=>{
    try {
        let data = await Order.findOne({'email':req.body.email});
        return res.status(200).json({ success: true, data: data });
    }
    catch (error) {
        console.log("Error in fetching order data: ", error.message);
        return res.status(500).json({ error: error.message, success: false });
    }
}

export { foodData,orderData,myOrderData };    