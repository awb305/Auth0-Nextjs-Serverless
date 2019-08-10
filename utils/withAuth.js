import { Component } from 'react';
import cookie from 'js-cookie';
import fetch from 'isomorphic-fetch';
import Router from 'next/router';

export const logout = () => {
  cookie.remove('token');
  window.localStorage.setItem('logout', Date.now());
  Router.push('/logout');
};

// Gets the display name of a JSX component for dev tools
const getDisplayName = wrappedComponent =>
  wrappedComponent.displayName || wrappedComponent.name || 'wrappedComponent';

export const withAuth = WrappedComponent =>
  class extends Component {
    static displayName = `withAuth(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx) {
      const { req, res } = ctx;

      // get the initial props as defined in the page
      let componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      componentProps = componentProps || {};

      // On client side find user in __NEXT_DATA__
      if (!req) {
        const { pageProps } = window.__NEXT_DATA__.props;
        if ('user' in pageProps) {
          componentProps.user = pageProps.user;
          return { ...componentProps };
        }
        return { ...componentProps };
      }
      // determine the protocol for local vs production
      let protocol = 'https:';
      const host = req
        ? req.headers['x-forwarded-host']
        : window.location.hostname;
      if (host.indexOf('localhost') > -1) {
        protocol = 'http:';
      }

      // if on server side mimic the client making the request by using req headers
      let options;
      if (typeof res !== 'undefined') {
        options = { credentials: 'same-origin' };
        options.headers = req.headers;
      }

      const userData = await fetch(`${protocol}//${host}/user`, options);

      // place user in component props
      const userJson = await userData.json();
      const { user } = userJson;
      componentProps.user = user;

      return { ...componentProps };
    }

    // event listen across tabs to sync logout
    componentDidMount() {
      window.addEventListener('storage', this.syncLogout);
    }

    componentWillUnmount() {
      window.removeEventListener('storage', this.syncLogout);
      window.localStorage.removeItem('logout');
    }

    // eslint-disable-next-line class-methods-use-this
    syncLogout(event) {
      if (event.key === 'logout') {
        console.log('logged out from storage!');
        Router.push('/logout');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
