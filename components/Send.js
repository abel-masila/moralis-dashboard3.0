import React from 'react';
import {
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  Text,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react';
import CustomContainer from './CustomContainer';
import { useWeb3Transfer } from 'react-moralis';
import Moralis from 'moralis';

export default function Send({ user }) {
  const [amount, setAmount] = React.useState(0);
  const [recipient, setRecipient] = React.useState();
  const toast = useToast();

  const { fetch, isFetching } = useWeb3Transfer({
    amount: Moralis.Units.ETH(amount),
    receiver: recipient,
    type: 'native',
  });

  const handleChange = (value) => setAmount(value);

  return (
    <CustomContainer>
      <Text fontSize="xl" fontWeight="bold">
        Send ETh
      </Text>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await Moralis.enableWeb3();
          fetch({
            onSuccess: () => {
              toast({
                title: 'ETH Successfully Sent',
                description: 'Fresh ETH are showing up in the receiver wallter',
                status: 'success',
                duration: 9000,
                isClosable: true,
              });
            },
            onError: () => {
              toast({
                title: 'ETH Transfer Failed',
                description: 'Please try again',
                status: 'error',
                duration: 9000,
                isClosable: true,
              });
            },
          });
        }}
      >
        <FormControl mt="4">
          <FormLabel htmlFor="amount">Amount of Eth</FormLabel>
          <NumberInput step={0.1} onChange={handleChange} value={amount}>
            <NumberInputField id="amount" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormLabel htmlFor="recipient" mt="4">
            Send To
          </FormLabel>
          <Input
            id="recipient"
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </FormControl>
        <Button mt="4" type="submit" colorScheme="purple" disabled={isFetching}>
          💵&nbsp;Send
        </Button>
      </form>
    </CustomContainer>
  );
}
