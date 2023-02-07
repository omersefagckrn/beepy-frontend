import React from 'react';
import Dropzone from 'react-dropzone';

import { UploadLogoProps, UploadLogoStates } from '../../@types/components/UploadLogo/UploadLogo';
import Button from '../Elements/Button';

import { ReactComponent as UploadImageLogo } from '../../assets/uploadLogo.svg';

class UploadLogo extends React.Component<UploadLogoProps, UploadLogoStates> {
	state: UploadLogoStates = {
		files: []
	};

	handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	onSubmit = (files: (File & { preview: string })[]) => {
		this.props.onSubmit(files[0]);
		this.setState({ files: [] });
	};

	render() {
		const { files } = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<div className='flex items-start justify-start mt-2 sm:mt-0 mb-4 select-none'>
					{files.length === 0 ? (
						<Dropzone
							accept='image/jpg, image/jpeg, image/png'
							multiple={false}
							onDrop={(acceptedFiles) => {
								this.setState({
									files: acceptedFiles.map((file) =>
										Object.assign(file, {
											preview: URL.createObjectURL(file)
										})
									)
								});
							}}>
							{({ getRootProps, getInputProps }) => (
								<div {...getRootProps({ className: 'dropzone' })} className='w-[20rem] max-h-auto flex cursor-pointer flex-col items-center justify-center space-y-4 rounded-lg border-[1.5px] gray-400 p-6 text-center transition-colors hover:border-yellow-500'>
									<input {...getInputProps()} />
									<div className='rounded-full bg-gray-100 p-2'>
										<div className='rounded-full bg-gray-200 p-2'>
											<UploadImageLogo />
										</div>
									</div>
									<div className='font-medium text-gray-500'>
										<div className='text-sm'>
											<span className='select-none text-sm text-indigo-600'>Click to upload</span> or drag and drop
										</div>
										<div className='text-xs'>JPG, JPEG, PNG allowed (Maximum: 512x512, Minimum: 128x128)</div>
									</div>
								</div>
							)}
						</Dropzone>
					) : (
						<>
							{files.map((file) => (
								<div className='rounded-lg border-[3px] gray-400 space-y-4 transition-colors hover:border-yellow-500' key={file.name}>
									<img className='w-[20rem] rounded-lg' src={file.preview} alt={''} />
								</div>
							))}
						</>
					)}
				</div>
				<div className='mt-2 mb-2 sm:flex sm:flex-row flex-col items-center justify-center'>
					{files.length > 0 && this.props.buttonActive && (
						<>
							<Button onClick={() => this.onSubmit(this.state.files)} type='button' name='Upload Image' className='w-36 text-white p-2' />
							<Button onClick={() => this.setState({ files: [] })} className='w-36 text-white p-2 sm:ml-2 sm:mt-0 mt-2' type='button' name='Discard' color='bg-red-600' />
						</>
					)}
				</div>
			</form>
		);
	}
}
export default UploadLogo;
