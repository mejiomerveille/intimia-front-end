import React, { useState, useEffect } from 'react';

export const getPosts = async () => {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    const fetchPostInfo = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api2/posts/', {
          headers: {
            'Accept': 'application/json'
          }
        })
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error('Erreur lors de la requête');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostInfo();
  }, []);

}


export const getCategories = async () => {
  const [categorie, setCategorie] = useState(null);
  useEffect(() => {
    const fetchCategorie = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api2/categories/', {
          headers: {
            'Accept': 'application/json'
          }
        })
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error('Erreur lors de la requête');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategorie();
  }, []);
}

import axios from 'axios';

export const getPostDetails = async (slug) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api2/posts/<slug>/`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSimilarPosts = async (categories, slug) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api2/posts/similar/<slug>/', {
      params: {
        categories: categories,
        exclude: slug,
        limit: 3,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAdjacentPosts = async (createdAt, slug) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api2/posts/adjacent/<createdAt>/<slug>/', {
      params: {
        createdAt: createdAt,
        exclude: slug,
        limit: 2,
      },
    });
    return {
      next: response.data[0],
      previous: response.data[1],
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCategoryPost = async (slug) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api2/category/<slug>/', {
      params: {
        category: slug,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getFeaturedPosts = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api2/posts/featured/', {
      params: {
        featured: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const submitComment = async (commentData) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api2/comments/submit/', commentData);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getComments = async (slug) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api2/comments/<slug>/`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getRecentPosts = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api2/posts/recent/', {
      params: {
        limit: 3,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};