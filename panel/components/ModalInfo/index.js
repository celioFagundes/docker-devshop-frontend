import { RiCloseFill } from 'react-icons/ri'

const ModalInfo = ({ visible, item, closeFunction }) => {
  console.log(item)
  return (
    <div
      className={`${
        visible ? ' ' : 'hidden'
      } fixed top-0 left-0  h-screen w-screen bg-black bg-opacity-60 z-50 flex flex-row items-center justify-center`}
    >
      <div className='overflow-y-auto overflow-x-hidden  z-50 flex justify-center items-center md:inset-0 h-modal sm:h-full'>
        <div className='relative px-4 w-full max-w-md h-full md:h-auto'>
          <div className='relative bg-white rounded-lg shadow dark:bg-darkBlack'>
            <div className='flex justify-end '>
              <button
                type='button'
                onClick={closeFunction}
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
              >
                <RiCloseFill color='#fff' size={24} />
              </button>
            </div>
            <div className='p-6  text-start bg-lightBlack'>
              {item && (
                <div className='text-white'>
                  <p className='text-primary font-medium'>Name:</p>
                  <span className=''>{item.name}</span>
                  <p className='text-primary font-medium'>Description:</p>
                  <span className=' break-words'>{item.description}</span>
                  <p className='text-primary font-medium'>Price:</p>
                  <span className=''>{item.price}</span>
                  <div className='flex items-center justify-start'>
                    <div className='mr-4'>
                      <p className='text-primary font-medium '>Brand:</p>
                      <span className=''>{item.brand.name}</span>
                    </div>
                    <div>
                      <p className='text-primary font-medium'>Category:</p>
                      <span className=''>{item.category.name}</span>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-primary font-medium'>Gender:</p>
                      <span className=''>{item.gender}</span>
                    </div>
                    <div>
                      <p className='text-primary font-medium'>Material:</p>
                      <span className='pl-2 '>{item.material}</span>
                    </div>
                    <div>
                      <p className='text-primary font-medium'>Color:</p>
                      <span className='pl-2 '>{item.color.colorName}</span>
                    </div>
                  </div>

                  <p className='text-primary font-medium'>Slug:</p>
                  <span className='pl-2 '>{item.slug}</span>
                  <div>
                    <p className='text-primary font-medium'>Variations:</p>
                    {Object.keys(item.variations).map(variation => (
                      <div className='flex items-center justify-between'>
                        <div>
                          <p className='text-primary font-medium'>SKU:</p>
                          <span className=''>
                            {item.variations[variation].sku}
                          </span>
                        </div>

                        <div>
                          <p className='text-primary font-medium'>Size:</p>
                          <span className=''>
                            {item.variations[variation].size}
                          </span>
                        </div>
                        <div>
                          <p className='text-primary font-medium'>Weight:</p>
                          <span className=''>
                            {item.variations[variation].weight}
                          </span>
                        </div>
                        <div>
                          <p className='text-primary font-medium'>Stock:</p>
                          <span className=''>
                            {item.variations[variation].stock}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalInfo
