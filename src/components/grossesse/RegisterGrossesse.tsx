import React, { Component } from 'react';
import Modal from 'react-modal';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { BeatLoader } from 'react-spinners';
import { registerGrossesse } from '@/app/services';

const override = css`
  display: block;
  margin: 0 auto;
`;

const validationSchema = Yup.object().shape({
  start_date: Yup.string().required('La date de début est obligatoire.'),
});

class RegisterGrossesseForm extends Component {
  state = {
    isOpen: true,
    successMessage: undefined,
    errorMessage: undefined,
    isLoading: false,
  };

  setIsOpen = (value) => {
    this.setState({
      isOpen: value,
    });
  };

  setIsLoading = (value) => {
    this.setState({
      isLoading: value,
    });
  };

  setSuccessMessage = (value) => {
    this.setState({
      successMessage: value,
    });
  };

  setErrorMessage = (value) => {
    this.setState({
      errorMessage: value,
    });
  };

  handleSubmit = ({ start_date }) => {
    this.setIsLoading(true);
    registerGrossesse({ start_date })
      .then((response) => {
        if (response) {
          this.setSuccessMessage('Grossesse enregistrée !');
          const router = useRouter();
          router.replace('grossesse/evolution');
        } else {
          this.setErrorMessage("Erreur lors de l'enregistrement.");
        }
      })
      .catch((error) => {
        console.error(error);
        this.setErrorMessage("Erreur lors de la communication avec le serveur.");
      })
      .finally(() => {
        this.setIsLoading(false); // Désactiver le loader
      });
  };

  render() {
    return (
      <div id="root" className="mt-20">
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={() => this.setIsOpen(false)}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
            },
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
            },
          }}
        >
          <div className="p-4 bg-blue-400">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Enregistrer la date de début de grossesse
              </h2>
            </div>
            <Formik
              initialValues={{
                start_date: '',
                user: '',
              }}
              validationSchema={validationSchema}
              onSubmit={this.handleSubmit}
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="start-date" className="text-lg font-semibold block mb-2">
                      Date de début :
                    </label>
                    <Field
                      type="date"
                      id="start_date"
                      name="start_date"
                      className="border border-gray-300 rounded-lg p-2"
                      required
                    />
                    <ErrorMessage
                      name="start_date"
                      component="span"
                      className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2"
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="submit"
                      disabled={this.state.isLoading}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      {this.state.isLoading ? (
                        <BeatLoader color={'#ffffff'} loading={this.state.isLoading} css={override} size={10} />
                      ) : (
                        'Enregistrer'
                      )}
                    </button>
                  </div>
                </form>
              )}
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
  }
}

export default RegisterGrossesseForm;