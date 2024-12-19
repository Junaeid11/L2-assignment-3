

import queryBuilder from "../../builder/queryBuilder"
import { TBlog } from "./blog.interface"
import { BlogModel } from "./blog.model"

const createBlogIntoDb = async (payload: TBlog) => {
    const result = await BlogModel.create(payload);
    const data = await BlogModel.findById(result._id).populate('author')
    return data

}
const updateBlogFromDb = async (id: string, payload: TBlog) => {
    const result = await BlogModel.findByIdAndUpdate(id, payload, { new: true }).populate('author')
    return result
}
const deleteBlogFromDb = async (id: string) => {
    
    const result = await BlogModel.findByIdAndDelete(id)
    return result
}
const getAllBlogsFromDb = async (query: Record<string, unknown>) => {
    const blogsSearchableFields = ['title', 'content']
    const blogsQuery = new queryBuilder(BlogModel.find(), query).search(blogsSearchableFields).filter().sort();
    const result = await blogsQuery.modelQuery.populate('author')

    return result
}


export const blogService = {
    createBlogIntoDb,
    updateBlogFromDb,
    deleteBlogFromDb,
    getAllBlogsFromDb
}