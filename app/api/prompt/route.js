import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async(req)=>{
    try {
        await connectToDb();
        const prompt = await Prompt.find({}).populate('creator')
        console.log('this is a prompt' + prompt)
        return new Response(JSON.stringify(prompt),{status:200})
    } catch (error) {
        return new Response('failed to fetch all prompts',{status:500})
    }
}