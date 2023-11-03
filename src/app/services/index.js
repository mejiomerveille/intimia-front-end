import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api2';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(function (config) {
  // Running on client. Attach token to header.
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

export const getPosts = async () => {
  try {
    const response = await axiosInstance.get('/posts/');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Erreur lors de la requête');
    }
  } catch (error) {
    console.error(error);
  }
}

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get('/categories/');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Erreur lors de la requête');
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}


export const getPostDetails = async (slug) => {
  try {
    const response = await axiosInstance.get(`/posts/${slug}/`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSimilarPosts = async (categories, slug) => {
  try {
    const response = await axiosInstance.get(`/posts/similar/${slug}/`, {
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
    const response = await axiosInstance.get(`/posts/adjacent/${createdAt}/${slug}/`, {
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
    const response = await axiosInstance.get(`/category/${slug}/`, {
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
    const response = await axiosInstance.get(`/posts/featured/`, {
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
    const response = await axiosInstance.post(`/comments/submit/`, commentData);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getComments = async (slug) => {
  try {
    const response = await axiosInstance.get(`/comments/${slug}/`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getRecentPosts = async () => {
  try {
    const response = await axiosInstance.get(`/posts/recent/`, {
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

