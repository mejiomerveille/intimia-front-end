import React, { useState, useEffect } from 'react';
import { submitComment } from '../../app/services';
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";

const CommentsForm = ({ slug }) => {
// verifie si lutilisateur est connecte ou pas

const [user, setUser] = useState(null);


const override = css`
  display: block;
  margin: 0 auto;
`;


useEffect(() => {
  const fetchUserInfo = async () => {
    try {
      // recupperer le token 
      const token = window.localStorage.getItem('token') || undefined;
      console.log(token);
      // get the logged in user
      if(token !== undefined){
        const response = await fetch('http://127.0.0.1:8000/api/user/', {
        headers: {
          Authorization: `Token ${token}`,
          'Accept': 'application/json'
        }
      })
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error('Erreur lors de la requête');
      }
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  fetchUserInfo();
}, []);



// poster le commentaire
  const [error, setError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({ comment: null, storeData: false });
  const [isLoading, setIsLoading] = useState(false);

  const onInputChange = (e) => {
    const { target } = e;
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handlePostSubmission = () => {
    setIsLoading(true); 
    setError(false);
    const { comment, storeData } = formData;
    if (!comment) {
      setError(true);
      return;
    }
    const commentObj = {
      comment,
      slug,
    };
    submitComment(commentObj)
      .then((res) => {
        if (res.createComment) {
          formData.comment = '';
          setFormData((prevState) => ({
            ...prevState,
            ...formData,
          }));
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);
        }
      });
  };
  //if (user) {

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea value={formData.comment} onChange={onInputChange} className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" name="comment" placeholder="Comment" />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input checked={formData.storeData} onChange={onInputChange} type="checkbox" id="storeData" name="storeData" value="true" />
          <label className="text-gray-500 cursor-pointer" htmlFor="storeData"> Save my name, email in this browser for the next time I comment.</label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All fields are mandatory</p>}
      <div className="mt-8">
        <button type="button" onClick={handlePostSubmission} className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
          {isLoading ? (
            <BeatLoader color={"#ffffff"} loading={isLoading} css={override} size={10} />
          ) : (
            "Post Comment"
          )}
          </button>
        {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted for review</span>}
      </div>
    </div>
  );
/*/} else {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <div className="grid grid-cols-1 gap-4 mb-4">
        
      </div>
      <div className="mt-8">
        <a href="/register/url">
        <button type="button"  className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">Se connecter </button>
        </a>
      </div>
    </div>
  );
}*/
};

export default CommentsForm;
