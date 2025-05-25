from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from db import db_AsyncSession, PostDB
from models import PostIncoming, Post

async def add_post(post: PostIncoming):
    post = PostDB(
        title=post.title,
        body=post.body
    )
    async with db_AsyncSession() as sess:
        sess.add(post)
        await sess.commit()

async def get_post(post_title: str) -> PostDB | None:
    async with db_AsyncSession() as sess:
        stmt = select(PostDB).where(PostDB.title == post_title)
        result = await sess.execute(stmt)
        post = result.scalar_one_or_none()
        if type(post) is not PostDB and type(post) is not None:
            raise RuntimeError("Post is incorrect type.")
        return post

async def get_all_posts(offset: int, item_count: int) -> list[PostDB]:
    async with db_AsyncSession() as sess:
        stmt = select(PostDB).order_by(PostDB.date).offset(offset).limit(item_count)
        result = await sess.execute(stmt)
        posts = result.scalars().all()
        post_list = [p for p in posts]
        return post_list