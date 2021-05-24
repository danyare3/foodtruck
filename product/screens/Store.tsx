import React from 'react';
import  {Button, Grid, Stack, Text, Flex,} from '@chakra-ui/react';
import {Product, CartItem} from '../types';
import Productcard from "../components/ProductCard";
import CartDrawer from '../components/CartDrawer';
import {editCart} from "../selectors";


interface Props {
  products: Product[];
}


const StoreScreen: React.FC<Props> = ({products}) => {
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [isCartOpen, toggleCart] = React.useState<boolean>(false);
        

 

  function handleEditCart(product: Product, action: 'increment' | 'decrement') {
      setCart( editCart(product, action));
 }


  return ( 
   <> 
    <Stack spacing={6}>
      {products.length ? (
        <Grid gridGap={8} templateColumns={{base: 'repeat(auto-fill, minmax(240px, 1fr))',
        sm: 'repeat(auto-fill, minmax(360px, 1fr))'}}>
          {products.map((product) => (
            <Productcard
              key={product.id}
              product={product}
              onAdd={(product) => handleEditCart(product, "increment")} 
            />
          ))}    
      </Grid>
      ):( 
        <Text color="gray.500" fontSize="lg" margin="auto">
          No hay productos
        </Text>
      ) }
   {Boolean(cart.length) && (
    <Flex bottom={4} position='sticky' alignItems='center' justifyContent='center'  >
       <Button 
         onClick={() =>toggleCart(true)}
         size='lg'
         width={{base: "100%", sm:"fit-content"}}
         colorScheme="primary"          
         >
         Ver pedido ({cart.reduce((acc, item) => acc + item.quantity,0)} productos) 
       </Button>
    </Flex>
     
   )}
   </Stack>
   <CartDrawer 
      isOpen={isCartOpen}
      items={cart}
      onClose={() => toggleCart(false)}
      onDecrement={(product) => handleEditCart(product, "decrement")}
      onIncrement={(product) => handleEditCart(product, "increment")}   
   />
  
    </>
  );
};


export default StoreScreen;
