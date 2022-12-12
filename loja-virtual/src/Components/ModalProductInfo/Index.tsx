import './ModalProductInfo.css';
import Modal from 'react-bootstrap/Modal';
import Products from '../../Inteface/Product';
import Carousel from 'react-bootstrap/Carousel';

interface Props {
    modalProductInfo: boolean,
    setModalProductInfo: () => void,
    productInfo: Products | undefined,
    urlImage: string,
}

export default function ModalProductInfo({ modalProductInfo, setModalProductInfo, productInfo, urlImage }: Props) {

    return (
        <Modal
            show={modalProductInfo}
            aria-labelledby="contained-modal-title-vcenter"
            size='xl'
            centered

        >
            <Modal.Header closeButton onHide={setModalProductInfo} className='border border-white'>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h5 className='color'>{productInfo?.name}</h5>
                </Modal.Title>
            </Modal.Header >
            <Modal.Body className='p-0'>
                <div className="row m-0">
                    <div className="col-12 col-lg-7 col-md-6 col-sm-6">
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block img-fluid"
                                    src={urlImage + productInfo?.imageOne}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block img-fluid"
                                    src={urlImage + productInfo?.imageTwo}
                                    alt="Second slide"

                                />

                            </Carousel.Item>
                            {productInfo?.imageThree ? <Carousel.Item> <img className="d-block w-100" src={urlImage + productInfo?.imageThree} alt="Third slide" /></Carousel.Item> : ''}
                        </Carousel>
                    </div>

                    <div className="col-12 col-lg-5 col-md-6 col-sm-6 d-flex justify-content-center align-items-center">
                        <div className="info d-flex justify-content-center align-self-center my-3">
                            <div className="container">
                                <h5 className='color'>R$ {productInfo?.price}</h5>
                                <div className="container d-flex align-items-center p-0 my-2">
                                    <p className="text-muted d-flex mb-2">Preço</p>
                                    <p className="color h5 mx-2 border rounded-circle py-0 px-2">P</p>
                                    <p className="color h5 mx-2 border rounded-circle py-0 px-2">M</p>
                                    <p className="color h5 mx-2 border rounded-circle py-0 px-2">G</p>
                                </div>
                                <div className="container p-0 my-3 border border-muted p-2">
                                    <p className="h6 color">Calcule o frete e o prazo</p>
                                    <form action="">
                                        <input type="text" className='input-border mb-2 w-100' placeholder='Digite seu cep' />
                                        <button className='btn-calcular'>Calcular</button>
                                    </form>
                                </div>
                                <div className="container p-0 my-4 d-flex justify-content-center">
                                    <button className='w-100 btn-cart d-flex justify-content-center align-items-center'>
                                        Adicionar ao carrinho
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-cart-plus mx-1" viewBox="0 0 16 16">
                                            <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}