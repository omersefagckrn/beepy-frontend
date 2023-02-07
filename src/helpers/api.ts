import React from 'react';
import { v4 } from 'uuid';
import { auth } from '.';

export default class ApiHelper {
	constructor() {
		this.headerBuilder = this.headerBuilder.bind(this);
		this.endpointBuilder = this.endpointBuilder.bind(this);
		this.responseHandler = this.responseHandler.bind(this);
		this.request = this.request.bind(this);
	}

	headerBuilder(headers?: object, disableContentType?: boolean) {
		const deviceId = auth.getDeviceId() ?? v4();
		auth.setDeviceId(deviceId);

		const defaultHeaders = {
			'Content-Type': 'application/json',
			'X-OS': 'WEB',
			'X-OS-VERSION': React.version,
			'X-APP-VERSION': (process.env.REACT_APP_VERSION ?? '1.0.0') + '-' + (process.env.REACT_APP_ENV ?? 'n/a'),
			'X-DEVICE-ID': deviceId,
			'X-TOKEN': auth.getToken() ?? ''
		};

		// @ts-ignore
		if (disableContentType) delete defaultHeaders['Content-Type'];

		return { ...defaultHeaders, ...(headers ?? {}) };
	}

	endpointBuilder(endpoint: string) {
		return `${process.env.REACT_APP_ENV === 'production' ? process.env.REACT_APP_PROD_API_BASE : process.env.REACT_APP_DEV_API_BASE}${endpoint}`;
	}

	async responseHandler(response: Response) {
		if (response.ok) return { ok: response.ok, status: response.status, data: await response.json() };
		else return { ok: response.ok, status: response.status, data: (await response.json()) as { code: number | null; message: string | 'Something went wrong: Unknown error!'; requirement: string | null } };
	}

	async request({ method, endpoint, body, headers }: { method: string; endpoint: string; body?: object; headers?: object }) {
		const requestOpt: RequestInit = {
			method,
			headers: this.headerBuilder(headers),
			body: body ? JSON.stringify(body) : undefined
		};

		return await this.responseHandler(await fetch(this.endpointBuilder(endpoint), requestOpt));
	}

	async get({ endpoint, headers }: { endpoint: string; headers?: object }) {
		return await this.request({
			method: 'GET',
			endpoint,
			headers
		});
	}

	async post({ endpoint, body, headers }: { endpoint: string; body?: object; headers?: object }) {
		return await this.request({
			method: 'POST',
			endpoint,
			body,
			headers
		});
	}

	async upload({ endpoint, body, file, headers }: { endpoint: string; body?: object; file: { name: string; file: File }; headers?: object }) {
		const form = new FormData();

		// @ts-ignore
		if (body) Object.keys(body).forEach((key) => form.append(key, body[key]));

		form.append(file.name, file.file);

		const requestOpt: RequestInit = {
			method: 'POST',
			headers: this.headerBuilder(headers, true),
			body: form
		};

		return await this.responseHandler(await fetch(this.endpointBuilder(endpoint), requestOpt));
	}
}
