import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import opentype from 'opentype.js';
import { motion } from "framer-motion";
import { Center, Flex, Spacer, Stack } from "@chakra-ui/react";

const longLowerCharacters = 'gjpqy';
const longLowerCharactersOffset = 15;
const topCharacters = '~-='
const toppestChars = '\'"`'

const Banner = () => {
  
  const router = useRouter();
  const [ content, setContent ] = useState()

  var re = /^[0-9A-Fa-f]{6}/g;
  const { bg } = router.query;

  if (re.test(bg)) {
    bg = '#' + bg;
    re.lastIndex = 0;
  }

  useEffect(async ()=>{
    let { message, fg, bg } = router.query
    if (!message) return;

    
    if (re.test(fg)) {
      fg = '#' + fg;
      re.lastIndex = 0;
    }
    if (re.test(bg)) {
      bg = '#' + bg;
      re.lastIndex = 0;
    }

    const font = await opentype.load("https://fonts.gstatic.com/s/roboto/v29/KFOkCnqEu92Fr1Mu52xPKTM1K9nz.ttf");
    
    const words = message.split(" ");
    const ret = [];
    for (let i = 0; i < words.length; i++) {
      const svgs = [];
      const word = words[i];
      const wordBounds = font.getPath(word).getBoundingBox();
      for (let j = 0; j < word.length; j++) {
        const char = word[j];
        const path = font.getPath(char);
        const svgPath = path.toPathData();
        const boundingBox = path.getBoundingBox();
        const strokeWidth = 2;
        const width = boundingBox.x2 - boundingBox.x1 + strokeWidth*2;
        const height = boundingBox.y2 - boundingBox.y1 + strokeWidth*2 + 2*longLowerCharactersOffset + (toppestChars.includes(char) ? longLowerCharactersOffset : 0);
        const svg = (
          <Flex justifyContent={"space-between"} height={"100%"} direction={"column"}>
            <Flex></Flex>
            <Spacer />
            <svg
              fill={bg}
              width={width}
              height={height}
              viewBox={`${boundingBox.x1-strokeWidth} ${boundingBox.y1-strokeWidth-(!longLowerCharacters.includes(char) ? 0 : longLowerCharactersOffset)-(topCharacters.includes(char) || toppestChars.includes(char) ? 0 : longLowerCharactersOffset)} ${width} ${height}`}
              key={j}
              margin={0}
            >
              <motion.path 
                d={svgPath} 
                strokeWidth={strokeWidth} 
                stroke={fg}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ 
                  duration: 3, 
                  //repeat: Infinity, 
                  // repeatType: "none", 
                  // ease: [0,.51,.33,.98]
                  ease: [.42,.01,.53,1]
                }}
              />
            </svg>
          </Flex>
        )
        svgs.push(svg);
      }
      ret.push(
        <Stack direction={"row"} spacing={0} key={i} py={"1em"} justifyContent={"end"} mx={"1em"}>
          { svgs }
        </Stack>
      )
    }
    setContent(ret);
  }, [router.query])

  return (
    <Center height="100vh" style={{backgroundColor: bg}}>
      <Flex>
        { content }
      </Flex>
    </Center>
  )
}

export default Banner;