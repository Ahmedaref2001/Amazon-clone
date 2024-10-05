import moment from 'moment'
import React from 'react'
import ProductDetails from './ProductDetails'
import { NumericFormat } from 'react-number-format'

const Order = ({order}) => {
  return (
    <>
    <div>
        <div className='d-flex gap-1 my-2'>
            <h4 className='m-0'>Order_Id: </h4>
            <p className='m-0 mt-1 text-break'>{order.id}</p>
        </div>
        <div className='d-flex gap-1 my-2'>
            <h4>Time: </h4>
            <p className='m-0 mt-1 text-break'>{moment.unix(order.data.created).format("DD MM YYYY hh:mm:ss")}</p>
        </div>
    </div>
    <div>
      {
        order.data.cart.map((ele)=>(
          <ProductDetails data={ele} orderPage={true} key={ele.id}/>
        ))
      }
    </div>
    <NumericFormat
          value={order.data.amount/100}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
          renderText={(formattedValue) => (
            <h5  className="mt-3">{`Total Price = ${formattedValue}`}</h5>
          )}
        />
    </>
  )
}

export default Order