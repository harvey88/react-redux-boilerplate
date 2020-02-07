import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.section`
    width: ${({radius})=>radius};
    height: ${({radius})=>radius};
    position: relative;

    .sk-circle {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        &:before {
            content: '';
            display: block;
            margin: 0 auto;
            width: ${({dotSize})=>dotSize};
            height: ${({dotSize})=>dotSize};
            background-color: ${({color})=>color};
            border-radius: 100%;
            -webkit-animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
            animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
        }
    }

    .sk-circle2 {
        -webkit-transform: rotate(30deg);
        -ms-transform: rotate(30deg);
        transform: rotate(30deg);
        &:before {
            -webkit-animation-delay: -1.1s;
            animation-delay: -1.1s;
        }
    }

    .sk-circle3 {
        -webkit-transform: rotate(60deg);
        -ms-transform: rotate(60deg);
        transform: rotate(60deg);
        &:before {
            -webkit-animation-delay: -1s;
            animation-delay: -1s;
        }
    }

    .sk-circle4 {
        -webkit-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        transform: rotate(90deg);
        &:before {
            -webkit-animation-delay: -0.9s;
            animation-delay: -0.9s;
        }
    }

    .sk-circle5 {
        -webkit-transform: rotate(120deg);
        -ms-transform: rotate(120deg);
        transform: rotate(120deg);
        &:before {
            -webkit-animation-delay: -0.8s;
            animation-delay: -0.8s;
        }
    }

    .sk-circle6 {
        -webkit-transform: rotate(150deg);
        -ms-transform: rotate(150deg);
        transform: rotate(150deg);
        &:before {
            -webkit-animation-delay: -0.7s;
            animation-delay: -0.7s;
        }
    }

    .sk-circle7 {
        -webkit-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        transform: rotate(180deg);
        &:before {
            -webkit-animation-delay: -0.6s;
            animation-delay: -0.6s;
        }
    }

    .sk-circle8 {
        -webkit-transform: rotate(210deg);
        -ms-transform: rotate(210deg);
        transform: rotate(210deg);
        &:before {
            -webkit-animation-delay: -0.5s;
            animation-delay: -0.5s;
        }
    }

    .sk-circle9 {
        -webkit-transform: rotate(240deg);
        -ms-transform: rotate(240deg);
        transform: rotate(240deg);
        &:before {
            -webkit-animation-delay: -0.4s;
            animation-delay: -0.4s;
        }
    }

    .sk-circle10 {
        -webkit-transform: rotate(270deg);
        -ms-transform: rotate(270deg);
        transform: rotate(270deg);
        &:before {
            -webkit-animation-delay: -0.3s;
            animation-delay: -0.3s;
        }
    }

    .sk-circle11 {
        -webkit-transform: rotate(300deg);
        -ms-transform: rotate(300deg);
        transform: rotate(300deg);
        &:before {
            -webkit-animation-delay: -0.2s;
            animation-delay: -0.2s;
        }
    }

    .sk-circle12 {
        -webkit-transform: rotate(330deg);
        -ms-transform: rotate(330deg);
        transform: rotate(330deg);
        &:before {
            -webkit-animation-delay: -0.1s;
            animation-delay: -0.1s;
        }
    }

    @-webkit-keyframes sk-circleFadeDelay {
        0%,
        39%,
        100% {
            opacity: 0;
        }
        40% {
            opacity: 1;
        }
    }

    @keyframes sk-circleFadeDelay {
        0%,
        39%,
        100% {
            opacity: 0;
        }
        40% {
            opacity: 1;
        }
    }
`

const Loader = (props) => {
    const dots = new Array(props.dotsCount)
    dots.fill(1)
    return (
        <Wrapper color={props.color} radius={props.radius} dotSize={props.dotSize} className={`ping-loader ${props.className ? props.className : ''}`}>
    {dots.map((el, i) => <div className={'sk-circle' + (i + 1) + ' sk-circle'} key={i}></div>)}
        </Wrapper>
    )
    }

    const PageLoader = (props) => {
        return <div className='page_loader'>
            <Loader {...props}/>
        </div>
    }

    const BlockLoader = (props) => {
        return <div className='block_loader'>
            <Loader {...props}/>
        </div>
    }

    Loader.propTypes = {
        color: PropTypes.string.isRequired,
        dotsCount: PropTypes.number.isRequired,
        dotSize: PropTypes.string.isRequired,
        radius: PropTypes.string.isRequired,
    }

    Loader.defaultProps = {
        color: 'red',
        dotsCount: 12,
        radius: '60px',
        dotSize: '15%'
    }

    export {
        Loader as default,
        PageLoader,
        BlockLoader
    }