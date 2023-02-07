import visa from '../assets/payment/visa.svg';
import mastercard from '../assets/payment/mastercard.svg';
import amex from '../assets/payment/amex.svg';
import diners from '../assets/payment/diners.svg';
import discover from '../assets/payment/discover.svg';
import jcb from '../assets/payment/jcb.svg';
import unionpay from '../assets/payment/unionpay.svg';

const brandNames = {
	visa: 'Visa',
	mastercard: 'MasterCard',
	amex: 'American Express',
	discover: 'Discover',
	diners: 'Diners Club',
	jcb: 'JCB',
	unionpay: 'UnionPay',
	cartes_bancaires: 'Carte Bancaire'
};

const brandIcons = [
	{
		name: 'visa',
		icon: visa
	},
	{
		name: 'mastercard',
		icon: mastercard
	},
	{
		name: 'amex',
		icon: amex
	},
	{
		name: 'discover',
		icon: discover
	},
	{
		name: 'diners',
		icon: diners
	},
	{ name: 'jcb', icon: jcb },
	{ name: 'unionpay', icon: unionpay },
	{ name: 'cartes_bancaires', icon: unionpay }
];

class PaymentHelper {
	getBrandName(brand: 'visa' | 'mastercard' | 'amex' | 'discover' | 'diners' | 'jcb' | 'unionpay' | 'cartes_bancaires') {
		return brandNames[brand];
	}

	getBrandIcon(brand: 'visa' | 'mastercard' | 'amex' | 'discover' | 'diners' | 'jcb' | 'unionpay' | 'cartes_bancaires') {
		return brandIcons.find((icon) => icon.name === brand)?.icon;
	}
}

export default PaymentHelper;
