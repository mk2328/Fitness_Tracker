const User = require("../model/User");
const bcrypt = require("bcrypt");
const Users_Info=require("../model/Users_info");


//Sign Up
const register = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const email_exist = await User.findOne({email});
        if(email_exist)
        {
            return res.status(400).json({error:"This Email Is Already In Use"});
        }
        else
        {
            const hash_pass= await bcrypt.hash(password,10);
            const reg_user = await User.create({email,password:hash_pass});
            return res.status(200).json({
                msg:reg_user,
                token:await reg_user.generateToken(),
                userId:reg_user._id
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal Server Error"})

    }
}

//Sign In
const login=async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user)
            {
                return res.status(400).json({error:"Invalid Credentails!"});
            }
        const compare_pass = await bcrypt.compare(password,user.password);
        if(!compare_pass)
        {
            return res.status(400).json({error:"Invalid Credentails!"});
        }
        else{
            return res.status(200).json({msg:"Wellcome!",
            token:await user.generateToken(),
            userId:user._id
            });
        }
           

    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal Server Error"})

    }
}


//Users Information
const Information = async (req, res) => {
    try {
      const { first_name, last_name, phone, age, gender, weight, height, image } = req.body;
      const userId = req.userId;
  
      // Validate required fields
      if (!first_name || !last_name || !phone || !age || !gender || !weight || !height || !image) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      // Save user info
      const info = await Users_Info.create({
        first_name,
        last_name,
        phone,
        age,
        gender,
        weight,
        height,
        userId,
        image,
      });
  
      return res.status(200).json({ msg: 'Information saved successfully', name: info.first_name });
    } catch (error) {
      console.error('Error in Information endpoint:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  

const fetch_info=async(req,res)=>{
    try {
        const  Id  = req.userId;
        const userInfo = await Users_Info.findOne({ userId:Id});
        if (userInfo) {
            return res.status(200).json({ msg:userInfo,hasInfo: true });
        } else {
            return res.status(200).json({ hasInfo: false });
        }
    } catch (error) {
        console.error('Error fetching user information:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const update_info = async (req, res) => {
    try {
      const userId = req.userId;
      const { first_name, last_name, phone, age, gender, weight, height , image} = req.body;
  
      const updatedInfo = await Users_Info.findOneAndUpdate(
        { userId },
        { first_name, last_name, phone, age, gender, weight, height , image},
        { new: true } // Return the updated document
      );
  
      if (!updatedInfo) {
        return res.status(404).json({ error: "User information not found" });
      }
  
      return res.status(200).json({ msg: "Profile updated successfully", updatedInfo });
    } catch (error) {
      console.error("Error updating profile:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  const getUserBMI = async (req, res) => {
    try {
      const userId = req.userId; // assuming auth middleware sets this
      const user = await Users_Info.findOne({ userId: userId }); // adjust if needed
  
      if (!user || !user.height || !user.weight) {
        return res.status(400).json({ message: "Height or weight missing" });
      }
  
      const heightCm = user.height;
      const weightKg = user.weight;
      const heightM = heightCm / 100;
      const age = user.age
  
      // BMI Calculation
      const bmi = weightKg / (heightM * heightM);
      const idealWeight = 22 * (heightM * heightM);  // Ideal weight assuming BMI of 22
  
      // Categorizing BMI
      let bmiCategory = '';
      let goal = '';

      if (bmi < 18.5) {
        bmiCategory = 'Underweight';
        goal = 'Weight Gain';
      } else if (bmi >= 18.5 && bmi < 24.9) {
        bmiCategory = 'Normal weight';
        goal = 'Maintain Weight';
      } else if (bmi >= 25 && bmi < 29.9) {
        bmiCategory = 'Overweight';
        goal = 'Weight Loss';
      } else {
        bmiCategory = 'Obesity';
        goal = 'Weight Loss';
      }

      // Difference from ideal weight
      const difference = (weightKg - idealWeight).toFixed(2);
  
      // Send the response with BMI details and category
      res.json({
        bmi: bmi.toFixed(2),
        bmiCategory: bmiCategory,
        idealWeight: idealWeight.toFixed(2),
        currentWeight: weightKg,
        height: heightCm,
        difference: difference > 0 ? `+${difference}` : difference, // positive difference for weight loss, negative for gain
        goal: goal,
        age : age
      });
    } catch (err) {
      console.log("Error fetching BMI:", err.response?.data || err.message);
      res.status(500).json({ message: "Error fetching BMI: " + (err.response?.data?.message || err.message) });
    }
};

  
  

module.exports = {register,login,Information,fetch_info,update_info,getUserBMI}