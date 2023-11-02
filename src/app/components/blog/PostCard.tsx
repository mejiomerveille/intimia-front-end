import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';


const PostCard = ({ post }) => {
  return(
    <div>
      {post.title}
      {post.except}
    </div>
  )
}
  export default PostCard;
