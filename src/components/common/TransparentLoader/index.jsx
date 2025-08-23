import React from 'react'

const TransparentLoader = ({ isVisible = false }) => {
    return (
        <div
            id="cover-spin"
            style={{
                display: isVisible ? 'block' : 'none'
            }}
        ></div>
    )
}

export default TransparentLoader;