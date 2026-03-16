// redux/features/blog/blogSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  error: null,

  blog: null,        // create ke baad
  blogs: [],         // list ke liye
  currentBlog: null, // edit ke liye (GET BY ID)
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    /* =========================
       CREATE BLOG
    ========================== */
    createBlogStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    createBlogSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.blog = action.payload;
    },
    createBlogFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* =========================
       GET BLOG LIST
    ========================== */
    getBlogsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getBlogsSuccess: (state, action) => {
      state.loading = false;
      state.blogs = action.payload;
    },
    getBlogsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* =========================
       GET BLOG BY ID (EDIT)
    ========================== */
    getBlogByIdStart: (state) => {
      state.loading = true;
      state.error = null;
      state.currentBlog = null;
    },
    getBlogByIdSuccess: (state, action) => {
      state.loading = false;
      state.currentBlog = action.payload;
    },
    getBlogByIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* =========================
       UPDATE BLOG
    ========================== */
    updateBlogStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    updateBlogSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.blog = action.payload;
    },
    updateBlogFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* =========================
       RESET
    ========================== */
    resetBlogState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
       state.currentBlog= null;
        state. blog=null; 

    },
  },
});

export const {
  createBlogStart,
  createBlogSuccess,
  createBlogFailure,

  getBlogsStart,
  getBlogsSuccess,
  getBlogsFailure,

  getBlogByIdStart,
  getBlogByIdSuccess,
  getBlogByIdFailure,

  updateBlogStart,
  updateBlogSuccess,
  updateBlogFailure,

  resetBlogState,
} = blogSlice.actions;

export default blogSlice.reducer;
