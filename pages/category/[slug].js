import React from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/ui/header1';
import '@/app/globals.css';
import { getCategories, getCategoryPost } from '@/app/services';
import { CategorieCard, Categories, Loader } from '@/components/blog';


const CategoryPost = ({ posts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
    <Header/>
    <div className="container mx-auto px-10 ">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8 mt-24">
          {posts.map((post, index) => (
            <CategorieCard key={index} post={post} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8 mt-24">
            <Categories />
          </div>
        </div>
      </div>
    </div>
    </>

  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.category.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}