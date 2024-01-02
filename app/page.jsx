import React from 'react'
import NavBar from '@/components/navbar/Navbarlp'
import Footer from '@/components/footer/Footer'
import Review from '@/components/landingPage/Review'
import CardCourse from '@/components/landingPage/CardCourse'
import Home from '@/components/LandingPage/Home'
import Download from '@/components/landingPage/Download'
import { getAllCourse } from '@/utils/fetch'

const LandingPage = async () => {
  const getCourseData = await getAllCourse()
  const courses = getCourseData.data

  return (
    <section className="overflow-x-hidden font-Montserrat">
      <NavBar />
      <Home />
      <CardCourse courses={courses} />
      <Review />
      <Download />
      <Footer />
    </section>
  )
}

export default LandingPage
