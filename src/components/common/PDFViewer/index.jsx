import React, { useState } from 'react';

const PDFViewer = ({
    pdfUrl,
    height = '600px',
    showToolbar = true,
    showDownloadLink = true,
    className = ''
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        setIsLoading(false);
        setHasError(false);
    };

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    const toolbarParams = showToolbar ? '#toolbar=1&navpanes=1&scrollbar=1' : '#toolbar=0';
    const fullUrl = `${pdfUrl}${toolbarParams}`;

    if (!pdfUrl) {
        return (
            <div className={`pdf-viewer-container ${className}`} style={{ height }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                    <div className="text-center">
                        <i className="fa fa-file-pdf fa-3x text-muted mb-3"></i>
                        <p className="text-muted">No PDF document available</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`pdf-viewer-container ${className}`} style={{ height }}>
            {isLoading && (
                <div className="d-flex align-items-center justify-content-center h-100">
                    <div className="text-center">
                        <div className="spinner-border text-primary mb-3" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <p className="text-muted">Loading PDF...</p>
                    </div>
                </div>
            )}

            {hasError ? (
                <div className="d-flex align-items-center justify-content-center h-100">
                    <div className="text-center">
                        <i className="fa fa-exclamation-triangle fa-3x text-warning mb-3"></i>
                        <p className="text-muted mb-3">Unable to load PDF document</p>
                        {showDownloadLink && (
                            <a
                                href={pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                <i className="fa fa-download me-2"></i>
                                Download PDF
                            </a>
                        )}
                    </div>
                </div>
            ) : (
                <iframe
                    src={fullUrl}
                    width="100%"
                    height="100%"
                    style={{
                        border: 'none',
                        borderRadius: '5px',
                        display: isLoading ? 'none' : 'block'
                    }}
                    title="PDF Document"
                    onLoad={handleLoad}
                    onError={handleError}
                >
                    <p>
                        Your browser does not support PDFs.{' '}
                        <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                            Download the PDF
                        </a>
                    </p>
                </iframe>
            )}

            {showDownloadLink && !hasError && !isLoading && (
                <div className="pdf-actions mt-2 text-end">
                    <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-primary"
                    >
                        <i className="fa fa-external-link me-1"></i>
                        Open in New Tab
                    </a>
                </div>
            )}
        </div>
    );
};

export default PDFViewer;
