import React, { Component } from "react";
import PricingComponent from "./pricing-component";
import bgbottom from "../../assets/bg-bottom.svg";
import bgtop from "../../assets/bg-top.svg";
import logo_ips from "../../assets/logo_ips.jpg";
import { Link } from 'react-router-dom'

import "./pricing.css";

class PricingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMontlyActive: false
    };
  }
  togglePricing = () => {
    this.setState({
      isMontlyActive: !this.state.isMontlyActive
    });
  };
  render() {
    return (
      <div className="pricing-container">
        <img src={bgtop} alt="" />
        <img src={bgbottom} alt="" />

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Veja nossas tarifas
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Expositores Empresariais e Instituições Estatais não pagam.
            </p>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Participantes por apenas 1000 Kz.
            </p>
          </div>
        </div>

        <div className="pricing-body">
          <p className="mt-10 text-lg text-emerald-600 font-semibold">
            Oradores
          </p>
          <div className="toggle-row">
            <p>Docente</p>
            <div className="toggle-container">
              <input
                className="toggle-switch"
                type="checkbox"
                id="switch"
                name="switch"
                onClick={this.togglePricing}
              />
            </div>
            <p>Estudante</p>
          </div>
          <label className="pricing-card-container" htmlFor="switch">
            <PricingComponent
              pricingHeader="Presencial"
              priceAnnually="10.000"
              priceMonthly="5.000"
              isMonthlyActive={this.state.isMontlyActive}
            />
            <PricingComponent
              pricingHeader="Remota"
              priceAnnually="5.000"
              priceMonthly="5.000"
              isMonthlyActive={this.state.isMontlyActive}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default PricingContainer;
