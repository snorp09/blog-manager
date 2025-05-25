from typing import List
from fastapi import FastAPI
from starlette.exceptions import HTTPException

from models import PostIncoming, Post
from post_controller import get_post, add_post, get_all_posts

app = FastAPI()

@app.get("/")
async def root():
    return {"msg": "Gemma."}

@app.post("/posts/new")
async def new_post(post: PostIncoming):
    await add_post(post)

@app.get("/posts/{title}")
async def retrieve_post(title: str):
    post = await get_post(title)
    if post is None:
        raise HTTPException(status_code=404)
    return post.to_model()

@app.post("/posts", response_model=List[Post])
async def all_posts(page_numb: int = 0, item_count: int = 10):
    page_numb = page_numb*item_count
    posts_in_db = await get_all_posts(page_numb, item_count)
    posts = [post.to_model() for post in posts_in_db]
    return posts
