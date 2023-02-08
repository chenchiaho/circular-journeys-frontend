import React from 'react'
import './CartList.scss'
import { CiCircleRemove } from 'react-icons/ci'


const CartList = ({ products, setProducts }) => {

  const deleteProduct = (id) => {
    setProducts(products.filter((toDelete, i2) => id !== toDelete.id))
  }

  return (
    <>
      {products.map((v, i) => {
        const { id, name, price, img, count } = v

        const handleChange = (event) => {
          const updatedProducts = [...products]
          updatedProducts[i].count = event.target.value
          setProducts(updatedProducts)
        }

        return (
          <>
            <div>
              <div className='itemImage'>
                <CiCircleRemove
                  className="deleteItem"
                  onClick={() => {
                    deleteProduct(id)
                  }} />

                <img src={img} alt="product image" />
              </div>
              <div>
                <h5>{name}</h5>
                <div className='itemDetail'>
                  <p>數量: </p>
                  <select value={count} onChange={handleChange}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='itemTotal'>
                <p>$ {price * count}</p>
              </div>
              <hr />
              <h5></h5>
            </div>
          </>
        )
      })}
    </>
  )
}

export default CartList
