import React from 'react'
// import bgbottom from "../assets/bg-bottom.svg";
import logo_jornadas_2 from "../assets/logo_jornadas_2.jpg";
import bgtop from "../assets/bg-top.svg";
import logo_ips from "../assets/logo_ips.jpg";
import logo_ulam from "../assets/logo_ulam.svg";
import { Link } from "react-router-dom";

import "./wellcome.css";

const Wellcome = () => {
  return (
    <div className="wellcome-container">
      {/* <img src={bgtop} alt="" className="" />
      <img src={bgbottom} alt="" className="" /> */}

      <div
        className="min-h-screen"
        style={{
          backgroundImage: `url(${bgtop})`,
        }}
      >
        <div className="items-center">
          <img
            src={logo_ulam}
            alt=""
            className="h-40 w-40 object-center object-fill rounded-full"
          />

          <img
            src={logo_ips}
            alt=""
            className="h-40 w-40 object-center object-fill rounded-full"
          />

          <img
            src={logo_jornadas_2}
            alt=""
            className="h-40 w-40 object-center object-fill rounded-full"
          />
        </div>

    

        <div className="hero-content text-center">
          <div className="mt-1 max-w-lg">
            <h1 className="mb-2 text-5xl font-bold">
              IIas Jornadas Científicas do Instituto Politécnico de Saurimo
            </h1>
            <p className="mb-5">
              Participe no evento de dois dias (27 e 28 de Junho de 2024), conheça e apoie o nosso trabalho
              científico.
            </p>
            <div className="mt-2 flex space-x-10">
              <Link to="/register" className="btn btn-primary">
                Registo
              </Link>

              <span className="mt-4">
                Você já tem uma conta?{" "}
                <Link className="link link-primary" to="/login">
                  Conecte-se
                </Link>
              </span>

              <Link to="/pricing" className="btn btn-primary">
                Tarifas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wellcome