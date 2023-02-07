import React from 'react';
import { LogoProps, LogoStates } from '../../@types/components/Logo/Logo';
import Logo from '../Logo/Logo';

class AuthLogo extends React.Component<LogoProps, LogoStates> {
    render() {
        return (
            <a href={process.env.REACT_APP_ENV === 'production' ? process.env.REACT_APP_PROD_BASE : process.env.REACT_APP_DEV_BASE} className="p-4">
                <Logo color={this.props.color} />
            </a>
        );
    }
};

export default AuthLogo;