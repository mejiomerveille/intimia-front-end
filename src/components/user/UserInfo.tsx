"use client";
import React from 'react';
import { logout } from '@/app/services';
import { getUserInfo } from '@/app/services';


class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state={
      successMessage:'',
      errorMessage:'',
      user:undefined,

    }
  }


  componentDidMount() {
          try {
            const response = getUserInfo().then(
              response =>{

                if (response) {
                  // console.log(response)
                  this.setState({successMessage:'connexion réussie !',user:response});
                } else {
                  this.setState({errorMessage:'Erreur lors de la connexion.'});
                }
              }
            )
          } catch (error) {
            console.error(error);
            this.setState({errorMessage:'Erreur lors de la communication avec le serveur.'});
          }
  }

  SignOut = async () => {
    await logout();
    this.setState({ user: null });
    localStorage.removeItem('access_token');
  };

  render() {
    const { user } = this.state;

    if (!user) {
      return <div>Loading...</div>;
    }

    const { username, email } = user;

    return (
      <div>
        <div> 
        <div className="relative flex justify-center mb-8" data-aos="zoom-y-out" data-aos-delay="450">
          <div className="flex flex-col justify-center">
        <p className='mt-24'>Profil</p>
            <svg className="absolute inset-0 max-w-full mx-auto md:max-w-none h-auto" width="768" height="432" viewBox="0 0 768 432" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <defs>
                <radialGradient cx="21.152%" cy="86.063%" fx="21.152%" fy="86.063%" r="79.941%" id="hero-ill-e">
                  <stop stopColor="#4FD1C5" offset="0%" />
                  <stop stopColor="#81E6D9" offset="25.871%" />
                  <stop stopColor="#338CF5" offset="100%" />
                  <p>Profile</p>
                </radialGradient>
                <circle id="hero-ill-d" cx="384" cy="216" r="64" />
              </defs>
              <g fill="none" fillRule="evenodd">
                <circle fillOpacity=".04" fill="url(#hero-ill-a)" cx="384" cy="216" r="128" />
                <circle fillOpacity=".16" fill="url(#hero-ill-b)" cx="384" cy="216" r="96" />
                <g fillRule="nonzero">
                  <use fill="#000" xlinkHref="#hero-ill-d" />
                  <use fill="url(#hero-ill-e)" xlinkHref="#hero-ill-d" />
                </g>
              </g>
            </svg>
          </div>
          </div>
          </div>

        <div className="grid place-items-center mt-60">
          <div className="shadow-lg p-8 bg-zinc-300 flex flex-col gap-2 my-6">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <div>
              Nom d&apos;utilisateur : <span className="font-bold">{username}</span>
            </div>
            <div>
              Email : <span className="font-bold">{email}</span>
            </div>
            <button onClick={this.SignOut} className="bg-red-500 text-white font-bold px-6 py-2 mt-3">
              Log Out
            </button>
          </div>
        </div>
        <div className="bg-white flex flex-wrap justify-between">
  <div className="w-full lg:w-auto">
    <p className='font-bold'>Menu</p>
    <ul>
      <li>Parametre</li>
      <li>Coupons</li>
      <li>Dire a un(e) ami(e)</li>
      <li>Veuillez laisser un avis ici</li>
      <li>A propos de nous</li>
      <li>Nous contacter</li>
      <li>Termes d'utilisation</li>
      <li>Politique de confidentialite</li>
      <li>Remerciements</li>
    </ul>
  </div>

  <div className="w-full lg:w-auto">
    <p className='font-bold'>Votre grossesse</p>
    <ul>
      <li>Sexe du bebe</li>
      <li>Prenom du bebe</li>
      <li>Date de debut de grossesse</li>
      <li>Date du terme de la grossesse</li>
      <li>Premier enfant?</li>
      <li>Perte de grossesse?</li>
      <li>BeBe est deja nee?</li>
    </ul>
  </div>

  <div className="w-full lg:w-auto">
    <p className='font-bold'>Compte</p>
    <ul>
      <li>Prenom</li>
      <li>Nom</li>
      <li>adresse mail</li>
      <li>Age</li>
      <li>Vous etes?</li>
    </ul>
  </div>

  <div className="w-full lg:w-auto">
    <p className='font-bold'>Donnees</p>
    <ul>
      <li>Exporter toutes les donnees</li>
      <li>Communication personnalisee</li>
      <li>Reinitialiser l'appli</li>
    </ul>
  </div>
</div>
      </div>
    );
  }
}

export default Profile;