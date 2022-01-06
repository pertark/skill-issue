import { Flex, Spacer, Stack } from "@chakra-ui/react";
import opentype from "opentype.js";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const longLowerCharacters = 'gjpqy';
const longLowerCharactersOffset = 15;
const topCharacters = '~-='
const toppestChars = '\'"`'

const Banner = ({ fg, bg, message }) => {
  const [ content, setContent ] = useState();

  if (!fg) fg = 'white';
  if (!bg) bg = 'black';

  useEffect(() => {
    (async () => {
      if (!message) return;
      
      const font = await opentype.load("https://fonts.gstatic.com/s/roboto/v29/KFOkCnqEu92Fr1Mu52xPKTM1K9nz.ttf");
      
      const words = message.split(" ");
      const ret = [];
      for (let i = 0; i < words.length; i++) {
        const svgs = [];
        const word = words[i];
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
    })();
  }, [])

  return (
    <Flex style={{backgroundColor: bg}}>
      { content }
    </Flex>
  )
}

export default Banner;
