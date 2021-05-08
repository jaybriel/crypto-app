import React, { useState,useEffect } from "react";
import {
  HStack,
  Button,
  Flex,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const SearchBar = ({onSearchCoin}) => {
  const [searchKey, setSearchKey] = useState("");



  useEffect(()=>{
    if (searchKey) {
        
        onSearchCoin(searchKey)
      } else {
        const timeoutId = setTimeout(() => {

            onSearchCoin(searchKey)

        }, 500);
  
        return () => {
          clearTimeout(timeoutId);
        };
      }
  },[searchKey,onSearchCoin])

  return (

       <form>
      <FormControl>
        <FormLabel>Search a Bitcoin</FormLabel>
        <HStack>
          <Input type="text" value={searchKey} onChange={event=>setSearchKey(event.target.value)}  size="md" placeholder="Search Coin" />
          <Button size="md">Search</Button>
        </HStack>
      </FormControl>
      </form>

  );
};

export default SearchBar;
