import { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import http from '../../http/http';
import './Login.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from "yup";

interface Props {
  modalLogin: boolean,
  setModalLogin: () => void,
  setLogado: () => void,
}

/* FORMULÁRIO DE CADASTRO E LOGIN É O MESMO */

// Yup
const schema = object({
  email: string().required('Campo obrigatório').email('Email inválido'),
  password: string().required('Campo obrigatório').min(3, 'Senha curta'),
});

export default function ModalLogin({ modalLogin, setModalLogin, setLogado }: Props) {

  const [hidenLogin, setHidenLogin] = useState<string>('text-center my-4 d-block');
  const [error, setError] = useState<string>('');
  const [errorLogin, setErrorLogin] = useState<string>('');
  const [errorValidateEmail, setErrorValidateEmail] = useState<any>();
  const [errorValidatePassword, setErrorValidatePassword] = useState<any>();
  const [formCreate, setFormCreate] = useState<boolean>(false);
  const { register, reset, handleSubmit, watch, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  // Erros yup
  useEffect(() => {

    if (errors?.email?.message) {
      setErrorValidateEmail(errors.email.message);
    } else {
      setErrorValidateEmail('')
    }

    if (errors?.password?.message) {
      setErrorValidatePassword(errors.password.message);
    } else {
      setErrorValidatePassword('')
    }


  }, [errors?.email, errors?.password])

  // Apagar erros de validações quando mudar de formulario
  useEffect(() => {

    if (errorValidateEmail || errorValidatePassword) {
      setErrorValidateEmail(null)
      setErrorValidatePassword(null);
    }

    if (formCreate) {
      setErrorLogin('');
    } else {
      setError('');
    }

  }, [formCreate]);

  const createUser = (data: any) => {

    const emailCreate = data.email;
    const passwordCreate = data.password;

    http.post('createUser', { emailCreate, passwordCreate }).then((response) => {

      var user = response.data[0];

      localStorage.setItem('user', user.id);
      localStorage.setItem('token', response.data[1]);
      setLogado();
      setModalLogin();


    }).catch((response) => {
      
      if (response?.response?.status === 412) {
        setError('Email já cadastrado')
      }
    
    });

  }

  const login = (data: any) => {

    var email = data.email
    var password = data.password;

    http.post('login', { email, password }).then((response) => {

      var user = response.data[0];
      localStorage.setItem('user', user.id);
      localStorage.setItem('token', response.data[1]);

      if (user.adm) {
        localStorage.setItem('adm', 'true');
      }

      setModalLogin();

    }).catch((response) => {

      reset();
      setErrorLogin('Login incorreto');

    })


  }

  const returnLogin = () => {
    setFormCreate(false)
    reset();
  }

  const showFormCreate = () => {
    setFormCreate(true)
    reset();
  }

  return (

    <Modal
      show={modalLogin}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onHide={setModalLogin}>
        <Modal.Title>
          <h5 className="color" id="exampleModalLongTitle">Coisas de Mulher</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className="vh-98">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-10">
                <form className={hidenLogin} onSubmit={(e) => !formCreate ? handleSubmit(login)(e) : handleSubmit(createUser)(e)}>
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <p className="lead fw-normal mb-0 me-3 color">entre com:</p>
                    <div className='d-flex'>
                      <button type="button" className="btn btn-danger d-flex align-items-start mx-1 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                        </svg>
                      </button>
                      <button type="button" className="btn btn-danger mx-1 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                          <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  {formCreate ?
                    <button type='button' className='back d-flex justify-content-center' onClick={returnLogin}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                      </svg>
                    </button>
                    : ''}

                  <div className="divider d-flex align-items-center my-4 justify-content-center">
                    {formCreate ? <p className="text-center fw-bold mx-3 mb-0 color">Cadastre-se</p> : <p className="text-center fw-bold mx-3 mb-0 color">Entre com email e senha</p>}
                  </div>
                  <div className="form-outline mb-4">
                    <input type="email" {...register("email")} className="inputL"
                      placeholder="Email" />
                    <p className='mx-0 my-2 text-danger'>{errorValidateEmail}</p>
                  </div>
                  <div className="form-outline mb-3">
                    <input type="password" {...register("password")} className="inputL"
                      placeholder="Senha" />
                    <p className='mx-0 my-2 text-danger'>{errorValidatePassword}</p>
                  </div>
                  <p className="m-0 text-danger">{!formCreate && errorLogin}</p>
                  <p className="my-2 text-danger">{formCreate && error}</p>

                  {formCreate ? <button type='submit' className='btn btn-danger'>Cadastrar</button> :
                    <>
                      <button type="submit" className="btn btn-danger btn-sm my-3"><strong>Entrar<strong /></strong></button>
                      <a href="#!" className="coloor d-block mb-2">Esqueceu sua senha ?</a>
                      <button type='button' className='createUser' onClick={showFormCreate}>Cadastre-se</button>
                    </>
                  }
                </form>
              </div>
            </div>
          </div>
        </section>
      </Modal.Body>
    </Modal>

  );

}