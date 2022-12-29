import './ModalProductInfo.css';
import Modal from 'react-bootstrap/Modal';
import Products from '../../Inteface/Product';
import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from 'react';
import http from '../../http/http';
import Size from '../../Inteface/Size';

interface Props {
    modalProductInfo: boolean,
    setModalProductInfo: () => void,
    productInfo: Products | undefined,
    urlImage: string,
}

export default function ModalProductInfo({ modalProductInfo, setModalProductInfo, productInfo, urlImage }: Props) {

    const [sizes, setSizes] = useState<Size[]>([]);
    const [cep, setCep] = useState<string>('');
    const [priceFrete, setPriceFrete] = useState<string>('');
    const [sizeSelected, setSizeSelected] = useState<Size | undefined>();
    const [sizeSelect, setSizeSelect] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [create, setCreate] = useState<string>('');


    useEffect(() => {

        if(productInfo) {
            http.get('getSizeThisProduct/'+productInfo.id).then((response) => {
                setSizes([...response.data])
            });
        }

    }, [productInfo])

    const calc = () => {


        let args = {
            sCepOrigem: '01153 000',
            sCepDestino: cep,
            nVlPeso: '1',
            nCdFormato: '1',
            nVlComprimento: '20',
            nVlAltura: '20',
            nVlLargura: '20',
            nVlDiametro: '0',
            nCdServico: '04014',
            nCdEmpresa: '',
            sDsSenha: '',
            sCdMaoPropria: 'n',
            nVlValorDeclarado: '0',
            sCdAvisoRecebimento: 'n',
            StrRetorno: 'xml',
            nIndicaCalculo: '3',
        };

          http.post('getPriceCor', {args}).then((response) => {
            setPriceFrete(response.data.cServico.Valor)
          })

    }

    const closeModal = () => {
        setCep('')
        setPriceFrete('');
        setModalProductInfo();
        setCreate('')
        setError('')
    }

    const changeClassAddSize = (size: Size) => {

        if(sizeSelect === ''){
            setSizeSelect(size.size);
            setError('')
        }

        if(sizeSelect === size.size) { // se for igual e porque esta marcando o mesmo tamanho então apenas remove a classe onClicked

            var element = document.getElementById(size.size);

            if(element?.className){
                element.className = 'color h5 mx-2 border rounded-circle py-0 px-2'; 
            }
    
            setSizeSelected(undefined);
            setSizeSelect('');
            setError('Você precisa adicionar um tamanho')
        } else {

            // pegue a o tamanho que ja esta marcado e desmarque
            var elementSelected= document.getElementById(sizeSelect);

            if(elementSelected?.className){
                elementSelected.className = 'color h5 mx-2 border rounded-circle py-0 px-2'; 
            }

            var element = document.getElementById(size.size);

            if(element?.className){
                element.className = 'onClickedSize h5 mx-2 border rounded-circle py-0 px-2'; 
            }

            setSizeSelected(size);
            setSizeSelect(size.size);
            

        }


    }

    const adcProductToCart = () => {

        if(localStorage.getItem('user')) {
            if(sizeSelected) {
                const userId = localStorage.getItem('user');
                http.post('addToCart', {productInfo, sizeSelected, userId}).then((response) => {
                    if(response.data === false) {
                        setCreate('')
                        setError('Você já possui esse produto no seu carrinho');
                    } else {
                        setError('');
                        console.log(response.data)
                        setCreate('Produto adicionar no carrinho')    
                    }
                    
                })
    
            } else {
    
                setError('Selecione um tamanho');
    
            }    
        } else {
            setError('Você precisa efetuar login antes de adicionar um produto ao carrinho')
        }

    }

    return (
        <Modal
            show={modalProductInfo}
            aria-labelledby="contained-modal-title-vcenter"
            size='xl'
            centered

        >
            <Modal.Header closeButton onHide={closeModal} className='border border-white'>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h5 className='color'>{productInfo?.name}</h5>
                </Modal.Title>
            </Modal.Header >
            <Modal.Body className='p-0'>
                <div className="row m-0 justify-content-center">
                    <div className="col-8 col-lg-5 col-md-6 col-sm-6">
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
                            {productInfo?.imageThree ? <Carousel.Item> <img className="d-block img-fluid" src={urlImage + productInfo?.imageThree} alt="Third slide" /></Carousel.Item> : ''}
                        </Carousel>
                    </div>

                    <div className="col-12 col-lg-5 col-md-6 col-sm-6 d-flex justify-content-center align-items-center">
                        <div className="info d-flex justify-content-center align-self-center my-3">
                            <div className="container">
                                <h5 className='color'>R$ {productInfo?.price}</h5>
                                <div className="container p-0 my-3 border border-muted p-2">
                                    <p className="h6 color">Calcule o frete e o prazo</p>
                                    <form action="">
                                        <input type="text" className='input-border mb-2 w-100' value={cep} onChange={(value) => setCep(value.target.value)} placeholder='Digite seu cep' />
                                        <button type='button' className='btn-calcular' onClick={calc}>Calcular</button>

                                        <p className="m-0 mt-2 text-center text-danger">{priceFrete ? 'R$ '+priceFrete : ''}</p>
                         
                                    </form>
                                </div>
                                <div className="container d-flex align-items-center p-0 my-2">
                                    <p className="text-muted d-flex mb-2">Tamanhos</p>
                                    {sizes.map((size) => {
                                        return (
                                            <p key={size.id} className='color h5 mx-2 border hover rounded-circle py-0 px-2' id={size.size} onClick={() => changeClassAddSize(size)} >{size.size}</p>        
                                        )
                                    })}
                                </div>
                                <p className="m-0 text-danger">{error}</p>
                                <p className="m-0 text-success">{create}</p>
                                <div className="container p-0 my-4 d-flex justify-content-center">
                                    <button className='w-100 btn-cart d-flex justify-content-center align-items-center' onClick={adcProductToCart}>
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