import './ModalSubCategory.css';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

interface Props {
    modalSubCategory: boolean,
    setModalSubCategory: () => void,
}

export default function ModalSubCategory({ modalSubCategory, setModalSubCategory }: Props) {

    // Classe para esconder lista de categorias da modal
    const [listCategories, setListCategories] = useState<string>('list-categories');

    // Classe para esconder ou mostrar formulario de cadastro para sub categoria
    const [formSubCategory, setFormSubCategory] = useState<string>('formSubCategory-hiden');

    const closeModal = () => {
        setListCategories('list-categories');
        setFormSubCategory('formSubCategory-hiden')
        setModalSubCategory();
    }

    const selectCategory = (id: number) => {


        // selecionar sub categorias de categoria (id)

        setListCategories('list-categories-hiden')
        setFormSubCategory('formSubCategory')
    }

    const closeFormShowList = () => {
        setFormSubCategory('formSubCategory-hiden')
        setListCategories('list-categories')
    }


    return (


        <Modal
            show={modalSubCategory}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onHide={closeModal}>
                <Modal.Title id="contained-modal-title-vcenter">
                    {listCategories === 'list-categories' ? <p className='color-modal-sub-category m-0'>Escolha uma categoria</p> : <p className='color-modal-sub-category m-0'>Sub categorias</p>}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <ul className={listCategories}>
                        <li className='my-3 item-list-sub-category h4' onClick={() => selectCategory(1)}>Roupas</li>
                        <li className='my-3 item-list-sub-category h4' onClick={() => selectCategory(2)}>Bolsas</li>
                        <li className='my-3 item-list-sub-category h4' onClick={() => selectCategory(3)}>Jóias</li>
                    </ul>

                    <div className={formSubCategory}>
                        <section className='d-flex justify-content-around align-items-center'>
                            <p className='m-0 p-sub-categories'>
                                <strong>Nome categoria escolhida</strong>
                            </p>
                            <button className="btn-callback" onClick={closeFormShowList}>
                                <strong>Voltar</strong>
                            </button>
                        </section>

                        <form className='my-3'>
                            <div className="form-group">
                                <input type="text" className="input-sub-category w-100" placeholder="Sub categoria" />
                            </div>
                            <button type="submit" className="w-100 btn btn-danger btn-sm my-3">cadastrar</button>
                        </form>

                    </div>

                </div>

            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}