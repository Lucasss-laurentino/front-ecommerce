import './Footer.css';

export default function Footer() {
    return (
        <footer className="text-center background-footer text-lg-start bottom-fixed">
            <section className="">
                <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-4 col-lg-4 col-xl-3 mx-auto mb-4 pt-4">
                            <h4 className="text-white">Política & termos</h4>
                            <p>
                                <a href="" className="text-white text-decoration-underline">Política de privacidade</a>
                            </p>
                            <p>
                                <a href="" className="text-white text-decoration-underline">Termos de uso</a>
                            </p>
                        </div>
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 pt-4">
                            <h4 className="text-white">Contato</h4>
                            <p className='text-white'>
                                contato@coisasdemulher.com
                            </p>
                        </div>
                    </div>
                </div>
                <p className='text-center m-0 text-white'>© 2022 Copyright: coisasdemulher.com</p>
            </section>
    </footer>

    )
}