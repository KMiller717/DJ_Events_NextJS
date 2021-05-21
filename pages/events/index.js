import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout'
import Eventitem from '@/components/Eventitem'
import {API_URL} from '@/config/index'
import Link from 'next/link'

const PER_PAGE = 5

export default function EventsPage({events, total, page}) {
  
  const lastPage = Math.ceil(total/PER_PAGE)

  return (
    <Layout>
        <h1>Events</h1>
        {events.length === 0 && <h3>No events to show</h3>}

        {events.map(evt => (<Eventitem key={evt.id} evt={evt}/>))}

        {page > 1 && (
            <Link href={`/events?page=${page -1}`}>
                <a className='btn-secondary'>Prev</a>
            </Link>

        )}
        {page < lastPage && (
            <Link href={`/events?page=${page +1}`}>
            <a className='btn-secondary'>Next</a>
        </Link>
        )}
    </Layout>
    
  )
}


export async function getServerSideProps({query: {page=1}}){
    
    //Calculate start page
    const start = +page === 1 ? 0 :  (+page -1) * PER_PAGE
    //fetch total count
    const totalRes = await fetch(`${API_URL}/events/count`)
    const total = await totalRes.json()

    //fetch events
    const eventRes = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`)
    const events = await eventRes.json()

    return {
      
    props:{events, page: +page, total},
    
  }
}