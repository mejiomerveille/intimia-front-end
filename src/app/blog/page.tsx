"use client";
import { FeaturedPosts } from "@/app/sections";
import { getPosts } from "@/app/services";
import { useState, useEffect } from 'react';
import { PostCard, Categories, PostWidget } from "@/components/blog";


export default function blog(){
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts()
      .then(response => {
        setPosts(response.posts);
        // console.log(response.posts);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des posts:', error);
      });
  }, []);

  return( 
  <div className="container mx-auto px-10 mb-8 mt-24">
  <FeaturedPosts />
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
    <div className="lg:col-span-8 col-span-1">
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
    <div className="lg:col-span-4 col-span-1">
      <div className="lg:sticky relative top-8">
        <PostWidget
        //  categories={post.categories} slug ={post.slug}
         />
        <Categories />
      </div>
    </div>
  </div>
</div>
);
}
