import React from 'react';
import { Text } from '@chakra-ui/react';
import { useMoralisWeb3Api } from 'react-moralis';
import Moralis from 'moralis';
import CustomContainer from './CustomContainer';

export default function Balance({ user }) {
  const [ethBalance, setEthBalance] = React.useState(0);
  const Web3Api = useMoralisWeb3Api();
  const fetchNativeBalance = async () => {
    const result = await Web3Api.account
      .getNativeBalance({
        chain: 'rinkeby',
        address: user.get('ethAddress'),
      })
      .catch((err) => console.error(err));
    if (result.balance) {
      setEthBalance(Moralis.Units.FromWei(result.balance));
    }
  };
  React.useEffect(() => {
    fetchNativeBalance();
  }, []);

  return (
    <CustomContainer>
      <Text>My ERC20 Tokens</Text>
      {ethBalance && (
        <Text>
          💰&nbsp;{ethBalance}
          <b> ETH</b>
        </Text>
      )}
    </CustomContainer>
  );
}
