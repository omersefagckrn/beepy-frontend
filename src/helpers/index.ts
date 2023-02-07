import ApiHelper from './api';
import * as auth from './auth';
import * as alert from './alert';
import * as sidepane from './sidepane';
import * as router from './router';
import * as modal from './modal';

import ChannelsHelper from './channels';
import PaymentHelper from './payment';

const api = new ApiHelper();
const channels = new ChannelsHelper();
const payment = new PaymentHelper();

export { api, auth, alert, sidepane, router, modal, channels, payment };
