"use client";
import Link from "next/link";
// import { getCsrfToken } from "next-auth/react";
import { Component } from "react";
import { Router } from "next/router";
import Modal, { setAppElement } from "react-modal";
import { registerGrossesse } from "@/app/services";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import type { NextPage } from "next";

const schema = Yup.object().shape({
  start_date: Yup.string().required(),
  user: Yup.string().required()

});

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

class RegisterGrossesseForm extends Component{

  construtor(props){
    console.log(props)
    this.state = {
      isOpen:props.isOpened,
      successMessage:undefined,
      errorMessage:undefined,
    }
  }

  setIsOpen(values){
    this.setState({
      isOpen:values
    })
  }
setSuccessMessage(values){
  this.setState({
    successMessage:values
  })
}

setErrorMessage(values){
  this.setState({
    errorMessage:values
  })
}
 initialeValues = {
  start_date: "" ,
  user:""

 }


  // const router = useRouter();

  // const { errors, touched, values, handleChange, handleSubmit } = formik;
  handleSubmit = ({ start_date ,user}) => {
    console.log('bnj')
      registerGrossesse({ start_date,user }).then( response =>{
          if (response) {
            this.setSuccessMessage("Grossesse enregistrée !");
            var router = new Router("grossesse/evolution"))
            router.replace("grossesse/evolution");
          } else {
            this.setErrorMessage("Erreur lors de l'enregistrement.");
          }
      }
        ).catch( error =>{

          console.error(error);
          this.setErrorMessage("Erreur lors de la communication avec le serveur.");
        })
    }
  

render(){
  
  return (
    <div className="mt-20">
      <Modal
        ariaHideApp={false}
        isOpen={true}
        onRequestClose={() => this.setIsOpen(false)}
        style={customStyles}
      >
        <div className="p-4 bg-blue-400">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Enregistrer la date de début de grossesse
            </h2>
            {/* <span
              className="material-icons mr-2 text-black-600 float-right cursor-pointer"
              onClick={() => this.setIsOpen(false)}
            >
              close
            </span> */}
          </div>
          <Formik
              initialValues = {this.initialeValues}
              validationSchema =  {schema}
              onSubmit = { values => {
                console.log('bnj')
                let { start_date ,user} = values
                  registerGrossesse({ start_date,user }).then( response =>{
                      if (response) {
                        this.setSuccessMessage("Grossesse enregistrée !");
                        var router = new Router("grossesse/evolution"))
                        router.replace("grossesse/evolution");
                      } else {
                        this.setErrorMessage("Erreur lors de l'enregistrement.");
                      }
                  }
                    ).catch( error =>{
            
                      console.error(error);
                      this.setErrorMessage("Erreur lors de la communication avec le serveur.");
                    })
                }
              }
          >
         <form>
            <div className="mb-4">
              <label
                htmlFor="start-date"
                className="text-lg font-semibold block mb-2"
              >
                Date de début :
              </label>
              <input
                type="number"
                id="user"
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2"
                value={values.user}
                required
              />
              {errors.start_date && touched/.start_date && (
                <span className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                  {errors.start_date}
                </span>
              )}
              <input
                type="date"
                id="start_date"
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Enregistrer
              </button>
            </div>
          </form>
          </Formik>
           {this.state.successMessage && ( 
             <p className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
             {this.state.successMessage} 
           </p> 
          )}
          {this.state.errorMessage && (
            <p className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {this.state.errorMessage}
            </p>
          )} 
        </div>
      </Modal>
    </div>
  );
};

}

export default RegisterGrossesseForm;