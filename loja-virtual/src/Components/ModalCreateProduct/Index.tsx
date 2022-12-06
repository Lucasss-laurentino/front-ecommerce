import './ModalCreateProduct.css';
import Modal from 'react-bootstrap/Modal';

interface Props {
    modalCreateProduct: boolean,
    setModalCreateProduct: () => void,
}

export default function ModalCreateProduct({ modalCreateProduct, setModalCreateProduct }: Props) {
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
                <form>
                    <div className="form-group">
                        <input type="text" className="input-product my-2" placeholder="Nome" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="input-product my-2" placeholder="Fabricante" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="input-product my-2" placeholder="preço" />
                    </div>
                    <div className="form-group">
                        <select className="input-product my-2" aria-label="Default select example">
                            <option selected>Selecione uma categoria</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <select className="input-product my-2" aria-label="Default select example">
                            <option selected>Selecione uma sub categoria</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>


                    <div className="form-check form-check-inline my-2">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                            <label className="p-create-product" htmlFor="inlineCheckbox1">P</label>
                    </div>
                    <div className="form-check form-check-inline my-2">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                            <label className="p-create-product" htmlFor="inlineCheckbox2">M</label>
                    </div>
                    <div className="form-check form-check-inline my-2">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                            <label className="p-create-product" htmlFor="inlineCheckbox2">G</label>
                    </div>
                    <div className="form-check form-check-inline my-2">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                            <label className="p-create-product" htmlFor="inlineCheckbox2">GG</label>
                    </div>


                    <div className="mb-3">
                        <label htmlFor="formFileSm" className="p-create-product my-1">Carregue uma imagem para capa do produto</label>
                        <input className="form-control form-control-sm" id="formFileSm" type="file" />
                    </div>
                    <div className="my-2">
                        <label htmlFor="formFileSm" className="p-create-product">Carregue outras duas imagens do produto</label>
                        <input className="form-control form-control-sm" id="formFileSm" type="file" />
                    </div>
                    <div className="my-2">
                        <input className="form-control form-control-sm" id="formFileSm" type="file" />
                    </div>

                    <button type="submit" className="w-100 create-button p-2">Cadastrar</button>
                </form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}