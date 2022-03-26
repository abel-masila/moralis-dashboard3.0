import React from 'react';
import { Divider, Text } from '@chakra-ui/react';
import { useERC20Balances, useMoralisWeb3Api } from 'react-moralis';
import Moralis from 'moralis';
import CustomContainer from './CustomContainer';

export default function Balance({ user }) {
  const [ethBalance, setEthBalance] = React.useState(0);

  const Web3Api = useMoralisWeb3Api();

  const { fetchERC20Balances, data } = useERC20Balances();

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
    fetchERC20Balances({
      params: {
        chain: 'rinkeby',
        address: user.get('ethAddress'),
      },
    });
  }, []);

  return (
    <CustomContainer>
      <Text mb="6" fontSize="xl" fontWeight="bold">
        My ERC20 Tokens
      </Text>
      {ethBalance && (
        <Text>
          💰&nbsp;{ethBalance}
          <b> ETH</b>
        </Text>
      )}
      <Divider />
      {data &&
        data.map((token) => (
          <div key={token.symbol}>
            <Text>
              💰&nbsp; {Moralis.Units.FromWei(token.balance)}{' '}
              <b>{token.symbol}</b>
            </Text>
            <Divider />
          </div>
        ))}
    </CustomContainer>
  );
}
