interface PostOutGoing {
    title: String,
    body: String
}

async function sendPost(post: PostOutGoing){
    const resp = await fetch("/api/posts/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    });
    if(resp.status != 200){
        console.error("Error sending post.");
        alert("Unable to send post.");
    }
}

export type {PostOutGoing};
export {sendPost};