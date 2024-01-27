import React from "react";
import '../style/Product.css';
import { AiFillCloseSquare } from "react-icons/ai";


function Product({id, name, price, description,image,handler_addProduct,handlerInfo}){
    return(
        <article id={id} className='product-content'>
            <div className='img-product-container'>
                <img className='product-img' src={image} alt={`imagen de ${name}`} onClick={()=> handlerInfo(id)}/>
            </div>
            <button className='product-add-btn' onClick={handler_addProduct}>+ Add</button>
            <p className='product-price'>{`$${price}`}</p>
            <p className='product-name'>{name}</p>
            <p className='product-description'>{description}</p>
        </article>
    )
}


export function DisplayProducts({productsData,handler, handlerInfo}){

    return(
        <section className='prodcut-container-all'>
            {
                productsData.map(productInfo =>
                    <Product 
                        key = {productInfo.id}
                        id  = {productInfo.id}
                        name = {productInfo.title}
                        price = {productInfo.price}
                        description={`${productInfo.description.slice(0,40)}[...]`}
                        image={productInfo.image}
                        handler_addProduct={()=>handler(productInfo.id)}
                        handlerInfo = {handlerInfo}
                    />
                )
                
            }
        </section>
    )
}


export function ProductInfo( {id, title, price, description, image, isModalVisible, handlerCloseModal} ){
    return(
        <article itemscope itemtype='http://schema.org/Product' className={ isModalVisible ? 'modal-product moda-visible': 'modal-product' } id={id}>
            <figure className='modal-figure-container'>
                <img className='modal-img' src={image} alt={title} itemprop='image'/>
                <figcaption className='modal-info-container'>
                    <p className='modal-title' itemprop={title}>{title}</p>
                    <p className='modal-price' itemprop='price' content={`$${price}`}>{`$${price}`}</p>
                    <p className='modal-description' itemprop='description'>{description}</p>
                    <AiFillCloseSquare className='close-btn-modal' onClick={handlerCloseModal} />
                </figcaption>
            </figure>
            
        </article>
    )
}

