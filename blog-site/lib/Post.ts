interface PostOutGoing {
    title: String,
    body: String
}

function sendPost(post: PostOutGoing){
    console.error("Not Implemented.");
}

export type {PostOutGoing};
export {sendPost};