import { useState } from "react"

type Cat = {
    breed: string,
    weight: string,
    country: string,
    age: string,
    img: string
}

const API_KEY = import.meta.env.VITE_CAT_API_KEY;

function App() {
    const [cat, setCat] = useState<Cat | null>(null);
    const [bansList, setBansList] = useState<string[]>([]);

    async function discoverCat() {
        let newCat: Cat | null = null;
        while (!newCat) {
            const res = await fetch(
                "https://api.thecatapi.com/v1/images/search?has_breeds=1&limit=1",
                { headers: { "x-api-key": API_KEY } }
            );
            const data = await res.json();
            const apiCat = data[0];
            const breed = apiCat.breeds[0];
            const country = breed.origin;

            if (!bansList.includes(country)) {
                newCat = {
                    breed: breed.name,
                    country: country,
                    weight: breed.weight.imperial + " lbs",
                    age: breed.life_span + " years",
                    img: apiCat.url,
                };
            }
        }
        setCat(newCat);
    }

    function ban() {
        if (cat && !bansList.includes(cat.country))
            setBansList([...bansList, cat.country]);
    }

    function unban(country: string) {
        setBansList(bansList.filter((value) => value !== country));
    }

    if (!cat) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-2">
                <h1>Veni Vici!</h1>
                <button onClick={discoverCat} className="bg-gray-800 text-white px-4 py-2 rounded-md cursor-pointer">
                    Discover
                </button>
            </div>
        );
    }

    const attributesArray = [cat.weight, cat.age];

    return (
        <div className="min-h-screen flex">
            <div className="border-2 flex-1 flex flex-col gap-2 items-center">
                <h1>Veni Vici!</h1>
                <p>Discover cats from your wildest dreams!</p>
                <p>😹😻😹😻😹😻</p>
                <h2>{cat.breed}</h2>
                <div className="flex gap-2">
                    {attributesArray.map((value) => (
                        <p key={value} className="px-4 py-2 rounded-md bg-yellow-600 text-white border-none">{value}</p>
                    ))}
                    <button onClick={ban} className="px-4 py-2 rounded-md bg-yellow-600 text-white border-none cursor-pointer">{cat.country}</button>
                </div>
                <img alt="cat" src={cat.img} className="w-72 h-72 object-cover" />
                <button onClick={discoverCat} className="bg-gray-800 text-white px-4 py-2 rounded-md cursor-pointer">
                    Discover
                </button>
            </div>
            <div className="border-2 w-40 flex flex-col gap-2 items-center">
                <h1>Ban List</h1>
                {bansList.map((value) => (
                    <button key={value} onClick={() => unban(value)} className="px-4 py-2 rounded-md bg-red-300 text-white border-none cursor-pointer">
                        {value}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default App