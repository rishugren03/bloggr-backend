import Post from '../models/Post';
import sanitizeHtml from 'sanitize-html';
import slugify from 'slugify';

export const createNewPost = async (title: string, content: string, authorId: string) => {
  const slug = slugify(title, { lower: true, strict: true });
  const sanitizedContent = sanitizeHtml(content);

  const post = new Post({
    title,
    content: sanitizedContent,
    slug,
    author: authorId,
  });

  await post.save();
  return post;
};

export const getAllPosts = (authorId?: string) => {
  const query = authorId ? { author: authorId } : {};
  return Post.find(query).populate('author', 'email');
};

export const getPost = (id: string) => {
  return Post.findById(id).populate('author', 'email');
}; 