import axios from 'axios';

export const BASE_URL = 'http://127.0.0.1:8000/api/v1/';

export const BASE_URL_MEDIA = 'http://127.0.0.1:8000/media';
export const BASE_URL_MEDIAS = 'http://127.0.0.1:8000';


const axiosInstance = axios.create({
  baseURL: BASE_URL,
});



axiosInstance.interceptors.request.use(function (config) {
  // Running on client. Attach token to header.
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});


export async function getPosts() {
  try {
    const response = await axiosInstance.get('blog/posts/');
    if (response.status === 200) {
      // console.log(response.data)
      return response.data;
    } else {
      console.error('Erreur lors de la requête');
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}


export const getCategories = async () => {
  try {
    const response = await axiosInstance.get('blog/category/all');
    if (response.status === 200) {
      // console.log(response.data)
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
    const response = await axiosInstance.get(`blog/posts/${slug}`);
    // console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
// /?categories=${categories}&slug=${slug}
export const getSimilarPosts = async (categories, slug) => {
  try {
    const response = await axiosInstance.get(`blog/posts/similar/?categories=cat_san`, {
      params: {
        categories: categories,
        slug: slug,
        limit: 3,
      },
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAdjacentPosts = async (createdAt, slug) => {
  const date = new Date(createdAt).getTime().toString()

  try {
    
    const response = await axiosInstance.get(`blog/posts/adjacent/${date}/`, {
      params: {
        createdAt: createdAt,
        exclude: slug,
        limit: 2,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCategoryPost = async (slug) => {
  try {
    const response = await axiosInstance.get(`blog/category/${slug}/`, {
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
    const response = await axiosInstance.get(`blog/posts/featured/`, {
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

export const submitComment = async (obj) => {
  console.log(obj)
  try {
    const response = await axiosInstance.post(`blog/comments/submit/`, obj);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getComments = async (slug) => {
  try {
    const response = await axiosInstance.get(`blog/comments/${slug}/`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getRecentPosts = async () => {
  try {
    const response = await axiosInstance.get(`blog/posts/recent/`, {
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

export const registerGrossesse = (data) => {
  return axiosInstance.post('grossesse/register/', data);
}

export const updateGrossesse = (data,pk) => {
  return axiosInstance.put(`grossesse/edit/${pk}`, data);
}

export const getGrossesse = (pk) => {
  return axiosInstance.get(`grossesse/get/${pk}`);
}


// utilisateur


export const logout = async () => {
  try {
    const response = await axiosInstance.post(`user/logout/`);

    localStorage.removeItem('refresh_token')
    localStorage.removeItem('access_token')
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const login = async (data) => {
  try {
    const response = await axiosInstance.post(`user/login/`, data);
     // sauvegarder le token dans le localStorage
     localStorage.setItem('refresh_token', response.data.refresh)
     localStorage.setItem('access_token', response.data.access)
     // renvoyer a l'acceuil
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail) {
      const erreur=error.response.data.detail;
      console.log(error.response.data.detail);
    } else {
      console.error(error);
    }
    return null;
  }
};

export const register = async (obj) => {
  try {
    const response = await axiosInstance.post(`user/register/`, obj);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};



export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get(`user/get/`);
    localStorage.setItem('id', response.data.id)
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};




export const registerrdv = async (obj) => {
  try {
    const response = await axiosInstance.post(`rdv/ajoute`, obj);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
// http://localhost:8000/api/v1/rdv/ajout/


export const getrdv = async () => {
  try {
    const response = await axiosInstance.get(`rdv/get/`);
    // localStorage.setItem('id', response.data.id)
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};