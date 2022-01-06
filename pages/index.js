import { Center } from "@chakra-ui/react"
import Banner from "../components/Banner";

export default function Home() {
  const bg = "#000040";
  const fg = "white";
  return (
    <Center height="100vh" style={{backgroundColor: bg}}>
      <Banner fg={fg} bg={bg} message={"skill issue"} />
    </Center>
  )
}