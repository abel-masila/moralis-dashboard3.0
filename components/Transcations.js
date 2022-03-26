import { Divider, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { useMoralisWeb3Api } from 'react-moralis';
import CustomContainer from './CustomContainer';

export default function Transactions({ user }) {
  const [transactions, setTransactions] = React.useState([]);
  const WebApi = useMoralisWeb3Api();

  const BASE_URL = 'https://rinkeby.etherscan.io/tx/';

  const fetchTransactions = async () => {
    const data = await WebApi.account.getTransactions({
      chain: 'rinkeby',
      address: user.get('ethAddress'),
      limit: 5,
    });
    if (data) {
      setTransactions(data.result);
    }
  };
  React.useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <CustomContainer>
      <Text fontSize="xl" mb="6" fontWeight="bold">
        My last 5 Transaction
      </Text>
      {transactions &&
        transactions.map((transaction) => (
          <div key={transaction.hash}>
            <Link href={`${BASE_URL}${transaction.hash}`} isExternal>
              ➡&nbsp; {transaction.hash}
            </Link>
            <Divider />
          </div>
        ))}
    </CustomContainer>
  );
}
