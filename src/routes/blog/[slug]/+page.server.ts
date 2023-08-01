import * as posts from '$lib/services/posts'

export const load = async ({ setHeaders, params }) => {
  setHeaders({
    CacheControl: `max-age=0, s-maxage=60 `
  });
  return { post: await posts.getPost(params.slug) };
};
