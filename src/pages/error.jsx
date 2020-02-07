import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

@connect(mapStateToProps)
export default class ErrorPage extends React.Component {
	render() {
		const {errorCode, errorText} = this.props;
		return (
			<div className='error_page flex-column'>
				<div className='error_page_code'>
					{errorCode || '404'} Error
				</div>
				<div className='error_page_message'>
					{errorText || 'Oops! Page not found!'}
				</div>
			</div>
		);
	}
}
