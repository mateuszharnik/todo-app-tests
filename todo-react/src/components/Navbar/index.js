import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { signOutUserAction } from '../../store/auth/actions';
import {
  closeMenuAction,
  toggleMenuAction,
  setIsOpenAction,
} from '../../store/navbar/actions';

const navbarMatchMedia = window.matchMedia('(min-width: 601px)');

const createNavbarMatchMedia = (setState, setIsOpen) => (media) => {
  if (media.matches) {
    setIsOpen(false);
  }

  setState({ isDesktop: media.matches });
};

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDesktop: false,
    };

    const { setIsOpen } = this.props;

    this.handleSignOutUser = this.handleSignOutUser.bind(this);
    this.setNavbarMatchMedia = createNavbarMatchMedia(
      this.setState.bind(this),
      setIsOpen,
    );
  }

  componentDidMount() {
    const { history, closeMenu } = this.props;

    this.setState({ isDesktop: window.outerWidth > 600 });

    navbarMatchMedia.addEventListener('change', this.setNavbarMatchMedia);

    this.event = history.listen(() => {
      closeMenu();
    });
  }

  componentWillUnmount() {
    this.event();

    navbarMatchMedia.removeEventListener('change', this.setNavbarMatchMedia);
  }

  handleSignOutUser() {
    const { signOutUser, history } = this.props;

    signOutUser();

    history.push('/zaloguj');
  }

  render() {
    const { isDesktop } = this.state;
    const {
      isOpen, isDisabled, user, toggleMenu,
    } = this.props;

    return (
      <header className="header">
        <div className="user">
          {user.avatar && (
            <img
              src={user.avatar}
              alt="Awatar użytkownika"
              title="Awatar użytkownika"
              className="responsive-img user__img"
            />
          )}
        </div>
        <nav className="nav">
          <button
            className="nav__button"
            type="button"
            title={isOpen ? 'Zamknij menu' : 'Otwórz menu'}
            disabled={isDisabled}
            onClick={toggleMenu}
          >
            <span className="hide">Menu</span>
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
          </button>
          <TransitionGroup component={null}>
            <CSSTransition
              key={isOpen && !isDesktop}
              timeout={400}
              classNames="slide-left"
            >
              <>
                {(isOpen || isDesktop) && (
                  <ul className="navigation">
                    <li className="navigation__item">
                      <Link
                        to="/"
                        title="Przejdź do strony głównej"
                        className="navigation__link"
                      >
                        Strona główna
                      </Link>
                    </li>
                    <li className="navigation__item">
                      <Link
                        to="/ustawienia"
                        title="Przejdź do ustawień konta"
                        className="navigation__link"
                      >
                        Ustawienia
                      </Link>
                    </li>
                    <li className="navigation__item">
                      <button
                        type="button"
                        title="Wyloguj się"
                        className="navigation__link"
                        onClick={this.handleSignOutUser}
                      >
                        Wyloguj
                      </button>
                    </li>
                  </ul>
                )}
              </>
            </CSSTransition>
          </TransitionGroup>
        </nav>
      </header>
    );
  }
}

Navbar.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    listen: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  signOutUser: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ user, navbar }) => ({
  user: user.user,
  isOpen: navbar.isOpen,
  isDisabled: navbar.isDisabled,
});

const mapDispatchToProps = (dispatch) => ({
  signOutUser: () => dispatch(signOutUserAction),
  toggleMenu: () => dispatch(toggleMenuAction()),
  closeMenu: () => dispatch(closeMenuAction()),
  setIsOpen: (isOpen) => dispatch(setIsOpenAction(isOpen)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
