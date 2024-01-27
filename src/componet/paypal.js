import { PayPalButtons } from "@paypal/react-paypal-js";


export function PaypalCheckOutButton({total}){
   

    const createOrder = ({data, actions}) => {
       return actions.order.create(
        {
            purchase_units: [
                {
                    description: 'Compra de productos en tienda ONLINE',
                    amount: {value: total}
                }

            ]
        }
       )
    }


    const onApprove = async({data,actions}) =>{
        const order = await actions.order.capture();
        console.log(order)
    }

    return(
        <PayPalButtons style={
            {
                color:'silver',
                layout: 'vertical',
                height: 50,
                tagline: false,
                shape: 'pill'
            }} 
            createOrder={createOrder}
            onApprove={onApprove}
            />
    )
}