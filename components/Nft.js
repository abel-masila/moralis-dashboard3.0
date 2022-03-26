import { Box, Image, Text, tokenToCSSVar } from '@chakra-ui/react';
import React from 'react';
import { useNFTBalances } from 'react-moralis';
import CustomContainer from './CustomContainer';

export default function Nft({ user }) {
  const { getNFTBalances, data } = useNFTBalances();

  React.useEffect(() => {
    getNFTBalances({
      params: {
        chain: 'rinkeby',
        address: user.get('ethAddress'),
      },
    });
  }, []);

  return (
    <CustomContainer>
      <Text fontSize="xl" fontWeight="bold">
        My NFTS
      </Text>
      {data &&
        data.result.map((nft) => (
          <Box mt="4" px="2" py="2" borderWidth="md" key={nft.token_uri}>
            {nft.image && <Image src={nft.image} />}
            <p>{nft.token_uri}</p>
          </Box>
        ))}
    </CustomContainer>
  );
}
