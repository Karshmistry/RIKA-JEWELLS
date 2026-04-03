import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '4rem 2rem', 
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{ color: '#dc2626', marginBottom: '1rem' }}>
            ⚠️ Something went wrong
          </h2>
          <p style={{ marginBottom: '2rem', color: '#666' }}>
            An error occurred while loading this page. Please try refreshing.
          </p>
          
          <details style={{ 
            background: '#f5f5f5',
            padding: '1rem',
            borderRadius: '5px',
            textAlign: 'left',
            cursor: 'pointer'
          }}>
            <summary style={{ fontWeight: 'bold', color: '#333' }}>
              Click for technical details
            </summary>
            <div style={{ marginTop: '1rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>
              <strong>Error:</strong> {this.state.error && this.state.error.toString()}
              <br /><br />
              <strong>Stack trace:</strong>
              <pre style={{ 
                background: '#1a1a1a', 
                color: '#fff', 
                padding: '1rem',
                borderRadius: '5px',
                overflow: 'auto',
                marginTop: '0.5rem'
              }}>
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </div>
          </details>
          
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '2rem',
              padding: '0.8rem 1.5rem',
              background: '#1a1a1a',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;