import './ModalCategory.css';
import Modal from 'react-bootstrap/Modal';

interface Props {
    modalCategory: boolean,
    setModalCategory: () => void,
}

export default function ModalCategory({ modalCategory, setModalCategory }: Props) {

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
                        <form action="" className="form-group">
                            <input type="text" className="input-border w-100" placeholder="Categoria" />
                            <input type="file" className='form-control mb-2' />
                            <input type="file" className='form-control mb-2' />
                            <button className='w-100 my-2 button-category'>cadastrar</button>
                        </form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>


    )

}