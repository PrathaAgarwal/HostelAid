import React , {useState, useEffect} from 'react'

const WavyText=({text})=>{
    return (
        <h1 className='text-7xl font-bold text-amber-100'>
        {text.split('').map((char, index)=>(
        <span key={index} className='animate-bounce inline-block' style={{animationDelay: `${index * 0.1}s`}}>{char}</span>
        ))}
        </h1>
    )
}
const Loader = () => {
const [fadeOut, setFadeOut]= useState(true);
  useEffect(()=>{
    const timeout=setTimeout(()=>{
      setFadeOut(false);
    }, 1500);
      return ()=> clearTimeout(timeout);
  },[]);

  return (
    <div className={`h-screen flex justify-center items-center transition-all duration-1000 ease-in-out transform bg-teal-800 ${fadeOut ?'opacity-100 -translate-y-0': 'opacity-0 -translate-y-100'}`}>
        <WavyText text='HostelAid' />
        <div className='absolute bottom-0 w-full'>
            <svg className='w-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fffdd0" fill-opacity="1" d="M0,64L48,80C96,96,192,128,288,149.3C384,171,480,181,576,170.7C672,160,768,128,864,138.7C960,149,1056,203,1152,197.3C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg></div>
    </div>
  )
}

export default Loader