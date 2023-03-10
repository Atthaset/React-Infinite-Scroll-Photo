import './App.css'
import { useEffect, useState } from "react"
import PhotoComponent from "./Components/PhotoComponent"

function App() {

  const apiKEY = `I21raOAHFMouH9nxY8XdqBus9OGhYOf1wgdqmVPRNUU`
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const fetchImage = async () => {
    setLoading(true)
    try {
      const apiURL = `https://api.unsplash.com/photos/?client_id=${apiKEY}&page=${page}`
      //awiat = ต้องรอข้อมูลวิ่งมาก่อน(fetch) ค่อยไปทำคำสั่งอื่น
      const response = await fetch(apiURL)
      const data = await response.json()
      setPhotos((oldData)=>{
        return [...oldData,...data]//นำภาพใหม่ต่อกับภาพเดิม
      })
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  }

  //เมื่อโหลดหน้าใหม่
  useEffect(() => {
    fetchImage()
    // eslint-disable-next-line
  }, [page])//page เปลี่ยนให้ fetch ใหม่

  useEffect(() => {

    //เมื่อทำการ scroll
    const event = window.addEventListener('scroll', () => {
      //window.innerHeight = ความสูง window ในตอนนั้น
      //window.scrollY = ค่าที่เรา scroll ลงมา
      //offsetHeight = ความสูงต่ำสุด Y ใกล้ 0 
      if (window.innerHeight + window.scrollY > document.body.offsetHeight - 500 && !loading) {
        setPage((oldPage) => {
          return oldPage + 1
        })
      }
    })

    //เมื่อยกเลิกการ scroll
    return () => window.removeEventListener('scroll', event)
    // eslint-disable-next-line
  }, [])//[]โหลดหน้า render หน้า App

  return (
    <main>
      <h1>Infinite Photos | Unsplash API</h1>
      <section className="photos">
        <div className="display-photo">
          {photos.map((data, index) => {
            return <PhotoComponent key={index} {...data} />
          })}
        </div>
      </section>
    </main>
  )
}

export default App
