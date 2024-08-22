import { NextResponse } from "next/server"


export async function GET(){
  
    const res = await fetch('https://www.arbeitnow.com/api/job-board-api')
if(!res.ok){
    throw new Error('Failed to fetch')
}
const data = await res.json()


return NextResponse.json(data, {status: 200})

}