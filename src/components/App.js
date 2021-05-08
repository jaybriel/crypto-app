import React from "react";
import CryptoList from "../components/CryptoList";
import SearchBar from "../components/SearchBar";
import { Flex, Center } from "@chakra-ui/react";

const App = () => {
  return (
    <Center>

        <CryptoList />
    </Center>
  );
};

export default App;
