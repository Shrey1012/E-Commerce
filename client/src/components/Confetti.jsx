import React,{useState,useEffect} from 'react'
import ReactConfetti from 'react-confetti';

const Confetti = () => {
    const [windowDimension, setWindowDimension] = useState({width: window.innerWidth, height: window.innerHeight});

    const detectSize = () => {
        setWindowDimension({width: window.innerWidth, height: window.innerHeight})
    }

    useEffect(() => {
        window.addEventListener('resize', detectSize);
        return () => {
            window.removeEventListener('resize', detectSize);
        }
    } ,[windowDimension])


  return (
    <>
        <ReactConfetti
            width={windowDimension.width}
            height={windowDimension.height}
            opacity={0.8}
        />
    </>
  )
}

export default Confetti