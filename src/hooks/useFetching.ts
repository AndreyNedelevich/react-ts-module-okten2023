import {useState} from "react";


export const useFetching = (callback:Function) => {

    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [error, setError] = useState<string|boolean>("");

    const fetching = async (arg:number) => {
        try {
            setIsLoading(true);
            await callback(arg);
        } catch (e:any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };
    return [fetching, isLoading, error];
};