import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  Divider,
  Button,
  DrawerFooter,
  Link,
  DrawerProps,
  Text,
  Image,
  
} from "@chakra-ui/react";
import React from "react";

import { parseCurrency } from "../../utils/currency";
import { CartItem, Product } from "../types";

interface Props extends Omit<DrawerProps, "children"> {
  items: CartItem[];
  onIncrement: (product: Product) => void;
  onDecrement: (product: Product) => void;

}

const CartDrawer: React.FC<Props> = ({items, onClose, onDecrement, onIncrement, ...props}) => {
  const total = React.useMemo(()=>
   parseCurrency(items.reduce((total, product) => total + product.price * product.quantity,0)), 
   [items]
   ); 

  const text = React.useMemo(() => 
  items
  .reduce ((message, product) => message.concat(`* ${product.title} ${product.quantity > 1 ? ` (x${product.quantity})` : `` }
   - ${parseCurrency(product.price * product.quantity)}\n`),``,)
  .concat(`\nTotal: ${total}`),
 [items, total], 
 );
  
  React.useEffect(() => {
      if (!items.length) {
        onClose();        
      }
  }, [items.length, onClose]);

  return(
    <Drawer placement="right" size="sm" onClose={onClose} {...props}>
    <DrawerOverlay/>
    <DrawerContent padding={6}>
      <DrawerCloseButton />
      <DrawerHeader fontSize="3xl" textAlign="center" >Tu Pedido</DrawerHeader>

      <DrawerBody>
        {Boolean (items.length) ? <Stack divider={<Divider />} spacing={2}>
            {items.map((product) => (
            <Stack direction="row" key={product.id}>
               <Stack width="100%">
                  <Stack fontWeight="500" direction="row" justifyContent="space-between">
                    <Text fontSize='lg'>{product.title} </Text>
                    <Text >{parseCurrency(product.price * product.quantity)}</Text>                        
                  </Stack>

                  <Stack direction="row">
                      <Button colorScheme="primary" borderRadius={9999}  size="xs" onClick={() => onDecrement(product)}> - </Button>
                      <Text>{product.quantity}</Text>
                      <Button colorScheme="primary" borderRadius={9999}  size="xs" onClick={() => onIncrement(product)}> + </Button>
                  </Stack>
               </Stack>
            </Stack >
            ))}
        </Stack> : <Text color="gray.400">No Hay elementos en tu carrito</Text>}
      </DrawerBody>

     {Boolean(items.length) && (
      <DrawerFooter>
        <Stack spacing={4} width="100%">
          <Divider/>
          <Stack
            alignItems="center"
            direction="row"
            fontSize="lg"
            fontWeight="500"
            justifyContent="space-between"       
          >
            <Text>Total a pagar</Text>
            <Text> {total}</Text>            
          </Stack>
        <Button 
            isExternal 
            width='100%'
            size='lg'
            as={Link} 
            colorScheme="whatsapp" 
            leftIcon={<Image src="https://icongr.am/fontawesome/whatsapp.svg?size=45&color=ffffff"/> }

            href={`https://wa.me/584247380853?text=${encodeURIComponent(text)}`}
            >
            Completar pedido  
      </Button>          
        </Stack>
       
      </DrawerFooter>
      )}
    </DrawerContent>
</Drawer> 
  );
}; 

export default CartDrawer;