import {useState, useEffect} from 'react';
import CryptoAPI from '../api/CryptoAPI';
import CryptoTable from '../components/CryptoTable';

import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";

import {Text,Box,Flex,Center} from '@chakra-ui/react';




const CryptoList = () =>{

    const [cryptoList,setCryptoList] = useState([]);
    const [loading,setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");

    // useEffect(()=>{


    //     filterBy(searchCoin);

    // },[searchCoin])


    // const filterBy = (searchCoin) =>{
    //     cryptoList.filter(({name})=>{
    //         new RegExp('^' + searchCoin.replace(/\*/g,'.*') + '$').test(name)                              
    //     });
    // }




    useEffect(()=>{

            setLoading(true)

           const intervalId = setInterval(()=>{getCryptoList();},5000)


           return () => clearInterval(intervalId);

    },[])

    const getCryptoList = async () => {
        const response = await CryptoAPI.get("/markets",{
            params:{
                vs_currency: "usd",
                order: "market_cap_desc",
                per_page : 10,
                page : 1,
                sparkline : "false"
            }
        });

        setCryptoList(response.data);
        console.log(response.data,"after setting")
    }

    


    return(
        <Flex alignItems ="center">
            {cryptoList.length === 0 ? <Flex alignItems="center"><PacmanLoader margin="0 auto"/></Flex> : <CryptoTable cryptoList={cryptoList}/>}
        </Flex>

    )

}

export default CryptoList;