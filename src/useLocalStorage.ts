import { useEffect, useState } from "react";

//checking if value is present in local storage & if it is present, update it & store it
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)){
    //custom hook
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if(jsonValue == null){
            if(typeof initialValue == "function"){
                return (initialValue as () => T)()
            }else{
                return initialValue
            }
        }else{
            return JSON.parse(jsonValue)
        }
    })

    useEffect (() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue] as [T, typeof setValue] //defining type of both states
} 