import React from 'react';
import { useRouter } from 'next/router';
import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader } from '@/components/blog';
import { getPosts, getPostDetails } from '@/app/services';
import { AdjacentPosts } from '@/app/sections';
import '@/app/globals.css';
import Header from '@/components/ui/header';


const PostDetails = ({ post }) => {
  const router = useRouter();
  const currentUrl = router.asPath;

  if (router.isFallback) {
    return <Loader />;
  }
  if (post) {
    return (
      <>
      {/* <Header/> */}
        <div className="container mx-auto px-10 mb-8 mt-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="col-span-1 lg:col-span-8">
              <PostDetail post={post} />
              <Author author={post.author} />
              <AdjacentPosts slug={post.slug} createdAt={post.createdAt} />
              <CommentsForm slug={post.slug} />
              <Comments slug={post.slug} />
            </div>
            <div className="col-span-1 lg:col-span-4">
              <div className="relative lg:sticky top-8">
                <PostWidget slug={post.slug}  categories={post.categories ? post.categories.map((category) => category.slug) : []}
                      />
                <Categories />
              </div>
            </div>
          </div>
        </div>
        </>
    );
  }

  return null;
};

export default PostDetails;

export async function getStaticProps({ params }) {
  try {
    const data = await getPostDetails(params.slug);
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

export async function getStaticPaths() {
  try {
    const data = await getPosts(); // Récupérer les données des posts

    if (Array.isArray(data.posts)) {
      const paths = data.posts.map((post) => ({
        params: { slug: post.slug },
      }));
      return {
        paths: paths,
        fallback: true,
      };
    } else {
      console.error('Erreur: posts n\'est pas un tableau');
      return {
        paths: [],
        fallback: false,
      };
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des posts:', error);
    return {
      paths: [],
      fallback: false,
    };
  }
}