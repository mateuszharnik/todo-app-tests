import React from 'react';
import { Link } from 'react-router-dom';
import image from '../../assets/img/undraw_page_not_found_su7k.svg';

const NotFound = () => (
  <div className="not-found-page">
    <section className="container">
      <div className="row center-align">
        <header className="hide">
          <h2>Strona nie istnieje</h2>
        </header>
        <div className="col s12">
          <img className="not-found-page__image" src={image} alt="Liczba 404" />
        </div>
        <div className="col s12">
          Strona nie istniej. Wróć do
          {' '}
          <Link to="/">strony głównej</Link>
          .
        </div>
      </div>
    </section>
  </div>
);

export default NotFound;
