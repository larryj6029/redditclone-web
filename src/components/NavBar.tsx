import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import Router, { useRouter } from "next/router";
import { Search2Icon } from "@chakra-ui/icons";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;
  //   data loading
  if (fetching) {
    // User not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </>
    );
    // user logged in
  } else {
    body = (
      <Flex align="center">
        <NextLink href="/create-post">
          <Button as={Link} mr={4} color="white">
            Create Post
          </Button>
        </NextLink>
        <Box color="white" mr={2}>
          <NextLink href="/account">
            <Link>{data.me.username}</Link>
          </NextLink>
        </Box>
        <Button
          variant="link"
          onClick={async () => {
            await logout();
            router.reload();
          }}
          isLoading={logoutFetching}
        >
          {" "}
          logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex
      zIndex={1}
      position="sticky"
      top={0}
      bg="#696D7D"
      p={4}
      ml={"auto"}
      align="center"
    >
      <Flex flex={1} m="auto" maxW={1000} align="center">
        <NextLink href="/">
          <Link>
            <Heading color="white"> Reddit Clone</Heading>
          </Link>
        </NextLink>
        <Box ml="auto">
          <InputGroup size="md">
            <InputLeftAddon bg="white" children={<Search2Icon />} />
            <Input w={300} bg="white" placeholder="mysite" />
          </InputGroup>
        </Box>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
