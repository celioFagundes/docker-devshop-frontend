import { RiErrorWarningLine, RiCloseFill } from 'react-icons/ri'

const Modal = ({
  visible,
  itemId,
  confirmFunction,
  closeFunction,
  type = 'remove',
}) => {
  return (
    <div
      className={`${
        visible ? ' ' : 'hidden'
      } fixed top-0 left-0  h-screen w-screen bg-black bg-opacity-60 z-50 flex flex-row items-center justify-center`}
    >
      <div className='overflow-y-auto overflow-x-hidden  z-50 flex justify-center items-center md:inset-0 h-modal sm:h-full'>
        <div className='relative px-4 w-full max-w-md h-full md:h-auto'>
          <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            <div className='flex justify-end p-2'>
              <button
                type='button'
                onClick={closeFunction}
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
              >
                <RiCloseFill color='#fff' size={24} />
              </button>
            </div>

            <div className='p-6 pt-0 text-center'>
              <div className='w-full flex justify-center my-4'>
                <RiErrorWarningLine color='#fff' size={62} />
              </div>
              <h3 className='mb-5 text-lg font-normal text-gray-200'>
                {type === 'remove' &&
                  'Tem certeza que deseja excluir este item? '}
                {type === 'edit' && 'Deseja salvar as alterações neste item?'}
                {type === 'create' &&
                  'Tem certeza que deseja criar este item ?'}
                {type === 'invalidate' &&
                  'Tem certeza que deseja invalidar esta sessão ?'}
              </h3>
              <button
                type={(type === 'remove' ||  type === 'invalidate') ? 'button' : 'submit'}
                onSubmit={closeFunction}
                onClick={() => (type === 'remove' ||  type === 'invalidate') && confirmFunction(itemId)}
                className={`${
                  (type === 'remove' || type === 'invalidate')
                    ? 'bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300'
                    : 'bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300'
                } text-white font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2`}
              >
                Sim, tenho certeza
              </button>
              <button
                type='button'
                onClick={closeFunction}
                className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600'
              >
                Não. cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
