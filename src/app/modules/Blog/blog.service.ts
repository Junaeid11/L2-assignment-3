

import queryBuilder from "../../builder/queryBuilder"
import { APPerror } from "../../errors/AppError"
import { TBlog } from "./blog.interface"
import { BlogModel } from "./blog.model"

import httpStatus from "http-status"

const createBlogIntoDb = async (payload: TBlog) => {
    const result = await BlogModel.create(payload);
    const data = await BlogModel.findById(result._id).populate('author')
    return data

}
const updateBlogFromDb = async (id: string, payload: TBlog, userId: string) => {
    const blog = await BlogModel.findById(id).populate("author");
    if (!blog) {
        throw new APPerror(httpStatus.NOT_FOUND, "Blog not found");
    }
    if (blog.author._id.toString() !== userId) { 
        throw new APPerror(httpStatus.UNAUTHORIZED, "You are not authorized to update");
    }
    const result = await BlogModel.findByIdAndUpdate(id, payload, { new: true }).populate('author')
    return result
}
const deleteBlogFromDb = async (id: string,userId: string) => {
    const blog = await BlogModel.findById(id).populate("author");
    if (!blog) {
        throw new APPerror(httpStatus.NOT_FOUND, "Blog not found");
    }
    if (blog.author._id.toString() !== userId) { 
        throw new APPerror(httpStatus.FORBIDDEN, "You are not authorized to delete");
    }
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