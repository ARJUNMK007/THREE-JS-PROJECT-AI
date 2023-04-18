import express from 'express'
import { OpenAIApi,Configuration } from 'openai'
import * as dotenv from 'dotenv'

dotenv.config();
 const router=express.Router();

const config=new Configuration({
    apiKey:process.env.OPEN_AI_API_KEY,
})

const openai=new OpenAIApi(config);

router.route('/').post(async(req,res)=>{
    try {

     const {prompt}=req.body;
     console.log(prompt)

     const response=await openai.createImage({
        prompt,
        n:1,
        size:'1024x1024',
        response_format:'b64_json'

     });
     const image=response.data.data[0].b64_json;
     res.status(200).json({ photo:image })
     console.log(image)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"something went wrong"})
    }
})
 router.route('/').get((req,res)=>{
   res.status(200).json({message:"hii dalle 2.0"})
 })

 export default router