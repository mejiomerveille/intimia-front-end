import React from 'react';
import { useRouter } from 'next/router';

import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader } from '@/app/components/blog';
import { getPosts,getPostDetails } from '@/app/services';
import { AdjacentPosts } from '@/app/sections';

const PostDetails = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }
  if(props.data){

  return (
    <>
      <div className="container mx-auto px-10 mb-8">
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
              <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
    
    
  );
}

};
export default PostDetails;
// export async function getStaticProps({params}){
//   const {slug } = params
//   const res = await fetch('http://127.0.0.1:8000/api2/posts/${slug}')
//   const post = await res.json
//   return{
//     props:{
//       titre:post.titre,
//       content:post.content
//     }
//   }
// }
// Fetch data at build time
export async function getStaticProps({ params }) {
  try {
    const data = await getPostDetails(params.slug);
    console.log(data)
    return {
      props: {
        post: data,
      },
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du billet de blog:', error);
    return {
      props: {
        post: null, // ou une valeur par défaut appropriée
      },
    };
  }
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const posts = await getPosts();
  if (Array.isArray(posts)) {
    return {
      paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
      fallback: true,
    };
  } else {
    console.error('Erreur: posts n\'est pas un tableau');
    return {
      paths: [],
      fallback: false,
    };
  }
}