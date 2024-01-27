import '../style/cart.css';
import React from 'react';
import { IoTrash} from "react-icons/io5";
import { IoMdAddCircle,IoIosRemoveCircle } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaRepeat } from "react-icons/fa6";
import { PaypalCheckOutButton } from './paypal';



export function CartIcon({handlerDisplayCart,info}){
    return(
        <div className='cart-icon-container'>
            <FaCartShopping className='cart-icon' onClick={handlerDisplayCart}/>
            <span className='cart-count'>{`$${info.toFixed(2)}`}</span>
        </div>
        
    )
}



function CartOneElement({id, name, price,image,amount,handlerRemove,handlerIcrement,handlerDecrement}){
    
    return(
        <div id={id} className='current-element'>

            <div className='container-L'>
                <img className='element-image' src={image} alt={`Imagen-${name}`}/>
                <p className='element-name'>{name}</p>
                <p className='element-price'>{`$${price.toFixed(2)}`}</p>
            </div>
            <div className='container-R'>
                <p className='element-amount'><FaRepeat className='amount-ico' />{amount}</p>
                <div className='arrow-container'>
                    <IoIosRemoveCircle className='arrow'  onClick={handlerDecrement}/>
                    <IoMdAddCircle className='arrow' onClick={handlerIcrement} />
                </div>
                <IoTrash className='remove-product' onClick={handlerRemove} />
            </div>
            

            
        </div>
    )
}


export function Cart({data,handlerRemove,handlerIcrement,handlerDecrement,isVisible}){


    let total_ = 0;
    data.forEach(p => total_+=p.price)
    
    return(
        <div className={isVisible ? 'cart-container' : 'cart-container cart-hidden'}>
           <div className='second-div'>
           {
                data.map(product => 
                <CartOneElement 
                    key = {product.id} 
                    id={product.id} 
                    name={product.title}
                    price={product.price} 
                    image={product.image}
                    amount={product.amount}
                    handlerRemove={()=>handlerRemove(product.id)}
                    handlerIcrement={()=>handlerIcrement(product.id)}
                    handlerDecrement={()=>handlerDecrement(product.id)}
                />)
            }
            <div className='resume-container'>
                <p className='total-amount'>{`Total: $${total_.toFixed(2)}`}</p>
                {/* <button className='pay-btn'>Pagar</button> */}
                <PaypalCheckOutButton total={total_} />
            </div>
           </div>
        </div>
    )
}