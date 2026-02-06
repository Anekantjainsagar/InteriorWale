const Blog = require("../../models/Blog");

// GET all blogs
const getAllBlogs = async () => {
  const blogs = await Blog.find();
  return blogs;
};

// ADD a new blog
const addBlog = async (blogData) => {
  const savedBlog = await Blog.create(blogData);
  if (!savedBlog) {
    throw new Error("Blog creation failed");
  }
  return savedBlog;
};

// UPDATE a blog
const updateBlog = async (blogId, updateData) => {
  const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedBlog) {
    throw new Error("Blog not found or update failed");
  }

  return updatedBlog;
};

// DELETE a blog
const deleteBlog = async (blogId) => {
  const deletedBlog = await Blog.findByIdAndDelete(blogId);

  if (!deletedBlog) {
    throw new Error("Blog not found or delete failed");
  }

  return deletedBlog;
};

module.exports = {
  getAllBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
};
