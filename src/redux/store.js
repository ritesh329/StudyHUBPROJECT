import { configureStore } from "@reduxjs/toolkit";
import  userSlice  from "../redux/UserSlice";
import  adminSlice  from "../redux/admin/adminSlice";
import blogReducer from "../redux/blog/blogSlice";
export const store=configureStore({

    reducer:{
        user:userSlice,
         admin:  adminSlice,
 blog: blogReducer,
    }



}


)
