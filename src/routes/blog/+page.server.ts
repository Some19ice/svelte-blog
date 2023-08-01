import * as posts from '$lib/services/posts'

export const load = async ({ setHeaders }) => {
  setHeaders({
    CacheControl: `max-age=0, s-maxage=${60 * 60} `
  });
  return { posts: await posts.getPublishedPosts() };
};
