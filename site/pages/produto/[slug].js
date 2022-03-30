import { useState } from 'react'
import { gql } from 'graphql-request'
import Layout from '../../components/Layout'
import { fetcher } from '../../lib/graphql'
import { useEffect } from 'react/cjs/react.development'
import { useCart } from '../../lib/CartContext'
import EmblaCarousel from '../../components/Carousel/Carousel'

const clothesSizes = ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XGG', 'EG', 'EGG']
const shoesSizes = [
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
]

const GET_ALL_CATEGORIES = gql`
  query {
    categories: getAllCategories {
      id
      name
      slug
    }
  }
`
const GET_ALL_BRANDS = gql`
  query {
    brands: getAllBrands {
      id
      name
      slug
    }
  }
`
const GET_PRODUCT_BY_SLUG = gql`
  query getProductBySLug($slug: String!) {
    product: getProductBySlug(slug: $slug) {
      id
      name
      slug
      description
      images
      sizeType
      voltage
      brand {
        name
      }
      variations {
        color {
          colorName
          colorCode
        }
        size
        sku
        price
        stock
        weight
      }
    }
  }
`
const Products = ({ product, categories, brands }) => {
  const cart = useCart()
  const [colorSelected, setColorSelected] = useState('')
  const [sizeSelected, setSizeSelected] = useState('')
  const [voltageSelected, setVoltageSelected] = useState('')
  const [availableSizesForColor, setAvailableSizes] = useState([])
  const [isOnCart, setIsOnCart ]=  useState(false)
  const [selectedVariation, setSelectedVariation] = useState(
    product.variations[0],
  )
  const possibleColors = product.variations.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.color.colorName]: {
        name: curr.color.colorName,
        code: curr.color.colorCode,
      },
    }),
    {},
  )
  const updateIsOnCartOnFocus = () => {
    const loadedCart = JSON.parse(localStorage.getItem('cart'))
    if (loadedCart) {
       if(Object.keys(loadedCart).indexOf(selectedVariation.sku + voltageSelected) >=0){
        setIsOnCart(true)
       }
       else{
        setIsOnCart(false)
       }   
    }
  }
  const sizeIsAvailable = size => {
    return availableSizesForColor.indexOf(size) >= 0
  }
  const filterSizes = sizes => {
    const allSizes = sizes.map(item => item.size)
    const sizesFilter = [...new Set(allSizes.map(s => s))]
    setAvailableSizes(sizesFilter)
  }

  const updateAvailableSizes = () => {
    const available = product.variations.filter(
      prod => prod.color.colorName === colorSelected,
    )
    filterSizes(available)
  }
  const setFirstAvailabledVariation = () => {
    const firstAvailableVariation = product.variations
      .filter(item => item.color.colorName === colorSelected)
      .filter(item => item.size === availableSizesForColor[0])
    setSelectedVariation(firstAvailableVariation[0])
  }
  const updateSelectedVariation = () => {
    const newSelected = product.variations
      .filter(item => item.color.colorName === colorSelected)
      .filter(item => item.size === sizeSelected)
    setSelectedVariation(newSelected[0])
  }
  const initialVariationAvailableSizes = () => {
    const available = product.variations.filter(
      prod => prod.color.colorName === product.variations[0].color.colorName,
    )
    filterSizes(available)
  }
  const initialSelectedVariation = () => {
    setSelectedVariation(product.variations[0])
    setColorSelected(product.variations[0].color.colorName)
    initialVariationAvailableSizes()
  }
  useEffect(() => {
    window.addEventListener('focus', updateIsOnCartOnFocus)
    updateIsOnCartOnFocus()
    console.log('ta rodando')
    return () => {
      window.removeEventListener('focus', updateIsOnCartOnFocus)
    }
    
  })
  useEffect(() => {
    updateAvailableSizes()
  }, [colorSelected])

  useEffect(() => {
    setFirstAvailabledVariation()
  }, [availableSizesForColor])

  useEffect(() => {
    if (colorSelected !== '' && sizeSelected !== '') {
      updateSelectedVariation()
    }
    updateIsOnCartOnFocus()
  }, [colorSelected, sizeSelected])

  useEffect(() =>{
    updateIsOnCartOnFocus()
  },[selectedVariation, cart.items])

  useEffect(() => {
    if (product.variations[0]) {
      initialSelectedVariation()
    }
  }, [product])
  const removeFromCart  = () =>{
    cart.removeFromCart(
      selectedVariation.sku,
      voltageSelected,
    )
  }
  return (
    <Layout categories={categories} brands={brands}>
      {selectedVariation && (
        <div className='container   text-center sm:text-left lg:px-5 py-10 mx-auto'>
          <div className='flex flex-wrap '>
            <div className='w-full lg:w-1/2'>
              <EmblaCarousel slides={product.images} />
            </div>
            <div className='lg:w-1/2 w-full lg:pl-10 lg:py-2  mt-6 lg:mt-0 border-b-2 border-gray-200'>
              <h2 className='text-sm title-font text-gray-500 tracking-widest'>
                {product.brand.name}
              </h2>
              <h1 className='text-gray-900 text-3xl title-font font-medium mb-1'>
                {product.name}
              </h1>
              <p className='break-words'>{product.description}</p>
              <div className=' mt-2 items-center '>
                <div className='my-2'>
                  <p className='title-font  font-medium text-lg text-gray-900'>
                    Cor
                  </p>
                  <div className='flex items-center justify-center sm:justify-start'>
                    {Object.keys(possibleColors).map(item => (
                      <div
                        className='flex flex-col '
                        key={possibleColors[item].name}
                      >
                        <div className='mr-2'>
                          <p className='capitalize text-xs text-gray-400 my-1'>
                            {possibleColors[item].name}
                          </p>
                          <button
                            onClick={() => {
                              setColorSelected(possibleColors[item].name)
                              setSizeSelected('')
                            }}
                            style={{
                              backgroundColor: possibleColors[item].code,
                            }}
                            className={`${
                              selectedVariation &&
                              selectedVariation.color.colorName ===
                                possibleColors[item].name
                                ? 'border-red-300'
                                : 'border-gray-400'
                            } border-2  ml-1  rounded-full w-6 h-6 focus:outline-none`}
                          ></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='flex flex-col my-2'>
                  <span className='title-font  font-medium text-lg text-gray-900'>
                    Tamanho
                  </span>
                  {product.sizeType === 'clothes' && (
                    <div className='relative'>
                      {clothesSizes.map(size => (
                        <button
                          key={size}
                          onClick={() =>
                            sizeIsAvailable(size) && setSizeSelected(size)
                          }
                          className={`mr-2 my-1 ${
                            sizeIsAvailable(size)
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-blue-400 before:'
                          } ${
                            selectedVariation &&
                            selectedVariation.size === size &&
                            'border-2 border-red-300 rounded'
                          } py-2 px-2 rounded  font-bold text-xs`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  )}
                  {product.sizeType === 'shoes' && (
                    <div className='relative'>
                      {shoesSizes.map(size => (
                        <button
                          key={size}
                          onClick={() =>
                            sizeIsAvailable(size) && setSizeSelected(size)
                          }
                          className={`mr-2 my-1 ${
                            sizeIsAvailable(size)
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-blue-400 before:'
                          } ${
                            selectedVariation &&
                            selectedVariation.size === size &&
                            'border-2 border-red-300 rounded'
                          } py-2 px-2 rounded  font-bold text-xs`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  )}
                  {product.sizeType === 'measures' && (
                    <div className='relative'>{selectedVariation.size}</div>
                  )}
                  {product && product.voltage && product.voltage.length > 0 && (
                    <div className='flex flex-col my-2'>
                      <span className='title-font  font-medium text-lg text-gray-900'>
                        Tensão elétrica:
                      </span>
                      <div className='relative'>
                        {product.voltage.map(volt => (
                          <button
                            onClick={() => setVoltageSelected(volt)}
                            key={volt}
                            className={`${
                              voltageSelected === volt
                                ? 'border-2 border-orange-500 rounded'
                                : 'border-2 border-orange-300 rounded'
                            }
                          mr-2 my-1  
                              
                             py-2 px-2 rounded  font-bold text-xs`}
                          >
                            {volt}
                          </button>
                        ))}
                      </div>
                      {voltageSelected === '' && (
                        <p className='text-sm font-medium text-yellow-700'>
                          Por favor, escolhe a tensão elétrica
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <div className='flex justify-center sm:justify-start'>
                  <p className='mr-3 title-font  font-medium text-base text-black'>
                    Peso:{' '}
                    <span className='font-light'>
                      {selectedVariation && selectedVariation.weight} (gramas)
                    </span>
                  </p>
                  <p className='mr-3 title-font  font-medium text-base text-gray-900'>
                    Em estoque:{' '}
                    <span className='font-light'>
                      {selectedVariation && selectedVariation.stock}
                    </span>
                  </p>
                </div>
              </div>
              <div className='flex flex-col sm:flex-row my-2 '>
                <p className='title-font font-medium  text-4xl text-gray-900'>
                  R$ {selectedVariation && selectedVariation.price}
                </p>
                {isOnCart
                 ? (
                  <button
                    onClick={ removeFromCart}
                    className='w-full sm:w-60 text-center my-3 sm:my-0 ml-auto text-white bg-indigo-400 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded'
                  >
                    Remover do carrinho
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      cart.addToCart(
                        product,
                        selectedVariation,
                        voltageSelected,
                      )
                    }
                    disabled={
                      product &&
                      product.voltage.length > 0 &&
                      voltageSelected === ''
                    }
                    className='w-full sm:w-60 text-center my-3 sm:my-0 ml-auto text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded'
                  >
                    {product &&
                    product.voltage.length > 0 &&
                    voltageSelected === ''
                      ? 'Selecione a tensão eletrica'
                      : 'Adicionar ao carrinho'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
export async function getServerSideProps(context) {
  const { product } = await fetcher(GET_PRODUCT_BY_SLUG, {
    slug: context.query.slug,
  })
  const { categories } = await fetcher(GET_ALL_CATEGORIES)
  const { brands } = await fetcher(GET_ALL_BRANDS)

  return {
    props: {
      product,
      categories,
      brands,
    },
  }
}
export default Products
