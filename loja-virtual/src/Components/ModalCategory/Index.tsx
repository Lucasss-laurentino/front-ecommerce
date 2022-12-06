import './ModalCategory.css';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import http from '../../http/http';
import Category from '../../Inteface/Category';

interface Props {
    modalCategory: boolean,
    setModalCategory: () => void,
    setCategories: (categories: Category[]) => void,
}

export default function ModalCategory({ modalCategory, setModalCategory, setCategories }: Props) {

    const [category, setCategory] = useState<string>('');
    const [imageOne, setImageOne] = useState<File | null>();
    const [imageTwo, setImageTwo] = useState<File | null>();

    const createCategory = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        if(imageOne && imageTwo && category) {

            const formData = new FormData();

            formData.append('imageOne', imageOne)
            formData.append('imageTwo', imageTwo)
            formData.append('category', category)

            http.request({
                url: 'createCategory',
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData,

            }).then((response) => {
                setCategories([...response.data]);
            })

        } else {
            console.log('deu ruim')
        }


    }

    const selectImageOne = (event: React.ChangeEvent<HTMLInputElement>) => {


        if(event.target.files?.length) {
            setImageOne(event.target.files[0])
        } else {
            setImageOne(null)
        }

    }

    const selectImageTwo = (event: React.ChangeEvent<HTMLInputElement>) => {

        if(event.target.files?.length){
            setImageTwo(event.target.files[0])
        } else {
            setImageTwo(null)
        }

    }

    return (

        <Modal
            show={modalCategory}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onHide={setModalCategory}>
                <Modal.Title id="contained-modal-title-vcenter">
                    <p className="m-0 color">Cadastre uma categoria</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <p className='m-0 text-center h6 color'>Categorias existentes</p>
                    <ul className='color list-category'>
                        <li className='text-center'>Roupas</li>
                        <li className='text-center'>Bolsas</li>
                        <li className='text-center'>Jóias</li>
                    </ul>
                    <div className="container">
                        <form action="" className="form-group" onSubmit={createCategory}>
                            <input type="text" value={category} onChange={(value) => setCategory(value.target.value)} className="input-border w-100" placeholder="Categoria" />
                            <input type="file" accept='image/*' className='form-control mb-2' onChange={selectImageOne} />
                            <input type="file" className='form-control mb-2' onChange={selectImageTwo}/>
                            <button type='submit' className='w-100 my-2 button-category'>cadastrar</button>
                        </form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>


    )

}