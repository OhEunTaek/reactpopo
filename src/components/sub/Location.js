import SubLayout from '../common/SubLayout'
import { useRef, useEffect, useState } from 'react'

function Location() {
  const subtitle = {
    title: 'Contact support',
    p: 'For specific account or billing questions, security concerns, or answers not available on our help site, we’re happy to help.',
  }
  const { kakao } = window
  const mapBox = useRef(null)
  const button = useRef(null)

  const mapInfos = [
    {
      title: 'Pangyoyeok',
      address: '160, Pangyoyeok-ro, Bundang-gu, Seongnam-si, Gyeonggi-do',
      phone: '+82 031-8018-7750',
      latlng: new kakao.maps.LatLng(37.394776, 127.11116),
    },
    {
      title: 'Sinnonhyeon',
      address: '102, Bongeunsa-ro, Gangnam-gu, Seoul, Republic of Korea',
      phone: '+82 02-2656-0925',
      latlng: new kakao.maps.LatLng(37.5037059, 127.0241346),
    },
  ]

  const [Index, setIndex] = useState(0)

  const mapOption = {
    center: mapInfos[Index].latlng,
    level: 3,
  }

  const imgSrc = process.env.PUBLIC_URL + '/img/trello-map-icon.svg'
  const imgSize = new kakao.maps.Size(30, 30)
  const imgOption = { offset: new kakao.maps.Point(15, 30) }
  const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize, imgOption)

  const marker = new kakao.maps.Marker({
    position: mapOption.center,
    image: markerImage,
  })

  useEffect(() => {
    mapBox.current.innerHTML = ''
    const map = new kakao.maps.Map(mapBox.current, mapOption)
    marker.setMap(map)

    const handleResize = () => {
      map.setCenter(mapInfos[Index].latlng)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [Index])

  return (
    <SubLayout name={'location'} sub={subtitle}>
      <div id="map" ref={mapBox}></div>
      <div className="map-info-list">
        {mapInfos.map((item, i) => {
          return (
            <div key={i} className="map-info-item">
              <strong>{item.title}</strong>
              <address>{item.address}</address>
              <a href={`tel:${item.phone.split('+')[1].replace(/(\s*)/g, '')}`}>
                {item.phone}
              </a>
              <button
                type="button"
                ref={button}
                onClick={() => {
                  setIndex(i)
                }}
              >
                check on a map
              </button>
            </div>
          )
        })}
      </div>
    </SubLayout>
  )
}

export default Location
