import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import Link from 'next/link'
import { useCart } from '../../lib/CartContext'
import { useEffect, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const CartPreview = () => {
  const cart = useCart()
  const [cartDisplayed, setCartDisplayed] = useState(cart.items)
  const [cartOpen, setCartOpen] = useState(false)

  const closeCart = () =>{
    setCartOpen(false)
  }
  useEffect(() => {
    const loadedCart = localStorage.getItem('cart')
    if (loadedCart) {
      const newCart = JSON.parse(loadedCart)
      setCartDisplayed(newCart)
    }
  }, [cart.items])

  const onFocus = () => {
    const loadedCart = localStorage.getItem('cart')
    if (loadedCart) {
      const newCart = JSON.parse(loadedCart)
      setCartDisplayed(newCart)
    }
  }
  const onBlur = () => {
    closeCart()
  }
  useEffect(() => {
    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)
    onFocus()
    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', onBlur)
    }
  },[])
  return (
    <div>
      <div
        onClick={() => setCartOpen(!cartOpen)}
        className='bg-blue-100 text-blue-900 px-2 py-2 rounded-full hover:bg-blue-300 hover:text-white hover:cursor-pointer relative'
      >
        <AiOutlineShoppingCart />
        {cart && cart.cartSize > 0 && (
          <div
            className='absolute bottom-5 -right-1 bg-orange-400 text-xs text-white'
            style={{
              height: '15px',
              width: '15px',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              borderRadius: '50%',
            }}
          >
            <span>{Object.keys(cartDisplayed).length}</span>
          </div>
        )}
      </div>
    {cartOpen &&
      <div
        className={`${
          Object.keys(cartDisplayed).length > 0 &&
          'h-52 sm:w-90 overflow-scroll'
        } w-full  sm:w-auto absolute z-50 right-0 sm:right-12 top-16 bg-gray-50 px-3  py-3 rounded shadow-sm`}
      >
        <div className='border-b flex flex-row items-center justify-between py-2'>
          <p className='text-gray-900 font-medium '>
            Seu carrinho :
          </p>
          <Link href='/cart'>
            <a className='text-blue-600 font-medium text-sm hover:underline px-4  rounded'>
              Ir para o carrinho
            </a>
          </Link>
        </div>

        {Object.keys(cartDisplayed).length > 0 && (
          <div>
            {Object.keys(cartDisplayed).map(item => (
              <div
                className='py-2 border-b flex justify-start items-center '
                key={item}
              >
                <img
                  className='h-full w-10 mr-2 bg-gray-900'
                  src={
                    cartDisplayed[item].images
                      ? cartDisplayed[item].images[0]
                      : 'https://dummyimage.com/40x50'
                  }
                />
                <div className='flex flex-col items-start justify-start px-0 mx-0 w-full '>
                  <Link href={`/produto/${cartDisplayed[item].slug}`} passHref>
                    <a
                      className='text-gray-800 font-medium text-sm hover:underline'
                      onClick={closeCart}
                    >
                      {cartDisplayed[item].name}
                    </a>
                  </Link>

                  <div className='flex items-center justify-start'>
                    <p className='text-gray-500 font-medium text-xs mr-5'>
                      Cor: {cartDisplayed[item].variation.color.colorName}
                    </p>
                    {(cartDisplayed[item].sizeType === 'clothes' ||
                      cartDisplayed[item].sizeType === 'shoes') && (
                      <p className='text-gray-500 font-medium text-xs mr-5'>
                        Tamanho: {cartDisplayed[item].variation.size}
                      </p>
                    )}
                    {cartDisplayed[item].voltage && (
                      <span className='text-gray-500 font-medium text-xs'>
                        Voltagem: {cartDisplayed[item].voltage}
                      </span>
                    )}
                  </div>

                  <p className='text-gray-400 font-medium text-sm'>
                    R${' '}
                    {cartDisplayed[item].variation.price.toLocaleString(
                      'pt-br',
                    )}{' '}
                    x {cartDisplayed[item].qtd}{' '}
                    <span className='text-gray-800'>
                      R${' '}
                      {(
                        cartDisplayed[item].variation.price *
                        cartDisplayed[item].qtd
                      ).toLocaleString('pt-br')}
                    </span>
                  </p>
                </div>
                <div className='flex flex-row justify-items-end  items-center '>
                  <button className='ml-5' onClick={() => cart.addOne(item)}>
                    <AiOutlinePlus color='#000' />
                  </button>
                  <button className='ml-5' onClick={() => cart.removeOne(item)}>
                    <AiOutlineMinus color='#000' />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {Object.keys(cartDisplayed).length === 0 && (
          <p className='text-gray-400 font-medium text-sm'>
            Seu carrinho está vazio
          </p>
        )}
      </div>}
    </div>
  )
}

export default CartPreview
