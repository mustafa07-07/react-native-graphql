import React from 'react';
import {TextInput} from 'react-native';
import {AuthContext} from '../context/auth';
import {Error} from '../components/Error';
import {Loading} from '../components/Loading';
import {AuthContainer} from '../components/authContainer';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
  Box,
  Center,
  Button,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  VStack,
  Text,
  ScrollView,
  Stack,
} from 'native-base';

const signin = props => {
  const {login} = React.useContext(AuthContext);
  const [username, setUsername] = React.useState('e');
  const [password, setPassword] = React.useState('e');
  const [show, setShow] = React.useState(false);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  return (
    <ScrollView>
      <Stack space={4} w="100%" alignItems={'center'}>
        <AuthContainer>
          <Error error={error} />

          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading
              size="lg"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: 'warmGray.50',
              }}>
              Welcome
            </Heading>
            <Heading
              mt="1"
              _dark={{
                color: 'warmGray.200',
              }}
              color="coolGray.600"
              fontWeight="medium"
              size="xs">
              Sign in to continue!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Email ID</FormControl.Label>
                <Input
                  value={username}
                  onChangeText={text => setUsername(text)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  w={{
                    base: '100%',
                    md: '25%',
                  }}
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChangeText={text => setPassword(text)}
                  InputRightElement={
                    <Icon
                      name={show ? 'eye' : 'eye-slash'}
                      onPress={() => setShow(!show)}
                      size={30}
                    />
                  }
                  placeholder="Password"
                />
                <Link
                  _text={{
                    fontSize: 'xs',
                    fontWeight: '500',
                    color: 'indigo.500',
                  }}
                  alignSelf="flex-end"
                  mt="1">
                  Forget Password?
                </Link>
              </FormControl>
              <Button
                mt="2"
                colorScheme="indigo"
                disabled={!username || !password}
                onPress={async () => {
                  try {
                    setLoading(true);
                    await login(username, password);
                  } catch (e) {
                    setError(e.message.replace('GraphQL error: ', ''));
                    setLoading(false);
                  }
                }}>
                Sign in
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}>
                  I'm a new user.
                </Text>
                <Text
                 fontSize="sm"
                 color="coolGray.600"
                 _dark={{
                   color: 'warmGray.200',
                 }}
                 onPress={() => props.navigation.navigate("signup")}>
                 
                  Sign Up
                </Text>
              </HStack>
            </VStack>
          </Box>

          <Loading loading={loading} />
        </AuthContainer>
      </Stack>
    </ScrollView>
  );
};

export default signin;
