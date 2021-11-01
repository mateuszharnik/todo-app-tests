import React from 'react';
import { Link } from 'react-router-dom';
import {
  StyledNotFound,
  StyledNotFoundImage,
} from '../../styles/NotFound';
import image from '../../assets/img/undraw_page_not_found_su7k.svg';

const NotFound = () => (
  <StyledNotFound>
    <section className="container">
      <div className="row center-align">
        <header className="hide">
          <h2>Strona nie istnieje</h2>
        </header>
        <div className="col s12">
          <StyledNotFoundImage
            src={image}
            alt="Liczba 404"
          />
        </div>
        <div className="col s12">
          Strona nie istniej. Wróć do
          {' '}
          <Link to="/">strony głównej</Link>
          .
        </div>
      </div>
    </section>
  </StyledNotFound>
);

export default NotFound;
