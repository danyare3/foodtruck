import React from 'react';
import { ChakraProvider, Heading, Image, Container, Stack, Text, Box, Divider, Link, Flex   } from "@chakra-ui/react";
import { AppProps } from 'next/app';

import theme from '../theme';
import { INFORMATION } from '../app/constants';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}> 
    <Box padding={4}>
       <Container backgroundColor='gray.100' borderRadius='sm' boxShadown='md' maxWidth='container.xl' padding={4}>
        <Stack spacing={8}>
        <Stack marginBottom={4} spacing={0}>
           <Image borderRadius="lg" height="100%" maxHeight={64} src={INFORMATION.banner} ></Image>
           <Stack direction={{base: "column", sm: "row"}} alignItems={{base: "flex-start", sm: "center"}} spacing={{base:3, sm:6}} >
             <Box backgroundColor="white" minWidth={{base:24, sm:32}} marginTop={{base:-12, sm:-16}} padding={1} borderRadius={9999} >
              <Image borderRadius={9999} width={{base:24, sm:32}} height={{base:24, sm:32}} src={INFORMATION.avatar} ></Image>
             </Box>          
            <Stack spacing={1}>
              <Heading  >{INFORMATION.title} </Heading>
              <Text color="gray.500" fontWeight="500"> {INFORMATION.description}</Text>
              <Stack direction="row">
                    {INFORMATION.social.map((social) => (
                      <Link key={social.name} isExternal href={social.url}>
                        <Flex
                          alignItems="center"
                          backgroundColor="primary.500"
                          borderRadius={9999}
                          color="white"
                          height={10}
                          justifyContent="center"
                          width={10}
                        >
                          <Image
                            src={`https://icongr.am/fontawesome/${social.name}.svg?size=24&color=ffffff`}
                          />
                        </Flex>
                      </Link>
                    ))}
                  </Stack>
            </Stack>
           </Stack>
        </Stack>  
        <Component {...pageProps} />
        </Stack>  
        <Divider marginY={4} />
          {/* Inicio de copyright - Cambiar el contenido de los mismos viola el contenido de los terminos de licencia */}
          <Text textAlign="center">
            © Copyright {new Date().getFullYear()}. Daniel Arenas{" "}
            <Link isExternal href={`https://wa.me/584247380853`}>
            ⚛ PaDaLum  
            </Link>
            .
          </Text>
          {/* Fin de copyright */}
      </Container>
    </Box>
    </ChakraProvider>
  );
};

export default App  

/* Daniel arenas */