import {LoaderFunction, MetaFunction} from "@remix-run/node";
import {getFilmById} from "~/api/films";
import {useLoaderData} from "@remix-run/react";

export const loader:LoaderFunction = async ({params}) => {
    return await getFilmById(params.id!);
}

export const meta: MetaFunction<typeof loader> = ({data}) => {
    const title = data?.[0].title;
    const description = data?.[0].description
    return [{title:`${title} | Films`, description:description}]
}

export default function Film(){
    const [film] = useLoaderData();
    return (
        <div className="max-w-44 bg-gray-500 m-2 rounded-lg flex flex-col items-center justify-center">
            <h2 className="p-2 text-white">{film.title}</h2>
            <img src={film.image} alt="" className="rounded-b-lg"/>
        </div>
    )
}
