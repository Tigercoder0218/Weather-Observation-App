type Props = {
    width?: string,
    height?: string,
    className?: string,
}

const CloudSVG = ({ width = "169", height = "120", className = "" }: Props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 169 120"
            width={width}
            height={height}
            className={className}>
            <path
                fill="url(#paint0_linear_633_61)"
                stroke="url(#paint1_linear_633_61)"
                strokeWidth="3"
                d="M31.914 42.3l.908-.188.236-.897C39.094 18.341 59.79 1.5 84.375 1.5c27.794 0 50.616 21.525 52.907 48.952l.099 1.196 1.19.165C154.762 54.052 167.25 68.05 167.25 85c0 18.512-14.894 33.5-33.243 33.5H39.706C18.616 118.5 1.5 101.273 1.5 80c0-18.579 13.057-34.076 30.414-37.7z"
            ></path>
            <defs>
                <linearGradient
                    id="paint0_linear_633_61"
                    x1="0"
                    x2="172.363"
                    y1="0"
                    y2="114.565"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#fff" stopOpacity="0.9"></stop>
                    <stop offset="1" stopColor="#fff" stopOpacity="0.4"></stop>
                </linearGradient>
                <linearGradient
                    id="paint1_linear_633_61"
                    x1="0"
                    x2="144.881"
                    y1="0"
                    y2="107.896"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#fff" stopOpacity="0.9"></stop>
                    <stop offset="1" stopColor="#fff" stopOpacity="0.2"></stop>
                </linearGradient>
            </defs>
        </svg>
    )
}

export default CloudSVG