type Props = {
    size?: string,
    className?: string,
}

const LogoSVG = ({ size = "50px", className = "" }: Props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 95 95"
            width={size}
            height={size}
            className={`animate-[spin_2s_linear_infinite_reverse] ${className}`}>
            <path
                fill="url(#radial_gradient_vortexa)"
                d="M47.5 58.5C32.586 65.9 14.812 65.6 0 57.4c1.124 5 2.962 9.7 5.516 13.9 3.575 6 10.828 9.1 17.672 7.5 3.269-.7 6.436-2 9.5-3.7C39.43 71.3 44.64 65.5 47.5 58.5z"
            ></path>
            <path
                fill="url(#radial_gradient_vortexa)"
                d="M62.516 2.3C57.817.8 52.71 0 47.5 0h-.102c-7.15 0-13.382 4.6-15.527 11.2-.92 3.1-1.532 6.4-1.532 9.9 0 7.7 2.656 15 7.355 20.9.919-16.3 10.112-31.2 24.822-39.7z"
            ></path>
            <path
                fill="url(#radial_gradient_vortexa)"
                d="M32.484 92.7C37.183 94.2 42.29 95 47.5 95h.102c7.15 0 13.382-4.6 15.527-11.2.92-3.1 1.532-6.4 1.532-9.9 0-7.7-2.656-15-7.355-20.9-.919 16.3-10.112 31.2-24.822 39.7z"
            ></path>
            <path
                fill="url(#radial_gradient_vortexa)"
                d="M79.473 46.2c-6.844-3.8-14.607-5.3-22.166-4.2C71.3 50.9 79.983 66.1 80.085 82.8c3.78-3.3 7.048-7.2 9.602-11.5 3.575-6 2.758-13.7-2.145-18.8-2.35-2.5-5.005-4.6-8.07-6.3z"
            ></path>
            <path
                fill="url(#radial_gradient_vortexa)"
                d="M47.5 36.5c14.914-7.4 32.688-7.1 47.5 1.1-1.124-5-2.962-9.7-5.516-13.9-3.575-6-10.828-9.1-17.672-7.5-3.269.7-6.436 2-9.5 3.7C55.57 23.7 50.36 29.5 47.5 36.5z"
            ></path>
            <path
                fill="url(#radial_gradient_vortexa)"
                d="M15.527 48.8c6.844 3.8 14.607 5.3 22.167 4.2-13.995-8.9-22.678-24.1-22.78-40.8-3.78 3.3-7.048 7.2-9.602 11.6-3.575 6-2.758 13.7 2.145 18.8 2.35 2.4 5.005 4.5 8.07 6.2z"
            ></path>
            <path
                fill="url(#radial_gradient_vortexa)"
                d="M47.5 54.2c3.78 0 6.844-3 6.844-6.7s-3.064-6.7-6.844-6.7c-3.78 0-6.844 3-6.844 6.7s3.064 6.7 6.844 6.7z"
            ></path>
            <defs>
                <radialGradient
                    id="radial_gradient_vortexa"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientTransform="matrix(-2.55381 55.00004 -54.99505 -2.55358 47.5 47.5)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#00B0FF"></stop>
                    <stop offset="1" stopColor="#0066FF"></stop>
                </radialGradient>
            </defs>
        </svg>
    )
}

export default LogoSVG