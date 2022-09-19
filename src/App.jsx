import React, { useState, useEffect } from 'react'
import Die from "./components/Die"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


export default function App() {
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)



    //generate a random number with call to the (allNewDice, rollDice) functions
    function randomNumber() {
        return Math.floor(Math.random() * 6)
    }

    useEffect(() => {
        const firstValue = dice[0].value
        const allValues = dice.every(die => die.value === firstValue)
        const allHeld = dice.every(die => die.held)
        if (allValues && allHeld) {
            setTenzies(true)
        }
    }, [dice])
    
    //loop through the buttons and give them an (id , value, guard that show them green or white)
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            const newDie = {
                value: randomNumber(),
                held: false,
                id: nanoid()
            }
            newDice.push(newDie)
        }
        return newDice
    }

    // present the numbers into the screen
    const diceElements = dice.map(die => (
        <Die
            key={die.id}
            value={die.value}
            held={die.held}
            holdDice={() => holdDice(die.id)}
            id={die.id}
        />
    ))

    //make the button green when it's clicked
    function holdDice(id) {
        setDice(diceArray => (
            diceArray.map(dieObj => (
                dieObj.id === id ? 
                {...dieObj, held: !dieObj.held}
                : dieObj 
            ))
        ))
    }

    // changing the none-holden numbers (value, id)
    function rollDice() {
        setDice(prevDice => (
            prevDice.map(diceObj => (
                diceObj.held // اذا الرقم لونة اخضر
                ? diceObj // من اريد اعرض ارقام جديدة بقي الرقم لونة اخضر
                : {...diceObj, value: randomNumber(), id: nanoid()} // بخلاف هذا غير الرقم
            ))
        ))
    }

    //Reset the game
    function Reset() {
        setDice(prevArray =>(
            prevArray.map(dieObj => (
                {...dieObj, value: randomNumber(), held: false,id: nanoid()}
            ))
        ))
        setTenzies(false)
    }
    
    return (
        <main className='p-5 w-96 h-96 rounded-md bg-slate-300 flex flex-col justify-around  items-center'>
            {tenzies && <Confetti/>}
            <div className=" w-full h-36 grid grid-cols-5 grid-rows-2 gap-x-5	">
                {diceElements}
            </div>
            <button
                onClick={ tenzies ? Reset : rollDice}
                className='w-24 h-14  rounded-md border-none font-black bg-purple-600 text-white'
            >{tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}