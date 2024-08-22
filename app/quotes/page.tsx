'use client'

import { useEffect, useState } from "react";

const Quotes=()=>{

    const [Quote,setQuotes] = useState<any>([])


    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch("/api/quotes");
            const data = await response.json();
            console.log(data);
            setQuotes(data);
          } catch (error) {
            console.error('Failed to fetch quotes:', error);
          }
        }
        fetchData();
      }, []);
return(
    <>
     <div className="z-10 w-full p-3 mt-20  items-center justify-between font-mono text-sm flex flex-col lg:flex">
     <div>
            <p  className="text-4xl text-black">Make your  day with inspiring quotes</p>

        </div>

     <div className="rounded-lg border mt-9 p-8 bg-blue-200 gap-20 mx-5  w-1/2 flex items-center flex-col justify-center ">
          {Quote.map((quote: any) => (
            <div key={quote.id} className="mx-5 text-black">
              <div className="flex flex-col ">
                <div  className="text-xl  font-sans">{quote.q}</div>
               <div  className="flex items-end justify-end text-sm text-gray-700">-{quote.a}</div> 
              </div>
 
            </div>
          ))}
        </div>
 
    </div>
    </>
)

}


export default Quotes;