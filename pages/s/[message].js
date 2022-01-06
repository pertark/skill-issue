import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import opentype from 'opentype.js';
import { motion } from "framer-motion";
import { Center, Flex, Spacer, Stack } from "@chakra-ui/react";
import Banner from "../../components/Banner";

const longLowerCharacters = 'gjpqy';
const longLowerCharactersOffset = 15;
const topCharacters = '~-='
const toppestChars = '\'"`'

const Text = () => {
  
  const router = useRouter();
  const [ content, setContent ] = useState()

  useEffect(async ()=>{
    const { message } = router.query
    if (!message) return;
    
    setContent(<Banner message={message} />);
  }, [router.query])

  return (
    <Center height="100vh">
      { content }
    </Center>
  )
}

export default Text;