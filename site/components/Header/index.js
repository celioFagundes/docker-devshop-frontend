import { useState} from 'react'
import Link from 'next/link'
import { RiShoppingBag3Fill } from 'react-icons/ri'
import { AiOutlineCaretDown} from 'react-icons/ai'
import { useCart } from '../../lib/CartContext'
import CartPreview from '../CartPreview'

const Header = ({ categories, brands }) => {
  const cart = useCart()
  const [menuCategories, setMenuCategories] = useState(false)
  const [menuBrands, setMenuBrands] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  const openCategoriesMenu = () => {
    setMenuCategories(!menuCategories)
    setMenuBrands(false)
  }
  const openBrandsMenu = () => {
    setMenuBrands(!menuBrands)
    setMenuCategories(false)
  }
  return (
    <header className='text-white bg-blue-700 body-font'>
      <div className='container  mx-auto flex flex-wrap px-1 xs:px-5 py-2 md:p-5 flex-row justify-between items-center'>
        <div className='flex items-center justify-between'>
          <Link href='/'>
            <a className='flex title-font font-medium items-center text-gray-900  md:mb-0'>
              <div className='bg-blue-500 px-2 py-2 rounded-full'>
                <RiShoppingBag3Fill color='#fff' size={22} />
              </div>
              <span className='ml-3  text-xl md:text-3xl text-white'>
                DevShop
              </span>
            </a>
          </Link>

          <nav className='md:ml-5 md:mr-auto flex flex-wrap flex-row items-center text-base justify-center '>
            <div className='relative'>
              <button
                onClick={openCategoriesMenu}
                className='rounded-lg text-sm px-2 md:px-4 font-medium uppercase text-center inline-flex items-center hover:text-gray-300'
                type='button'
              >
                Categorias{' '}
                <AiOutlineCaretDown
                  size={12}
                  className='hidden xs:block ml-1'
                />
              </button>
              <div
                className={`${
                  menuCategories ? 'sm:absolute' : 'hidden'
                } top-14 sm:top-10 left-0 fixed w-full sm:right-0  sm:left-0 z-10 sm:w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow `}
              >
                <ul className='flex flex-wrap flex-row w-full py-3'>
                  {categories?.map(category => (
                    <li
                      className='sm:w-full  hover:bg-blue-100 px-4 hover:cursor-pointer'
                      key={category.id}
                      onClick={() => setMenuCategories(false)}
                    >
                      <Link href={`/categoria/${category.slug}`}>
                        <a className='font-medium text-blue-900'>
                          {category.name}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='relative'>
              <button
                onClick={openBrandsMenu}
                className='rounded-lg text-sm px-1 md:px-4 font-medium uppercase  text-center inline-flex items-center hover:text-gray-300'
                type='button'
              >
                Marcas{' '}
                <AiOutlineCaretDown
                  size={12}
                  className='ml-1 hidden xs:block'
                />
              </button>
              <div
                className={`${
                  menuBrands ? 'sm:absolute' : 'hidden'
                } top-14 sm:top-10 left-0 fixed w-full sm:right-0  sm:left-0 z-10 sm:w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow `}
              >
                <ul className='flex flex-wrap flex-row w-full py-3'>
                  {brands?.map(brand => (
                    <li
                      className='sm:w-full  hover:bg-blue-100 px-4 hover:cursor-pointer'
                      key={brand.id}
                      onClick={() => setMenuBrands(false)}
                    >
                      <Link href={`/marca/${brand.slug}`}>
                        <a className='font-medium text-blue-900'>
                          {brand.name}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      <CartPreview />
      </div>
    </header>
  )
}

export default Header
