import React from 'react';
import Alert from 'react-bootstrap/Alert'

const AlertMessage = ({ info }) => {
	return info === null ? null : (
		<Alert variant={info.type}>{info.msg}</Alert>
	)
}

export default AlertMessage
