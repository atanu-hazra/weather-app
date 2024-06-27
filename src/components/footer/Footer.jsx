import React from 'react'

function Footer() {
    return (
        <div className="flex gap-4 md:gap-5 justify-center items-center mt-16 mb-5">
            <div>
                <a href="https://github.com/imatanu108" target="_blank" rel="noopener noreferrer">
                    <img src="/github.svg" alt="" width={25} />
                </a>
            </div>
            <div>
                <a href="https://linkedin.com/in/imatanu" target="_blank" rel="noopener noreferrer">
                    <img src="/linkedin.svg" alt="" width={27} />
                </a>
            </div>

        </div>
    )
}

export default Footer