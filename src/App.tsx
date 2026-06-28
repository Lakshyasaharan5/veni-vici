import { useState } from "react"

const cats = [
    {
        name: "Oliver",
        breed: "Scottish Fold",
        weight: "5 - 11 lbs",
        country: "United Kingdom",
        age: "11 - 14 years",
        img: "https://placecats.com/300/300"
    },
    {
        name: "Tom",
        breed: "Irish",
        weight: "6 - 10 lbs",
        country: "Ireland",
        age: "11 - 14 years",
        img: "https://placecats.com/300/300"
    },
    {
        name: "Patch",
        breed: "English",
        weight: "5 - 11 lbs",
        country: "United States",
        age: "11 - 14 years",
        img: "https://placecats.com/300/300"
    }
]

function App() {
    const [cat, setCat] = useState(cats[0]);
    const attributesArray = [cat.breed, cat.weight, cat.age]
    function pickRandomCat() {
        const rand = Math.floor(Math.random() * 3);
        setCat(cats[rand]);
    }
    return (
        <div className="min-h-screen flex">
            <div className="border-2 flex-1 flex flex-col gap-2 items-center">
                <h1>Veni Vici!</h1>
                <p>Discover cats from your wildest dreams!</p>
                <p>😹😻😹😻😹😻</p>
                <h2>{cat.name}</h2>
                <div className="flex gap-2">
                    {
                        attributesArray.map((value) => {
                            return <p key={value} className="px-4 py-2 rounded-md bg-yellow-600 text-white border-none">{value}</p>
                        })
                    }
                    <button className="px-4 py-2 rounded-md bg-yellow-600 text-white border-none cursor-pointer">{cat.country}</button>
                </div>
                <img alt="cat image" src={cat.img} />
                <button
                    className="bg-gray-800 text-white px-4 py-2 rounded-md cursor-pointer"
                    onClick={pickRandomCat}
                >
                    Discover
                </button>
            </div>
            <div className="border-2 w-40 flex flex-col gap-2 items-center">
                <h1>Ban List</h1>
                <button className="px-4 py-2 rounded-md bg-red-300 text-white border-none cursor-pointer">country</button>
                <button className="px-4 py-2 rounded-md bg-red-300 text-white border-none cursor-pointer">country</button>
            </div>
        </div>
    )
}

export default App