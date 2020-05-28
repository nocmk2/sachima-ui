import React from 'react'
import Error from './Error'

// Error boundaries currently have to be classes.
class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null };
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error,
            message: error.message
        };
    }
    render() {
        if (this.state.hasError) {
            if (this.state.message === "Request failed with status code 401") {
                return <Error type="401" mes={this.state.message} />
            }
            else {
                return <Error type="basic" mes={this.state.message} />
            }
        }
        return this.props.children;
    }
}

export default ErrorBoundary