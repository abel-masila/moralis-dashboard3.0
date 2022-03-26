import React from 'react';
import { Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import CustomContainer from './CustomContainer';
import { useMoralis } from 'react-moralis';

export default function Profile({ user }) {
  const [username, setUsername] = React.useState();

  const { setUserData, isUserUpdating } = useMoralis();
  return (
    <CustomContainer>
      <Text>
        <b>🤓&nbsp; Username:</b> {user.getUsername()}
      </Text>
      <Text>
        <b>💵&nbsp; Wallet Address:</b> {user.get('ethAddress')}
      </Text>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (username.trim() !== '') {
            setUserData({ username })
              .then(() => {
                setUsername('');
              })
              .catch((err) => console.log(err));
          }
        }}
      >
        <FormControl mt="6" mb="6">
          <FormLabel htmlFor="username">Set A new Username</FormLabel>
          <Input
            id="username"
            type="text"
            placeholder="ex. theEthDev"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="purple" disabled={isUserUpdating}>
          ✅&nbsp; CHange Username
        </Button>
      </form>
    </CustomContainer>
  );
}
