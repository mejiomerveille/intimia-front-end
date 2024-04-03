import axios from 'axios';

export const BASE_URL = 'http://127.0.0.1:8000/api/v1/';

export const BASE_URL_MEDIA = 'http://127.0.0.1:8000/media';
export const BASE_URL_MEDI = 'http://127.0.0.1:8000/media/media/bg.png';
export const BASE_URL_ME = 'http://127.0.0.1:8000/media/media/ff.png';
export const BASE_URL_M = 'http://127.0.0.1:8000/media/media/bg1.jpeg';
export const BASE_URL_ = 'http://127.0.0.1:8000/media/media/bg2.jpeg';
export const BAS_URL_ = 'http://127.0.0.1:8000/media/media/bg3.jpeg';
export const BASE_URL_MED = 'http://127.0.0.1:8000/media/media/bg5.png';
export const BASE_URL_MEDIAS = 'http://127.0.0.1:8000';


const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
const axiosInstance1 = axios.create({
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

axiosInstance1.interceptors.request.use(function (config) {
  // Running on client. Attach token to header.
  return config;
}, function (error) {
  return Promise.reject(error);
});


export async function getPosts() {
  try {
    const response = await axiosInstance1.get('blog/posts/');
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


export const getCategories = async () => {
  try {
    const response = await axiosInstance1.get('blog/category/all');
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
    const response = await axiosInstance1.get(`blog/posts/featured/`, {
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
    const response = await axiosInstance1.get(`blog/posts/recent/`, {
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

export const verifyLogin = async () => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axiosInstance.post('user/login/verify/', { token });
    console.log(response);
    return response;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail) {
      console.log(error.response.data.detail);
    } else {
      console.error(error);
    }
    return null;
  }
};

verifyLogin();

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

export const updaterdv = async (id) => {
  try {
    const response = await axiosInstance.put(`rdv/update/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleterdv = async (id) => {
  try {
    const response = await axiosInstance.delete(`rdv/${id}/delete`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const registerMedecin = async (medecinData) => {
  try {
    const response = await axios.post('rdv/add_medecins/', medecinData);
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export async function getMedecins() {
  try {
    const response = await axiosInstance.get('rdv/medecins/');
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


export async function currentWeek() {
  // let id_grossesse=localStorage.getItem(selectedGrossesseId)
  // console.log(id_grossesse)
  try {
    const response = await axiosInstance.get(`grossesse/week/`);
    if (response.status === 200) {
      // localStorage.setItem('numSemaine', response.data.week)
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

export async function getSemaine() {
  const numSemaine=localStorage.setItem('numSemaine', response.data.week)
  console.log(numSemaine)
  try {
    const response = await axiosInstance.get(`grossesse/semaine/${1}`);
    if (response.status === 200) {
      console.log(response.data)
      return response.data;
    } else {
      console.error('Erreur lors de la requête');
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}

export async function getGrossesse() {
  try {
    const response = await axiosInstance.get('grossesse/list/');
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

export const registernotes = async (obj) => {
  try {
    const response = await axiosInstance.post(`notes/create/`, obj);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export async function getNotes() {
  try {
    const response = await axiosInstance.get('notes/get_notes/');
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

// useEffect(() => {
//   const fetchSemaineInfo = async () => {
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/api/v1/grossesse/semaine/${numSemaine}`);
//       setSemaineInfo(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   fetchSemaineInfo();
// }, [numSemaine]);
