import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import CollapseMenu from '../Collapse-menu/Index';
import './Navbar.css';

import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

interface Props {
    menuHidden: string,
    setMenuHidden: (classe: string) => void,
    setModalLogin: () => void,
    logado: boolean,
    setLogado: (bool: boolean) => void,
    modalAddress: boolean,
    setModalAddress: () => void,
}

export default function Navbar({ menuHidden, setMenuHidden, setModalLogin, logado, setLogado, modalAddress, setModalAddress }: Props) {

    const [open, setOpen] = useState(false);


    useEffect(() => {

        if (localStorage.getItem('user')) {
            setLogado(true);
        } else {
            setLogado(false);
        }

    }, [localStorage.getItem('user')])

    const showOrHiddenMenu = () => {
        if (menuHidden === 'show') {
            setMenuHidden('hidden')
        } else {
            setMenuHidden('show')
        }
    }

    const logout = () => {
        localStorage.setItem('user', '');
        setLogado(false);
    }

    return (
        <>
            <nav className="navbar navbar-expand-sm my-3 p-0">
                <div className="container justify-content-sm-start mx-4">
                    <Link to='/' className="text-decoration-none font d-flex align-items-center">
                        Coisas de mulher
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-handbag-fill" viewBox="0 0 16 16">
                            <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z" />
                        </svg>
                    </Link>
                    <button
                        className='btn-menu'
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-menu-up" viewBox="0 0 16 16">
                            <path d="M7.646 15.854a.5.5 0 0 0 .708 0L10.207 14H14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3.793l1.853 1.854zM1 9V6h14v3H1zm14 1v2a1 1 0 0 1-1 1h-3.793a1 1 0 0 0-.707.293l-1.5 1.5-1.5-1.5A1 1 0 0 0 5.793 13H2a1 1 0 0 1-1-1v-2h14zm0-5H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2zM2 11.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 0-1h-8a.5.5 0 0 0-.5.5zm0-4a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11a.5.5 0 0 0-.5.5zm0-4a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1h-6a.5.5 0 0 0-.5.5z"/>
                        </svg>
                    </button>
                </div>
                <Collapse in={open} >
                    <div className="collapse w-100 mx-3 navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="list-inline font mr-auto my-0 ">
                            {!logado ?
                                <li className="list-inline-item mx-0" onClick={setModalLogin}>
                                    <a className="nav-link d-flex align-items-center items-menu justify-content-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-person mx-2" viewBox="0 0 16 16">
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                        </svg>
                                    </a>
                                </li>
                                : ''}
                            {logado ?
                                <>
                                    <li className="list-inline-item active m-0">
                                        <a className="nav-link d-flex align-items-center items-menu justify-content-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-door mx-2" viewBox="0 0 16 16">
                                                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
                                            </svg>
                                        </a>
                                    </li>
                                    <li className="list-inline-item mx-0" onClick={setModalAddress}>
                                        <a className="nav-link d-flex align-items-center items-menu justify-content-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-geo-alt mx-2" viewBox="0 0 16 16">
                                                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                            </svg>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link to={'/cart'} className="nav-link d-flex align-items-center items-menu justify-content-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart3 mx-2" viewBox="0 0 16 16">
                                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                            </svg>
                                        </Link>
                                    </li>
                                    {localStorage.getItem('adm') ?
                                        <li className="list-inline-item">
                                            <div className="container-flui w-100 d-flex justify-content-center">
                                                <button className="nav-link d-flex align-items-center items-menu justify-content-center border border-white bg-white" onClick={showOrHiddenMenu}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-plus-fill" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </li>
                                        : ''}
                                    <li className="list-inline-item mx-0">
                                        <button className="nav-link btn-link d-flex align-items-center items-menu justify-content-center" onClick={logout}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-right mx-2" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                            </svg>
                                        </button>
                                    </li>
                                </>
                                : ''}
                        </ul>
                    </div>
                </Collapse>
            </nav>
            <Outlet />
        </>
    )
}