import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './Thumb'

const EmblaCarousel = ({ slides }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false })
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    selectedClass: '',
    dragFree: true,
  })

  const onThumbClick = useCallback(
    index => {
      if (!embla || !emblaThumbs) return
      if (emblaThumbs.clickAllowed()) embla.scrollTo(index)
    },
    [embla, emblaThumbs],
  )

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return
    setSelectedIndex(embla.selectedScrollSnap())
    emblaThumbs.scrollTo(embla.selectedScrollSnap())
  }, [embla, emblaThumbs, setSelectedIndex])

  useEffect(() => {
    if (!embla) return
    onSelect()
    embla.on('select', onSelect)
  }, [embla, onSelect])

  useEffect(() =>{
    embla&& embla.reInit()
  },[slides])
  return (
    <>
      <div className='embla '>
        <div className='embla__viewport bg-white' ref={mainViewportRef}>
          <div className='embla__container '>
            {slides ? (
              slides.map((item, index) => (
                <div className='embla__slide' key={index}>
                  <div className='embla__slide__inner'>
                    <img
                      className='embla__slide__img'
                      src={item}
                      alt='A cool cat.'
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className='embla__slide'>
                <div className='embla__slide__inner'>
                  <img
                    className='embla__slide__img'
                    src='https://dummyimage.com/420x260'
                    alt='sem imagem do produto'
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='embla embla--thumb'>
        <div className='embla__viewport' ref={thumbViewportRef}>
          <div className='embla__container embla__container--thumb'>
            {slides && slides.length > 1 &&
              slides.map((item, index) => (
                <Thumb
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
                  imgSrc={item}
                  key={index}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default EmblaCarousel
