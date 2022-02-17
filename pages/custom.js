import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import opentype from 'opentype.js'
import { Button, Center, Flex, Input, Select, Stack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Global } from '@emotion/react'
import { motion } from 'framer-motion'
import { SketchPicker } from 'react-color'

const API_KEY='AIzaSyDXVvQikN1ghAayxd3LBY2WhM0rB1uOE9M'

export default function Custom() {
  const [ inputText, setInputText ] = useState(''); 
  const [ fonts, setFonts ] = useState([]);
  const [ currFont, setCurrFont ] = useState('');
  const [ bgColor, setBgColor ] = useState({
    "hsl": {
        "h": 219.33333333333334,
        "s": 0.9661816751867872,
        "l": 0.41562792000000004,
        "a": 1
    },
    "hex": "#044ad0",
    "rgb": {
        "r": 4,
        "g": 74,
        "b": 208,
        "a": 1
    },
    "hsv": {
        "h": 219.33333333333334,
        "s": 0.9827999999999999,
        "v": 0.8172,
        "a": 1
    },
    "oldHue": 219.33333333333334,
    "source": "hsv"
});
  const [ fgColor, setFgColor ] = useState({
    "hsl": {
        "h": 218.57142857142856,
        "s": 0,
        "l": 1,
        "a": 1
    },
    "hex": "#ffffff",
    "rgb": {
        "r": 255,
        "g": 255,
        "b": 255,
        "a": 1
    },
    "hsv": {
        "h": 218.57142857142856,
        "s": 0,
        "v": 1,
        "a": 1
    },
    "oldHue": 218.57142857142856,
    "source": "hex"
});

  // const [ svgCustom, setSvgCustom ] = useState('');
  // const getFonts = async () => {
  //   let response = fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + API_KEY)
  //     .then((res) => {
  //       return res.json()
  //     });
    
  //   let fonts = await response;
  //   setFonts(fonts.items); 
  // }
  
  // useEffect(() => {
  //   getFonts()
  // }, [])

  // const loadOT = async () => {
  //   if (!currFont) return;
  //   const font = await opentype.load(currFont.files.regular);
  //   const path = font.getPath(inputText);
  //   const svgPath = path.toPathData();
  //   const boundingBox = path.getBoundingBox();
  //   const strokeWidth = 2;
  //   const width = boundingBox.x2 - boundingBox.x1 + strokeWidth*2;
  //   const height = boundingBox.y2 - boundingBox.y1 + strokeWidth*2;
  //   const svg = (
  //     <svg
  //       fill='white'
  //       width={width}
  //       height={height}
  //       viewBox={`${boundingBox.x1-strokeWidth} ${boundingBox.y1-strokeWidth} ${width} ${height}`}
  //     >
  //       <motion.path 
  //         d={svgPath} 
  //         strokeWidth={strokeWidth} 
  //         stroke='#000000' 
  //         initial={{ pathLength: 0 }}
  //         animate={{ pathLength: 1 }}
  //         transition={{ 
  //           duration: 4, 
  //           repeat: Infinity, 
  //           repeatType: "reverse", 
  //           //ease: [0,.51,.33,.98] 
  //           ease: [.42,.01,.53,1]
  //         }}
  //       />
  //     </svg>
  //   )
  //   setSvgCustom(svg);
  // }

  return (
    <>
      <Head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" /> 
        <title>Custom SVG Animation</title>
      </Head>
      <Center height="100vh">
        { !!currFont ? <Global styles={`
          @font-face {
            font-family: '${currFont.family}';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('${currFont.files.regular}') format('truetype');
          }`} /> : <></>}
        <Stack direction={'column'}>
          {/* <Select placeholder='Select a font'
            onChange={ (event) => setCurrFont(fonts[event.target.value]) }
          >
            { fonts.map((font, key) => <option key={key} value={key}>{font.family}</option>) }
          </Select> */}
          <h1 style={{textAlign: 'center', fontWeight: 900, fontSize: 24}}><b>Custom</b></h1>
          <Stack direction="row">
            <Stack direction="column" width="50%" px="1rem">
              <h2>Background Color</h2>
              <SketchPicker width="100%" color={bgColor} onChangeComplete={(color) => {setBgColor(color); console.log(color)}}/>
            </Stack>
            <Stack direction="column" width="50%" px="1rem">
              <h2>Foreground Color</h2>
              <SketchPicker width="100%" color={fgColor} onChangeComplete={(color) => setFgColor(color)}/>
            </Stack>
          </Stack>
          <Input placeholder='Your Text' 
            value={inputText} 
            onChange={(event) => setInputText(event.target.value)} 
            />
          {/* <Text fontFamily={currFont.family}
          >{ inputText }</Text> */}
          <Link href={`/${fgColor.hex?.substring(1)}/${bgColor.hex?.substring(1)}/${encodeURIComponent(inputText)}`}>
            <Button colorScheme={"blue"} isDisabled={!inputText}>Create</Button>
          </Link>
        </Stack>
      </Center>
    </>

  )
}
