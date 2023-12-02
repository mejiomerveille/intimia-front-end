import React from 'react';
import Navbar from "@/app/components/Navbar";
import { Categories, PostCard, PostWidget } from "@/app/components/blog";
import { useEffect, useState } from 'react';

export default function BlogPage() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api2/posts'); 
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
      }
    }

    fetchPosts();
  }, []);


     if (!posts) {
    return <div>Loading...</div>; 
  }
  return (
    <div>
      <div className="mb-6">
    <Navbar/>
      </div>
  <div className="container mx-auto px-10 mb-8 ">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div  className="lg:col-span-8 col-span-1">
            {posts.map((post)=>   <PostCard post={post} key={post.title}/>)}
          </div>
          <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">
              <PostWidget/>
              <Categories/>
            </div>
          </div>
      </div>
  </div>
  </div>

  );
}

export async function getStaticProps() {
    const fetchedPosts = await fetchPosts();
    const posts = fetchedPosts || []; 
    
    return {
      props: {
        posts,
      },
    };
  }