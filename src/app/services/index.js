import axios from 'axios';
// const host='192.168.187.196';
const host='127.0.0.1';
export const BASE_URL = `http://${host}:8000/api/v1/`;
// bg1-removebg-preview.png
export const BASE_URL_MEDIA = `http://${host}:8000/media/`;
export const BASE_UR = `http://${host}:8000/media/bg.jpg`;
export const BASE_URL_MEDI = `http://${host}:8000/media/media/bg.png`;
export const BASE_URL_ME = `http://${host}:8000/media/media/ff.png`;
export const BASE_URL_M = `http://${host}:8000/media/media/bg1.jpeg`;
export const BASE_URL_ = `http://${host}:8000/media/media/bg2.jpeg`;
export const BAS_URL_ = `http://${host}:8000/media/media/bg3.jpeg`;
export const BG = `http://${host}:8000/media/media/bg1-removebg-preview.png`;
export const FB = `http://${host}:8000/media/media/facebook.jpeg`;
export const GG = `http://${host}:8000/media/media/ggg-playstore.png`;
export const TW = `http://${host}:8000/media/media/ttt-playstore.png`;
export const OM = `http://${host}:8000/media/media/logo_apple_pay.png`;
export const MOMO = `http://${host}:8000/media/media/mobile.jpeg`;
export const Imagepaypal = `http://${host}:8000/media/media/ttt-playstore.png`;
export const Visa = `http://${host}:8000/media/media/cartebancaire.jpeg`;
export const googol = `http://${host}:8000/media/media/logo_google_pay.png`;
export const BASE_URL_MED = `http://${host}:8000/media/media/bg5.png`;
export const BASE_URL_MEDIAS = `http://${host}:8000`;


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

// blog
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

// user
export const logout = async (data) => {
  try {
    const response = await axiosInstance.post(`user/logout/`,data);
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('access_token')
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const reset_password = async (data) => {
  try {
    const response = await axiosInstance.post(`user/password/reset/`,data);
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
// password/change  otp/send    otp/verified   password/reset
export const verify_otp = async (data) => {
  try {
    const response = await axiosInstance.post(`user/otp/verified`,data);
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

export const get_otp = async (data) => {
  try {
    const response = await axiosInstance.post(`user/otp/send`,data);
    localStorage.setItem('email',data.email)
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
    // console.log(response);
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
    const response = await axiosInstance1.post(`user/register/`, obj);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const changePassword = async (obj) => {
  try {
    const response = await axiosInstance.post(`user/password/change`, obj);
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


// grossesse
export const registerGrossesse = (data) => {
  return axiosInstance.post('grossesse/register/', data);
}

export const updateGrossesse = (data,pk) => {
  return axiosInstance.put(`grossesse/edit/${pk}`, data);
}

export async function getSemaine(numSemaine) {
  try {
    const response = await axiosInstance.get(`grossesse/semaine/${numSemaine}`);
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

export async function currentWeek() {
  try {
    const response = await axiosInstance.get(`grossesse/week/`);
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

// rdv
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

export const getrdvdetail = async () => {
  try {
    const id=localStorage.getItem('identifiant')
    const response = await axiosInstance.get(`rdv/detail/${id}`);
    // console.log(response)
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const updaterdv = async (id,obj) => {
  try {
    const response = await axiosInstance.put(`rdv/update/${id}/`,obj);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const put_off_rdv = async (id,obj) => {
  try {
    const response = await axiosInstance.put(`rdv/rdv_put_off/${id}/`,obj);
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
// medecin
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

// notes
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

export const updateNote = async (id,obj) => {
  try {
    const response = await axiosInstance.put(`notes/put/${id}/`,obj);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deletenote = async (id) => {
  try {
    const response = await axiosInstance.delete(`notes/${id}/delete/`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
// poids
export const registerpoids = async (obj) => {
  try {
    const response = await axiosInstance.post(`poids/create/`, obj);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export async function getpoids() {
  try {
    const response = await axiosInstance.get('poids/get_poids/');
    console.log(response.data);
    return response;
   
  } catch (error) {
    console.error(error);
  }
  return null;
}

export const deletepoids = async (id) => {
  try {
    const response = await axiosInstance.delete(`poids/${id}/delete/`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
