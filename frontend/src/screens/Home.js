import React, { useContext } from 'react'
import { PhoneContext } from '../context/phone'
import Phone from '../components/Phone'
import Loading from '../components/Loading'
import Error from '../components/Error'

function Home({ match }) {
  const keyword = match.params.keyword
  const phoneContext = useContext(PhoneContext, keyword)
  const {
    ephones_loading: loading,
    ephones,
    ephones_error: error,
  } = phoneContext
  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }
  return (
    <section className="ephones">
      {ephones.map((ephone) => (
        <div key={ephone._id}>
          <Phone ephone={ephone} />
        </div>
      ))}
    </section>
  )
}

export default Home
