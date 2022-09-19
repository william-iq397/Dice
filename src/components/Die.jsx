import React from 'react'
// import '../index.css'


export default function Die({ value, held, holdDice}) {

    const styles = {
        backgroundColor: held ?  "#59E391" : "white"
    }
    
    return (
        <div
            style={styles}
            onClick={holdDice}
            className="die-face cursor-pointer w-full h-12 rounded-md shadow-xl shadow-slate-100 flex justify-center items-center bg-white"
        >
            <h2 className="die-num text-2xl text-black font-black">{value}</h2>
        </div>
    )
}

