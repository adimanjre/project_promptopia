import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";
import { reactProductionProfiling } from "@next.config";

export const GET = async(req, {params})=>{
    try {
        await connectToDb();
        const prompt = await Prompt.findById(params.id).populate('creator')
        if(!prompt){
            return new Response('no prompt found', {status:405})
        }else{
            return new Response(JSON.stringify(prompt),{status:200})
        }
    } catch (error) {
        return new Response('failed to fetch all prompts',{status:500})
    }
}

export const PATCH = async(req,{params})=>{
    const {prompt,tag} = await req.json();

    try {
        await connectToDb();
        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt){
            return new Response('prompt not found',{status:404})
        }else{
            existingPrompt.prompt = prompt
            existingPrompt.tag = tag
            await existingPrompt.save();
            return new Response(JSON.stringify(existingPrompt),{status:200})
        }
    } catch (error) {
        return new Response('failed to update',{status:500})
    }
}

export const DELETE = async (req,{params})=>{
    try {
        await connectToDb()
        await Prompt.findByIdAndRemove(params.id)
        return new Response(JSON.stringify({'message':'post deleted successfully'}),{status:200})
    } catch (error) {
        return new Response('unable to delete prompt',{status:500})
    }
}