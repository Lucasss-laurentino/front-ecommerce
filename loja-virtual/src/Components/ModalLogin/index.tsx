import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import http from '../../http/http';
import './Login.css';

interface Props {
  modalLogin: boolean,
  setModalLogin: () => void,
  setLogado: () => void,
}

export default function ModalLogin({ modalLogin, setModalLogin, setLogado }: Props) {

  const [hidenLogin, setHidenLogin] = useState<string>('text-center my-4 d-block');
  const [hidenCreate, setHidenCreate] = useState<string>('d-none');

  const [emailCreate, setEmailCreate] = useState<string>('');
  const [passwordCreate, setPasswordCreate] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [error, setError] = useState<string>('');

  const animate = () => {

    setHidenLogin('d-none');
    setHidenCreate('text-center my-4 d-block');


  }

  const init = () => {
    setHidenLogin('text-center my-4 d-block');
    setHidenCreate('d-none');
  }

  const createUser = () => {

    http.post('createUser', {emailCreate, passwordCreate}).then((response) => {
      
      if(response.data == false){
        
        setError('Email ja cadastrado');
      
      } else {

        var user = response.data[0];

        localStorage.setItem('user', user.id);
        localStorage.setItem('token', response.data[1]);
        setLogado();
        setModalLogin();
      }

    })
  
  }

  const login = () => {
    http.post('login', {email, password}).then((response) => {

      var user = response.data[0];
      localStorage.setItem('user', user.id);
      localStorage.setItem('token', response.data[1]);

      if(user.adm) {
        localStorage.setItem('adm', 'true');
      }

      setEmail('');
      setPassword('');
      setModalLogin();
    
    })
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
                <form className={hidenLogin}>
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
                  <div className="divider d-flex align-items-center my-4 justify-content-center">
                    <p className="text-center fw-bold mx-3 mb-0 color">Entre com email e senha</p>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="email" value={email} onChange={(value) => setEmail(value.target.value)} className="inputL"
                      placeholder="Email" />
                  </div>
                  <div className="form-outline mb-3">
                    <input type="password" className="inputL" value={password} onChange={(value) => setPassword(value.target.value)}
                      placeholder="Senha" />
                  </div>
                  <button type="button" className="btn btn-danger btn-sm my-3" onClick={login}><strong>Entrar<strong /></strong></button> {/* style="padding-left: 2.5rem; padding-right: 2.5rem;" */}
                  <a href="#!" className="coloor d-block mb-2">Esqueceu sua senha ?</a>
                  <button type='button' className='createUser' onClick={animate}>Cadastre-se</button>
                </form>

                <form className={hidenCreate}>
                  <button type='button' className='back d-flex justify-content-center' onClick={init}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                    </svg>
                  </button>
                  <div className="form-outline mb-4">
                    <input type="email" value={emailCreate} onChange={(value) => setEmailCreate(value.target.value) } className="inputL"
                      placeholder="Email" />
                  </div>
                  <div className="form-outline mb-3">
                    <input type="password" className="inputL" value={passwordCreate} onChange={(value) => setPasswordCreate(value.target.value)}
                      placeholder="Senha" />
                  </div>
                  <button type="button" className="btn btn-danger btn-sm my-3" onClick={createUser}><strong>Cadastrar<strong /></strong></button> {/* style="padding-left: 2.5rem; padding-right: 2.5rem;" */}
                  <p className="m-0 text-danger">{error}</p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Modal.Body>
    </Modal>



  );

}