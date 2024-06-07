import { Customer } from "../models/customer.models.js";



// create new customer
const customer = async (req, res) => {
    try {
        let data = req.body
        // console.log(data ,"kjhksdu0")
        if(Object.keys(data).length == 0) return res.status(400).json({status:false,message:"please give me some data"})

        const {customerName,contactNo, address} = data
        const isCustomerExist = await Customer.findOne({contactNo})
        if(isCustomerExist){
            res.status(400).json({status:false,message:"Customer already exists"})
        }
        let customer = await Customer.create(data)

        res.status(200).json({ status:true, data: customer});
    } catch (error) {
        // console.error(error);
        res.status(500).json({status : false, message:"this is catch"})
    }
};

//find all customer
const getctm = async (req, res) => {
    try {
        const alldata = await Customer.find({});
        if(!alldata){
            res.status(404); throw new Error('Cusomer no in our database')
        }
        res.status(200).json({ status:true, data : alldata })
        
    } catch (error) {
        res.status(500).json({status:false,message:error })
    };
};
 

//find cusomer by cusomerID
const findCustomer = async (req,res) =>{ 
    try{
    const {id} = req.params
const seachCustomer = await Customer.findById(id);
if(!seachCustomer) {
    res.status(404); throw new Error('please add CustomerID')
};
res.status(200).json({staus:true, data: seachCustomer})
    }catch(error){
        res.status(500).json({status:false,message:error})
    }
}


const upadteCustomer = async (req,res) => {
   try {
    const {id} = req.params
    const seachCustomer = await Customer.findByIdAndUpdate(id,req.body);
    if(!seachCustomer) {
        res.status(404); throw new Error('please add CustomerID')
    }

    const updatecustome = await Customer.findById(id);
res.status(200).json({status:true,data:updatecustome})


   } catch (error) {
    res.status(500).json({status:false,message:error})
    
   }
    }



const deleteCusomer = async (req,res) => {
    try{
        const seachCustomer = await Customer.findByIdAndDelete(req.params.id)
        if(!seachCustomer) {
            res.status(404); throw new Error('please add customerID')
        }
        res.status(200).json({status:true,message:'delete success'})

    }catch (error){
        res.status(500).json({status:false,message:error})
    }
}
export default { customer, getctm, findCustomer, upadteCustomer,deleteCusomer }