import { FeaturedPosts } from "@/app/sections";
import { getPosts } from "@/app/services";
import { useState, useEffect } from 'react';
import { PostCard, Categories, PostWidget } from "@/components/blog";

export default function Home({ posts }) {
  return (
   
// Fetch data at build time
export async function getStaticProps() {
  const posts = await getPosts() || [];
  console.log(posts)
  return {
    props: { posts },
  };
}