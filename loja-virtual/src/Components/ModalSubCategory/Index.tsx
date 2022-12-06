import './ModalSubCategory.css';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import Category from '../../Inteface/Category';
import http from '../../http/http';
import SubCategory from '../../Inteface/SubCategory';

interface Props {
    modalSubCategory: boolean,
    setModalSubCategory: () => void,
    categories: Category[],
}

export default function ModalSubCategory({ modalSubCategory, setModalSubCategory, categories }: Props) {

    // Classe para esconder lista de categorias da modal
    const [listCategories, setListCategories] = useState<string>('list-categories');

    // Classe para esconder ou mostrar formulario de cadastro para sub categoria
    const [formSubCategory, setFormSubCategory] = useState<string>('formSubCategory-hiden');

    // Categoria selecionada
    const [category, setCategory] = useState<string>('');

    // Nome categoria
    const [subCategoryName, setSubCategoryName] = useState<string>('');

    // Sub categorias
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

    useEffect(() => {
        if(category){
            http.get(`getSubCategories/${category}`).then((response) => {
                setSubCategories([...response.data])
            })
    
        }
    }, [category]); 

    const closeModal = () => {
        setListCategories('list-categories');
        setFormSubCategory('formSubCategory-hiden')
        setModalSubCategory();
    }

    const selectCategory = (name: string) => {

        setCategory(name)

        setListCategories('list-categories-hiden')
        setFormSubCategory('formSubCategory')
    }

    const closeFormShowList = () => {
        setFormSubCategory('formSubCategory-hiden')
        setListCategories('list-categories')
    }

    const createSubCategory = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        http.post('createSubCategory', {category, subCategoryName}).then((response) => {
            setSubCategories([...response.data])
        })
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
                        {categories.map((category) => {
                            return (
                                <li key={category.id} className='my-3 item-list-sub-category h4' onClick={() => selectCategory(category.name)}>{category.name}</li>
                            )
                        })}
                    </ul>

                    <div className={formSubCategory}>
                        <section className='d-flex justify-content-around align-items-center'>
                            <p className='m-0 p-sub-categories'>
                                <strong>{category}</strong>
                            </p>
                            <button className="btn-callback" onClick={closeFormShowList}>
                                <strong>Voltar</strong>
                            </button>
                        </section>

                        <ul className='text-center my-5 list-sub-categories'>
                            {subCategories.map((subCategory) => {
                                return (
                                    <li key={subCategory.id}>{subCategory.name}</li>
                                )
                            })}
                        </ul>

                        <form className='my-3' onSubmit={createSubCategory}>
                            <div className="form-group">
                                <input type="text" value={subCategoryName} onChange={(value) => setSubCategoryName(value.target.value)} className="input-sub-category w-100" placeholder="Sub categoria" />
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