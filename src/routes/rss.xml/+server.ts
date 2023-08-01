import RSS from 'rss'
import * as posts from '$lib/services/posts'

export async function GET({ url }) {
  const allPosts = await posts.getPublishedPosts();
  const siteUrl = url.origin;

  const feed = new RSS({
    title: `Title`,
    description: 'Description',
    site_url: `${siteUrl}`,
    feed_url: `${siteUrl}/rss.xml`
  });

  allPosts.forEach((post: { title: any; description: any; slug: any; createdAt: any; }) =>
    feed.item({
      title: post.title,
      description: post.description,
      url: `${siteUrl}/${post.slug}`,
      date: post.createdAt
    })
  );

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': `max-age=0, s-maxage=${60 * 60}`
    }
  });
}
