import './App.css';
import { Navegation } from './componet/Nav';
import { DisplayProducts, ProductInfo} from './componet/product';
import { Cart } from './componet/cart';
import { useState, useEffect} from 'react';
import {CartIcon } from './componet/cart';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
//import { createContext } from 'react';


const API_URL_PRODUCTS_ENDPOINT = 'https://fakestoreapi.com/products';

function App() {

  //Nota los datos con los que renderiza la presentacion de 
  //los productos deben ser inmutables

  const [data ,setData] = useState([]);
  const [load, dataLoaded] = useState(false);
  
  useEffect( () =>{
    fetch(API_URL_PRODUCTS_ENDPOINT)
      .then(response => response.json())
      .then(response => {
        response = response.map(res => {
          res.amount = 1;
          return res;
        })
        setData(response);
        dataLoaded(true);
      })
      .catch(console.error("IMPOSIBLE CONTECTAR"))
  }, [])








  //Array que contiene los elementos del menu
  const Data = [
    { id: 1, name: 'Home', href: '#'},
    { id: 2, name: 'About us', href: '#'},
    { id: 3, name: 'Works', href: '#'},
    { id: 4, name: 'Contact', href: '#'},
    { id: 5, name: 'Location', href: '#'}
  ]

  
  //Estado que controla el funcionamiento del carrito
  const [productCart,setProductCart] = useState([]);

  const handlerAddProduct = (id) => {
  let selectProduct = data.find(product => product.id === id);
  const PRICE = data.find(product => product.id === id).price;
  const existingProduct = productCart.find(product => product.id === id);

  if (existingProduct) {
    const updatedProduct = {
      ...existingProduct,
      amount: existingProduct.amount + 1,
      price: PRICE * (existingProduct.amount + 1)
    };

    // Reemplaza el producto existente en el carrito con el nuevo objeto actualizado
    setProductCart(productCart.map(product => (product.id === id ? updatedProduct : product)));
  } else {
    // Agrega un nuevo objeto al carrito con la cantidad inicial
    setProductCart([selectProduct, ...productCart]);
  }


}

  const handlerRemoveProduct = (id) =>{
    const currenProducts = productCart.filter(product => product.id !== id);

    setProductCart([...currenProducts])
  }


  const handlerIcrementAmount = (id) => {
    const selectProduct = productCart.find(produc => produc.id === id);
    const PRICE = data.find(product => product.id === id).price;

    if(selectProduct){
      const updatedProduct = {
        ...selectProduct,
        amount: selectProduct.amount + 1,
        price: PRICE * (selectProduct.amount + 1)
      }

       setProductCart(productCart.map(product => (product.id === id ? updatedProduct : product)));
    }

  }

  const handlerDecrementAmount = (id) =>{
    const existingProduct = productCart.find(product => product.id === id);
    const PRICE = data.find(product => product.id === id).price;
    existingProduct.amount -= 1;
    if(existingProduct.amount === 0){
      existingProduct.amount = 1
    }
    existingProduct.price = PRICE * existingProduct.amount;
    setProductCart([...productCart]);
  }


  const [isVisibleCart, setVisibleCart] = useState(false);
  const visibleCart = () => setVisibleCart(!isVisibleCart);

  const [isVisibleModal,setVisibleModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  const handlerInfoProductVisible = id => {
    const updatedInfo = data.find(product => product.id === id);
    setModalInfo(updatedInfo);
    setVisibleModal(!isVisibleModal);
  }

  const closeModal = () => setVisibleModal(!isVisibleModal);

 

  return (
    <PayPalScriptProvider options={{ clientId: "test" }}>
    <div className='App'>
      <header>
        <Navegation data={Data} />
        <CartIcon  handlerDisplayCart={visibleCart} info={productCart.reduce((accumulator, currentValue) => {
  return accumulator + currentValue.price;
}, 0)} />
      </header>

      <main>
        <h1>Nuestros Productos</h1>
        {
          load ? (
            <>
            <DisplayProducts productsData={data} handler={handlerAddProduct} handlerInfo={handlerInfoProductVisible} />
            </>
          ):null

        }
        <Cart data={productCart} handlerRemove={handlerRemoveProduct} handlerIcrement={handlerIcrementAmount} handlerDecrement={handlerDecrementAmount} isVisible={isVisibleCart} />
      </main>
      <div className={isVisibleCart ? 'layer': null}></div>
      <ProductInfo id={modalInfo.id} title={modalInfo.title} price={modalInfo.price} description={modalInfo.description} image={modalInfo.image} isModalVisible={isVisibleModal} handlerCloseModal={closeModal} />
      

    </div>
    </PayPalScriptProvider>
  );
}

export default App;





