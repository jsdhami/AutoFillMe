'use client'
 
import { usePathname } from 'next/navigation'
 
export default function CurrentPathName() {
  const pathname = usePathname()
    // extract last one path name

    const cpathName = pathname.split('/').pop() || ''
    const pathName = cpathName.charAt(0).toUpperCase() + cpathName.slice(1)
    if (pathName === 'Dashboard') {
        return 'Home'
    }
    return pathName
}