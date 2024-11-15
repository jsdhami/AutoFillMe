import React from 'react'
import { Input } from '@/components/ui/input'
import { TotalUploaded } from '@/components/charts/totalUploaded/totalUploaded'
const page = () => {
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50" >
        <TotalUploaded />
        
        </div>
        <div className="aspect-video rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50" />
        <div className="aspect-video rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-zinc-100/50 md:min-h-min dark:bg-zinc-800/50">
        <Input id="picture" type="file" className='flex md:min-h-min bg-transparent min-h-[100vh] w-full border border-dashed border-gray-800 ' />
      </div>
    </>
  )
}

export default page