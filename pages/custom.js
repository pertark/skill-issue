import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import opentype from 'opentype.js'
import { Button, Input, Select, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Global } from '@emotion/react'
import { motion } from 'framer-motion'

const API_KEY='AIzaSyDXVvQikN1ghAayxd3LBY2WhM0rB1uOE9M'

export default function Custom() {
  const [ inputText, setInputText ] = useState(''); 
  const [ fonts, setFonts ] = useState([]);
  const [ currFont, setCurrFont ] = useState('');
  const [ svgCustom, setSvgCustom ] = useState('');
  const getFonts = async () => {
    let response = fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + API_KEY)
      .then((res) => {
        return res.json()
      });
    
    let fonts = await response;
    setFonts(fonts.items); 
  }
  
  useEffect(() => {
    getFonts()
  }, [])

  const loadOT = async () => {
    if (!currFont) return;
    const font = await opentype.load(currFont.files.regular);
    const path = font.getPath(inputText);
    const svgPath = path.toPathData();
    const boundingBox = path.getBoundingBox();
    const strokeWidth = 2;
    const width = boundingBox.x2 - boundingBox.x1 + strokeWidth*2;
    const height = boundingBox.y2 - boundingBox.y1 + strokeWidth*2;
    const svg = (
      <svg
        fill='white'
        width={width}
        height={height}
        viewBox={`${boundingBox.x1-strokeWidth} ${boundingBox.y1-strokeWidth} ${width} ${height}`}
      >
        <motion.path 
          d={svgPath} 
          strokeWidth={strokeWidth} 
          stroke='#000000' 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            repeatType: "reverse", 
            //ease: [0,.51,.33,.98] 
            ease: [.42,.01,.53,1]
          }}
        />
      </svg>
    )
    setSvgCustom(svg);
  }

  return (
    <>
      <Head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" /> 
      </Head>
      { !!currFont ? <Global styles={`
        @font-face {
          font-family: '${currFont.family}';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url('${currFont.files.regular}') format('truetype');
        }`} /> : <></>}
      <Select placeholder='Select a font'
        onChange={ (event) => setCurrFont(fonts[event.target.value]) }
      >
        { fonts.map((font, key) => <option key={key} value={key}>{font.family}</option>) }
      </Select>
      <Input placeholder='sample text' 
        value={inputText} 
        onChange={(event) => setInputText(event.target.value)} 
        />
      <Text fontFamily={currFont.family}
      >{ inputText }</Text>
      <Button onClick={loadOT}>Render</Button>
      { !!svgCustom ? svgCustom : <></> }
    </>

  )
}
