import React from 'react'
import NavBar from '@/components/navbar/Navbarlp'
import Footer from '@/components/footer/Footer'
import Review from '@/components/landingPage/Review'
import CardCourse from '@/components/landingPage/CardCourse'
import Download from '@/components/landingPage/Download'
import { getAllCourse } from '@/utils/fetch'
import Home from '@/components/landingPage/Home'

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
