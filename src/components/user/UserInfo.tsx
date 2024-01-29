"use client";
import React from 'react';
import { logout } from '@/app/services';
import { getUserInfo } from '@/app/services';

// class ProfileState {
//   constructor(userInfo){
//     var username:String=undefined
//     let firstName: string=undefined
//     let lastName: string=undefined
//     let email: string=undefined
//   }
// }

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
        <div className="grid place-items-center mt-40">
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
      </div>
    );
  }
}

export default Profile;