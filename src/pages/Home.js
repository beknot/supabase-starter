import { useEffect, useState } from 'react'
import supabase from '../config/supabaseClient'

const Home = () => {
  // console.log(supabase)
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from('smoothies').select()
      if (error) {
        setFetchError('Could not fetch smoothies')
        setSmoothies(null)
        console.log(error)
      }
      if (data) {
        setSmoothies(data)
        setFetchError(null)
      }
    }
    fetchSmoothies()
  }, [])

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (
        <ul>
          {smoothies.map(smoothie => (
            <p key={smoothie.id}>{smoothie.title}</p>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Home