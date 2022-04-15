import { RiCloseFill } from 'react-icons/ri'

const ModalInfo = ({ item, closeFunction }) => {
  return (
    <div
      className={` fixed top-0 left-0 overflow-y-auto h-screen w-screen bg-black bg-opacity-60 z-50 flex flex-row items-center justify-center`}
    >
      <div className='overflow-y-auto overflow-x-hidden  z-50 flex justify-center items-center md:inset-0 h-modal h-full'>
        <div className='relative px-4 w-full  h-full md:h-auto'>
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
                <div className='text-white flex items-start justify-start flex-wrap ' >
                  <div className='lg:max-w-sm mr-3'>
                    <p className='text-primary font-medium'>Name:</p>
                    <span >{item.name}</span>
                    <p className='text-primary font-medium'>Description:</p>
                    <span className='break-all'>{item.description}</span>
                    <p className='text-primary font-medium'>Price:</p>
                    <span>{item.price}</span>
                    <div className='flex items-center justify-start'>
                      <div className='mr-4'>
                        <p className='text-primary font-medium'>Brand:</p>
                        <span >{item.brand.name}</span>
                      </div>
                      <div>
                        <p className='text-primary font-medium'>Category:</p>
                        <span >{item.category.name}</span>
                      </div>
                    </div>
                    <div className='flex items-center justify-start'>
                      <div className='mr-4'>
                        <p className='text-primary font-medium'>Gender:</p>
                        <span >{item.gender}</span>
                      </div>
                      <div className='mr-4'>
                        <p className='text-primary font-medium'>Material:</p>
                        <span >{item.material}</span>
                      </div>
                      <div>
                        <p className='text-primary font-medium'>Color:</p>
                        <span >{item.color.colorName}</span>
                      </div>
                    </div>
                    <p className='text-primary font-medium'>Slug:</p>
                    <span>{item.slug}</span>
                  </div>
                  <div >
                    <p className='text-primary font-medium'>Variations:</p>
                    {Object.keys(item.variations).map(variation => (
                      <div key = {variation} className='flex items-center justify-between mb-3 border-b border-gray-600 pb-2'>
                        <div className='mr-3'>
                          <p className='text-primary font-medium'>SKU:</p>
                          <span >
                            {item.variations[variation].sku}
                          </span>
                        </div>

                        <div className='mr-3'>
                          <p className='text-primary font-medium'>Size:</p>
                          <span >
                            {item.variations[variation].size}
                          </span>
                        </div>
                        <div className='mr-3'>
                          <p className='text-primary font-medium'>Weight:</p>
                          <span >
                            {item.variations[variation].weight}
                          </span>
                        </div>
                        <div className='mr-3'>
                          <p className='text-primary font-medium'>Stock:</p>
                          <span>
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
