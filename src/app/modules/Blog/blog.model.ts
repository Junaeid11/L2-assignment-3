import mongoose, { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>({
    title: {
        type: String,
        required: [true, 'Title is required!']

    },
    content: {
        type: String,
        required: [true, 'Content is required!']

    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    isPublished: {
        type: Boolean,
        default: true
    },


}, {
    timestamps: true
})


blogSchema.set('toJSON', {
    transform:(doc,value)=>{
        delete value.__v
        return value
    }
})


export const BlogModel = model<TBlog>('Blog', blogSchema)