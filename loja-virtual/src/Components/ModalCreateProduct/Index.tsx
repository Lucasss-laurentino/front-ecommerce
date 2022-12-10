import './ModalCreateProduct.css';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import Category from '../../Inteface/Category';
import http from '../../http/http';
import SubCategory from '../../Inteface/SubCategory';

interface Props {
    modalCreateProduct: boolean,
    setModalCreateProduct: () => void,
    categories: Category[],
}

export default function ModalCreateProduct({ modalCreateProduct, setModalCreateProduct, categories }: Props) {

    // Estado de input
    const [name, setName] = useState<string>('');
    const [manufacturer, setManufacturer] = useState<string>('');
    const [price, setPrice] = useState<string>('');

    // Estado para guardar sub categorias de categoria selecionada no select
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

    // guardar categoria e sub categoria escolhida
    const [category, setCategory] = useState<string>('Selecione uma categoria');
    const [subCategory, setSubCategory] = useState<string>('Selecione uma sub categoria');

    /*  Estados para cada checkbox marcado mostrar input   */
    const [sizeP, setSizeP] = useState<boolean>(false);
    const [sizeM, setSizeM] = useState<boolean>(false);
    const [sizeG, setSizeG] = useState<boolean>(false);
    const [sizeGG, setSizeGG] = useState<boolean>(false);

    const [classHidenP, setClassHidenP] = useState<string>('d-none');
    const [classHidenM, setClassHidenM] = useState<string>('d-none');
    const [classHidenG, setClassHidenG] = useState<string>('d-none');
    const [classHidenGG, setClassHidenGG] = useState<string>('d-none');

    // Quantidade para cada tamanho checado
    const [qtdP, setQtdP] = useState<string>('');
    const [qtdM, setQtdM] = useState<string>('');
    const [qtdG, setQtdG] = useState<string>('');
    const [qtdGG, setQtdGG] = useState<string>('');

    const [imageOne, setImageOne] = useState<File | null>();
    const [imageTwo, setImageTwo] = useState<File | null>();
    const [imageThree, setImageThree] = useState<File | null>();

    const selectCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {

        // Selecionar sub categorias para exibir no select de sub categorias de acordo com a categoria escolhida
        http.get(`getSubCategories/${event.target.value}`).then((response) => {
            setSubCategories([...response.data])
        })

        setCategory(event.target.value)

    }

    const selectSubCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSubCategory(event.target.value)
    }

    const toggle = (size: string) => {

        if (size === 'P') {
            setSizeP(!sizeP)
            if (!sizeP) {
                setClassHidenP('input-product');
            } else {
                setClassHidenP('d-none')
            }
        }

        if (size === 'M') {
            setSizeM(!sizeM)
            if (!sizeM) {
                setClassHidenM('input-product');
            } else {
                setClassHidenM('d-none')
            }

        }

        if (size === 'G') {
            setSizeG(!sizeG)
            if (!sizeG) {
                setClassHidenG('input-product');
            } else {
                setClassHidenG('d-none')
            }

        }

        if (size === 'GG') {
            setSizeGG(!sizeGG)
            if (!sizeGG) {
                setClassHidenGG('input-product');
            } else {
                setClassHidenGG('d-none')
            }

        }

    }

    const selectImageOne = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            setImageOne(event.target.files[0]);
        } else {
            setImageOne(null);
        }
    }

    const selectImageTwo = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            setImageTwo(event.target.files[0]);
        } else {
            setImageTwo(null);
        }
    }

    const selectImageThree = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            setImageThree(event.target.files[0]);
        } else {
            setImageThree(null);
        }
    }


    const createProduct = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        if (name && manufacturer && price && category && subCategory && imageOne && imageTwo) {

            const formData = new FormData();

            formData.append('name', name);
            formData.append('manufacturer', manufacturer);
            formData.append('price', price);

            if (sizeP) {
                formData.append('sizeP', JSON.stringify(sizeP))
                formData.append('qtdP', qtdP)
            }

            if (sizeM) {
                formData.append('sizeM', JSON.stringify(sizeM))
                formData.append('qtdM', qtdM)

            }

            if (sizeG) {
                formData.append('sizeG', JSON.stringify(sizeG))
                formData.append('qtdG', qtdG)

            }

            if (sizeGG) {
                formData.append('sizeGG', JSON.stringify(sizeGG))
                formData.append('qtdGG', qtdGG)
            }

            formData.append('category', category);
            formData.append('subCategory', subCategory)
            formData.append('imageOne', imageOne);
            formData.append('imageTwo', imageTwo);

            if(imageThree){
                formData.append('imageThree', imageThree);
            }

            http.request({
                url: 'createProduct',
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData,
            }).then(response => {
                console.log(response.data)
            })

        }
    }


    return (

        <Modal
            show={modalCreateProduct}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onHide={setModalCreateProduct}>
                <Modal.Title id="contained-modal-title-vcenter">
                    <p className="m-0 p-create-product">Cadastre um produto</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={createProduct}>
                    <div className="form-group">
                        <input type="text" value={name} onChange={(value) => setName(value.target.value)} className="input-product my-2" placeholder="Nome" />
                    </div>
                    <div className="form-group">
                        <input type="text" value={manufacturer} onChange={(value) => setManufacturer(value.target.value)} className="input-product my-2" placeholder="Fabricante" />
                    </div>
                    <div className="form-group">
                        <input type="text" value={price} onChange={(value) => setPrice(value.target.value)} className="input-product my-2" placeholder="preço" />
                    </div>
                    <div className="form-group">
                        <select className="input-product my-2" onChange={selectCategory} aria-label="Default select example">
                            <option >{category}</option>
                            {categories.map((category) => {
                                return (
                                    <option key={category.id} value={category.name}>{category.name}</option>
                                )
                            })}

                        </select>
                    </div>
                    <div className="form-group">
                        <select className="input-product my-2" onChange={selectSubCategory} aria-label="Default select example">
                            <option>{subCategory}</option>
                            {subCategories.map((subCategory) => {
                                return (
                                    <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="form-check form-check-inline my-2">
                        <input className="form-check-input" type="checkbox" onChange={() => toggle('P')} id="inlineCheckbox1" value="option1" />
                        <label className="p-create-product" htmlFor="inlineCheckbox1">P</label>
                    </div>
                    <div className="form-check form-check-inline my-2">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox2" onChange={() => toggle('M')} value="option2" />
                        <label className="p-create-product" htmlFor="inlineCheckbox2">M</label>
                    </div>
                    <div className="form-check form-check-inline my-2">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox2" onChange={() => toggle('G')} value="option2" />
                        <label className="p-create-product" htmlFor="inlineCheckbox2">G</label>
                    </div>
                    <div className="form-check form-check-inline my-2">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox2" onChange={() => toggle('GG')} value="option2" />
                        <label className="p-create-product" htmlFor="inlineCheckbox2">GG</label>
                    </div>

                    <div className="my-3">
                        <input type="number" className={classHidenP} placeholder='Quantidade P' value={qtdP} onChange={(value) => setQtdP(value.target.value)} />
                    </div>
                    <div className="my-3">
                        <input type="number" className={classHidenM} placeholder='Quantidade M' value={qtdM} onChange={(value) => setQtdM(value.target.value)} />
                    </div>
                    <div className="my-3">
                        <input type="number" className={classHidenG} placeholder='Quantidade G' value={qtdG} onChange={(value) => setQtdG(value.target.value)} />
                    </div>
                    <div className="my-3">
                        <input type="number" className={classHidenGG} placeholder='Quantidade GG' value={qtdGG} onChange={(value) => setQtdGG(value.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="formFileSm" className="p-create-product my-1">Carregue uma imagem para capa do produto</label>
                        <input className="form-control form-control-sm" id="formFileSm" type="file" onChange={selectImageOne} />
                    </div>
                    <div className="my-2">
                        <label htmlFor="formFileSm" className="p-create-product">Carregue outras duas imagens do produto</label>
                        <input className="form-control form-control-sm" id="formFileSm" type="file" onChange={selectImageTwo} />
                    </div>
                    <div className="my-2">
                        <input className="form-control form-control-sm" onChange={selectImageThree} id="formFileSm" type="file" />
                    </div>

                    <button type="submit" className="w-100 create-button p-2">Cadastrar</button>
                </form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}