import React from 'react'
import Fillform from '@/components/fillform/fillform'
const page = () => {
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50" >
       
        </div>
        <div className="aspect-video rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50" >
        <Fillform/>
        </div>
        <div className="aspect-video rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-zinc-100/50 md:min-h-min dark:bg-zinc-800/50">
       
      </div>
    </>
  )
}

export default page