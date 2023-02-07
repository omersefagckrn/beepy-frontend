import { Component } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const withLocation = (CurrentComponent: typeof Component) => {
	return (props: JSX.IntrinsicAttributes) => <CurrentComponent {...props} location={useLocation()} />;
};

export const withNavigate = (CurrentComponent: typeof Component) => {
	return (props: JSX.IntrinsicAttributes) => <CurrentComponent {...props} navigate={useNavigate()} />;
};

export const withParams = (CurrentComponent: typeof Component) => {
	return (props: JSX.IntrinsicAttributes) => <CurrentComponent {...props} params={useParams()} />;
};

export const withRouter = (CurrentComponent: typeof Component) => {
	return (props: JSX.IntrinsicAttributes) => <CurrentComponent {...props} location={useLocation()} navigate={useNavigate()} params={useParams()} />;
};
