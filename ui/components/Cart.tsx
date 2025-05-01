"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Box,
  IconButton,
  Checkbox,
  Typography,
} from "@mui/material";
import { Add, Remove, Delete, ShoppingCart } from "@mui/icons-material";
import { number } from "yup";

const CartPlaceholder = () => {
  const placeholderRows = 3;

  // Initial empty state to avoid hydration errors
  const [cartItems, setCartItems] = useState(
    Array.from({ length: placeholderRows }, (_, index) => ({
      id: index,
      image: "", // Placeholder image
      price: 0, // Set initial price to avoid mismatch during hydration
      quantity: 1,
      selected: false,
    }))
  );

  // Set random prices after component mounts (on the client side)
  useEffect(() => {
    setCartItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        price: (Math.random() * 100 + 10).toFixed(2), // Generate random price
      }))
    );
  }, []);

  // Function to toggle product selection
  const handleSelect = (index) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Function to increase quantity
  const handleIncrease = (index) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrease quantity
  const handleDecrease = (index) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Calculate total price for each row
  const getTotalPrice = (price: number, quantity: number) =>
    (price * quantity).toFixed(2);

  // Calculate total price for selected items
  const getSelectedTotal = () => {
    return cartItems
      .filter((item) => item.selected)
      .reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
      )
      .toFixed(2);
  };

  // Flush cart (clear all items)
  const handleFlushCart = () => {
    setCartItems([]);
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant='h5' sx={{ mb: 3, fontWeight: "bold" }}>
        <ShoppingCart sx={{ verticalAlign: "middle", mr: 1 }} />
        Your Cart
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                Product
              </TableCell>
              <TableCell
                align='right'
                sx={{ fontWeight: "bold", fontSize: "1rem" }}
              >
                Price
              </TableCell>
              <TableCell
                align='center'
                sx={{ fontWeight: "bold", fontSize: "1rem" }}
              >
                Quantity
              </TableCell>
              <TableCell
                align='right'
                sx={{ fontWeight: "bold", fontSize: "1rem" }}
              >
                Total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item, index) => (
              <TableRow
                key={item.id}
                hover
                sx={{ transition: "background-color 0.2s" }}
              >
                {/* Checkbox to select the product */}
                <TableCell>
                  <Checkbox
                    checked={item.selected}
                    onChange={() => handleSelect(index)}
                  />
                </TableCell>

                {/* Product Image and Name */}
                <TableCell component='th' scope='row'>
                  <Stack direction='row' alignItems='center' spacing={2}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        backgroundColor: "grey.300",
                        borderRadius: 1,
                      }}
                    />
                    <Typography variant='body1'>
                      Product {item.id + 1}
                    </Typography>
                  </Stack>
                </TableCell>

                {/* Price */}
                <TableCell align='right'>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    ${item.price}
                  </Typography>
                </TableCell>

                {/* Quantity Controls */}
                <TableCell align='center'>
                  <Stack
                    direction='row'
                    alignItems='center'
                    spacing={1}
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 1,
                      p: 1,
                      width: "fit-content",
                      mx: "auto",
                    }}
                  >
                    <IconButton
                      size='small'
                      onClick={() => handleDecrease(index)}
                      color='error'
                      sx={{ "&:hover": { backgroundColor: "error.light" } }}
                    >
                      <Remove />
                    </IconButton>
                    <Typography
                      variant='body1'
                      sx={{ minWidth: "24px", textAlign: "center" }}
                    >
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size='small'
                      onClick={() => handleIncrease(index)}
                      color='primary'
                      sx={{ "&:hover": { backgroundColor: "primary.light" } }}
                    >
                      <Add />
                    </IconButton>
                  </Stack>
                </TableCell>

                {/* Total Price */}
                <TableCell align='right'>
                  <Typography variant='body1' sx={{ fontWeight: "bold" }}>
                    ${getTotalPrice(item.price, item.quantity)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Cart Total */}
      <Box sx={{ mt: 3, textAlign: "right" }}>
        <Typography variant='h6' sx={{ fontWeight: "bold" }}>
          Selected Total: ${getSelectedTotal()}
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ mt: 3 }}>
        <Stack direction='row' spacing={2} justifyContent='flex-end'>
          <Button
            variant='contained'
            color='error'
            startIcon={<Delete />}
            onClick={handleFlushCart}
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            Flush Cart
          </Button>
          <Button
            variant='contained'
            color='primary'
            startIcon={<ShoppingCart />}
            disabled={cartItems.every((item) => !item.selected)}
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            Proceed to Checkout
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default CartPlaceholder;
