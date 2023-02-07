import React from 'react';

import { ReactComponent as CloseAlert } from '../../assets/x.svg';

class AlertClose extends React.Component<any> {
    
    render() {
        return <div onClick={this.props.closeToast} className='select-none p-3 cursor-pointer'>
            <CloseAlert />
        </div>
    }
}

export default AlertClose;