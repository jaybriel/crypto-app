import React, { useState,useEffect,useCallback } from "react";
import {Box,Flex, Button, Table, Tr, Th, Thead, Tbody, Td,Image } from "@chakra-ui/react";

import SearchBar from './SearchBar';
import useSortableData from "../hooks/useSortableData";
// import {TransitionGroup,CSSTransition} from 'react-transition-group';
import { motion,AnimatePresence } from "framer-motion"



const CryptoTable = ({ cryptoList }) => {


  const [filteredData,setFilteredData] = useState('');



  const MotionTr = motion(Tr);
  const MotionTd = motion(Td);
  const MotionTable = motion(Table);


  const [searchCoin,setSearchCoin] = useState('');
  const { items, requestSort, sortConfig } = useSortableData(filteredData.length > 0 ? filteredData : cryptoList );


  const onSearchCoin = (searchKey) =>{
    console.log(searchKey,"from cryptotable");
    setSearchCoin(searchKey);
  }

  const spring = React.useMemo(()=>({


    type: 'spring',
    damping: 50,
    stiffness:100
    

  }),[])

  // const onSearchCoin = useCallback(
  //   (searchKey) => {
  //     setSearchCoin(searchKey);
  //   },
  //   [],
  // )




  useEffect(()=>{

   const filteredList = str => cryptoList.filter(({name}) => {
      return new RegExp('^' + str.toLowerCase().replace(/\*/g,'.*') + '$').test(name.toLowerCase())                              
  });
  if(searchCoin.length > 0)
  {
  setFilteredData(filteredList(`*${searchCoin}*`));
  }
  else{
    setFilteredData([]);
  }


  },[searchCoin])




  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const mapHeaders = () => {
    return (
      <Tr>
        <Th>
          <Button
            onClick={() => requestSort("name")}
            className={getClassNamesFor("name")}
          >
            Name
          </Button>
        </Th>
        <Th>
        <Button
            onClick={() => requestSort("symbol")}
            className={getClassNamesFor("symbol")}
          >
            symbol
          </Button>
        </Th>
        <Th>
        <Button
            onClick={() => requestSort("price")}
            className={getClassNamesFor("price")}
          >
            price
          </Button>
        </Th>

        <Th>
        <Button
            onClick={() => requestSort("total_volume")}
            className={getClassNamesFor("total_volume")}
          >
            Total Volume
          </Button>
        </Th>
        <Th>
        <Button
            onClick={() => requestSort("price_change_percentage_24h")}
            className={getClassNamesFor("price_change_percentage_24h")}
          >
            Price Change Percentage 24h
          </Button>
          

        </Th>
        <Th>
        <Button
            onClick={() => requestSort("market_cap")}
            className={getClassNamesFor("market_cap")}
          >
            Market Cap
          </Button>
          
          </Th>
      </Tr>
    );
  };

  const mapTableItems = () => {

    return items.map((item) => {
      return (



          <MotionTr   key ={item.id} layouttransition={spring} exit={{opacity: 0,maxHeight:0}}>
          <MotionTd layouttransition={spring}><Box d="block" alignItems="center"> <Image boxSize="50px" src={item.image}/> {item.name} </Box></MotionTd>
          <MotionTd layouttransition={spring}>{item.symbol}</MotionTd>
          <MotionTd layouttransition={spring}>${item.current_price}</MotionTd>
          <MotionTd layouttransition={spring}>${item.total_volume.toLocaleString()}</MotionTd>
          <MotionTd layouttransition={spring}>{item.price_change_percentage_24h}</MotionTd>
          <MotionTd layouttransition={spring}>{item.market_cap}</MotionTd>
        </MotionTr>

      );
    });
  };

  return (
    <Flex d="block">
    <SearchBar onSearchCoin = {onSearchCoin}/>

    <Table  variant="striped" colorScheme="linkedin">

      <Thead>{mapHeaders()}</Thead>
      <Tbody> 
      <AnimatePresence>
        {mapTableItems()}
      </AnimatePresence>
        </Tbody>
    </Table>

    </Flex>
  );
};

export default CryptoTable;
