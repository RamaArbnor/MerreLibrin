// a react page called Home
import '../App.css';
import ReactTyped from "react-typed";
import React, { useState } from "react";

import Dhuro from "../components/Dhuro.js";

export default function Home() {
    const headlines = ["MerrLibrin", "Listo Librat Qe Deshiron Ti Dhurosh", "Gezo Nje Femije Me Librat Tuaj", "Ndihmoje Nje Prinder"]
    const [state, setState] = useState('dhuro');
    return (
        <div className="home">
            {/* nav bar with options */}
            <nav className="navbar navbar-expand-lg navbar-light color-white d-flex justify-content-center">
                <a className="navbar-brand p-3 mb-2 text-white" href="#" onClick={() => setState('dhuro')}>Dhuro</a>
                <a className="navbar-brand p-3 mb-2 text-white" href="#" onClick={() => setState('kerko')}>Kerko</a>
                <a className="navbar-brand p-3 mb-2 text-white" href="#" onClick={() => setState('librat')}>Librat</a>
            </nav>
            {state == 'dhuro' && <Dhuro/>}

            {state == 'main' && <main className=" container">
                {/* some text describing the webapp  */}
                <div className="heading-container">

                    <h1 className=" text-center text-white mb-5" id="heading">MerrLibrin</h1>
                    {/* <p className=" text-center text-white mb-5 " id="headline">Listo Librat Qe Deshiron Ti Dhurosh</p> */}

                    <ReactTyped
                        className=" text-center text-white mb-5 "
                        id="headline"
                        strings={headlines}
                        typeSpeed={40}
                        backSpeed={50}
                        loop
                    />
                </div>
            

                
                <div className="container d-flex justify-content-center ">
                    <div className="card d-flex justify-content-center ">
                                <div className="card-body">
                                    <h5 className="card-title">Kerko</h5>
                                    <p className="card-text">Kerko Librin Qe Te Mungon.</p>
                                    <a href="#" className="btn btn-primary">Kerko</a>
                                    </div>
                            </div>
                        <div className="card d-flex justify-content-center">
                            <div className="card-body">
                                <h5 className="card-title">Dhuro</h5>
                                <p className="card-text">Dhuro Librat per Dikon Ne Nevoj.</p>
                                <a href="#" className="btn btn-primary">Dhuro</a>

                            </div>
                        </div>
                </div>  

            </main>}
        </div>
    );
    }
