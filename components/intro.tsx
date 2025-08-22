import Image from 'next/image'
import React from 'react'

export default function Intro() {
    return (
    <section>

        <div className="flex items-center justify-center ">
            <div> 
                <Image src={"/wordanalytics.png"} alt="Intro Image" width={500} height={500} className="rounded-lg shadow-lg" />
            </div>
        </div>


    </section>
    )
}
