import React from 'react';
import { LogoProps, LogoStates } from '../../@types/components/Logo/Logo';

import LogoTextDark from '../../assets/logo-text-dark.svg';
import LogoTextLight from '../../assets/logo-text-light.svg';

class Logo extends React.Component<LogoProps, LogoStates> {
    render() {
        return (
            this.props.color === 'dark' ? (
                <img src={LogoTextDark} alt="Beepy Logo Dark" />
            ) : (
                <img src={LogoTextLight} alt="Beepy Logo Light" />
            )
        );
    }
};

export default Logo;