import { toast } from 'react-toastify';
import { Toast } from 'react-toastify/dist/types';
import Alert from '../components/Alert/Alert';
import AlertClose from '../components/Alert/AlertClose';

const fire = ({ message, error, type }: { message: string; error: boolean; type?: Toast['props']['type'] }) => {
	toast(<Alert title={error ? 'Error!' : 'Success!'} message={message} type={!type ? (error ? toast.TYPE.ERROR : toast.TYPE.SUCCESS) : type} />, {
		position: toast.POSITION.TOP_RIGHT,
		autoClose: 5000,
		draggable: false,
		hideProgressBar: true,
		closeButton: <AlertClose />
	});
};

export { fire };
