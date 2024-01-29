import { FeaturedPosts } from "@/app/sections";
import { getPosts } from "@/app/services";
import Navbar from "@/components/Navbar";
import { PostCard, Categories, PostWidget } from "@/components/blog";

export default function Home({ posts }) {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="container mx-auto px-10 mb-8 mt-20">
        <FeaturedPosts />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 col-span-1">
            {posts && posts.post.map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))}
          </div>
          <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">
              <PostWidget />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// // Fetch data at build time
// export async function getStaticProps() {
//   const posts = (await getPosts()) || [];
//   return {
//     props: { posts },
//   };
// }


export async function getStaticProps({ params }) {
  try {
    const data = await getPosts();
    return {
      props: {
        post: data,
      },
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du billet de blog:', error);
    return {
      props: {
        post: null,
      },
    };
  }
}
