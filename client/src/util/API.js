import { createApi } from "unsplash-js";
import axios from "axios";

export default {
    unsplash: createApi({ accessKey: "BYKd8TanY-MFPXBF3GlzYikT_A8Yk4WoZTVFaguRV3w" }),

    getPosts: function () {
        return axios.get("/api/posts")
    },
    updatePost: function (id, data) {
        return axios.put("/api/posts/" + id, data);
    },
    savePosts: function (setFormObject) {
        return axios.post("/api/posts", setFormObject);
    },
    deletePost: function (id) {
        return axios.delete("/api/posts/" + id);
    },
    favPush: function (postId, userId) {
        return axios.put("/api/posts/favorites/" + postId, { userId })
    },
    createUser: function (email) {
        return axios.post('/api/users', { email })
    },
    getUser: function (email) {
        return axios.get('/api/users', { email })
    }

}