import './ModalAddress.css';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import axios from 'axios';
import http from '../../http/http';
import Address from '../../Inteface/Address';

interface Props {
    modalAddress: boolean,
    setModalAddress: () => void,
}

export default function ModalAddress({ modalAddress, setModalAddress }: Props) {

    const [cep, setCep] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [district, setDistrict] = useState<string>('');
    const [street, setStreet] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const [address, setAddress] = useState<Address>();

    useEffect(() => {

        if (cep) {
            var element = document.getElementById('estado'); // Aqui pode pegar qualquer elemento que tem a classe autoComplete já que todos recebem readOnly

            if (element?.getAttribute('readonly')) {

                var elements = document.getElementsByClassName('autoComplete');

                for (var cont = 0; cont < elements.length;) {

                    elements[cont].removeAttribute('readonly');
                    elements[cont].classList.remove('text-muted');

                    cont++;

                }

            }
        }

    }, [cep])


    const completeCep = (event: any) => {

        var cep = event.target.value.replace(/\D/g, '');

        if (cep.length === 8) {

            axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((response) => {

                setState(response.data.uf)
                setCity(response.data.localidade)
                setDistrict(response.data.bairro);
                setStreet(response.data.logradouro);

                var elements = document.getElementsByClassName('autoComplete');

                for (var cont = 0; cont < elements.length;) {

                    elements[cont].setAttribute('readonly', 'readOnly');
                    elements[cont].classList.add('text-muted');

                    cont++;

                }

            })

        }

    }

    const createAddress = () => {

        const user_id = localStorage.getItem('user');

        http.post('createAddress', {cep, state, city, district, street, number, user_id}).then((response) => {
            setAddress(response.data)
        })
    }

    return (

        <Modal
            show={modalAddress}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onHide={setModalAddress}>
                <Modal.Title id="contained-modal-title-vcenter">
                    <p className="m-0 color">Cadastre um endereço</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div className="container d-flex justify-content-center">
                    <form action="" className='text-center'>
                        <InputMask
                            mask="99999-999"
                            placeholder="cep"
                            value={cep}
                            onChange={(value) => setCep(value.target.value)}
                            className='input-address m-3'
                            onBlur={completeCep}
                        />
                        <input
                            type="text"
                            placeholder="Estado"
                            value={state}
                            id="estado"
                            onChange={(value) => setState(value.target.value)}
                            className='input-address m-3 autoComplete'
                        />
                        <input
                            type="text"
                            placeholder="Cidade"
                            value={city}
                            onChange={(value) => setCity(value.target.value)}
                            className='input-address m-3 autoComplete'
                        />
                        <input
                            type="text"
                            placeholder="Bairro"
                            value={district}
                            onChange={(value) => setDistrict(value.target.value)}
                            className='input-address m-3 autoComplete'
                        />
                        <input
                            type="text"
                            placeholder="Rua"
                            value={street}
                            onChange={(value) => setStreet(value.target.value)}
                            className='input-address m-3 autoComplete'
                        />
                        <input
                            type="text"
                            placeholder="Número"
                            value={number}
                            onChange={(value) => setNumber(value.target.value)}
                            className='input-address m-3 text-muted'
                        />
                    </form>
                </div>
                <div className="container d-flex justify-content-center">
                    <button className='btn-create-address' onClick={createAddress} >Cadastrar</button>
                </div>

            </Modal.Body>
        </Modal>

    );
}