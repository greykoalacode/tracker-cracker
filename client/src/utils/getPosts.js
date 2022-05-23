import axios from "axios";

export async function getPostsResult() {
    const result = await axios.get("http://localhost:3001/api/posts", {withCredentials: true, headers: {
        "Content-Type": "application/json"
    }});
    console.log(result)
    return result
}