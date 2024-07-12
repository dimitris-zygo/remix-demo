import type {LoaderFunction, MetaFunction} from "@remix-run/node";
import {Form, Link, useLoaderData} from "@remix-run/react";
import {Film, getFilms} from "~/api/films";

//Server side
export const loader: LoaderFunction = async ({request}) => {
  const url = new URL(request.url);
  const title = url.searchParams.get('title');
  return getFilms(title);
}

export const meta: MetaFunction = () => {
  return [
    { title: "Demo App" },
    { name: "description", content: "Just a random description" },
  ];
};

export default function _index() {
        const films = useLoaderData<Film[]>();
        return (
        <div className="px-6">
          <Form reloadDocument method='get' className="py-5 space-x-2">
            <label className="font-bold space-x-2">
              <span>Search</span>
              <input type="text" name="title" placeholder="type a title..." className="border-2 rounded py-2 px-3"/>
            </label>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
              Search
            </button>
          </Form>
          <div className="grid grid-cols-4 gap-4">
            {films.map((f) => (
                <Link title={f.title} key={f.id} to={`film/${f.id}`} prefetch="intent" className="cursor-pointer hover:scale-105 flex flex-col justify-center items-center transform transition-transform duration-300">
                  <span>{f.title}</span>
                  <img src={f.image} alt={f.title} className="h-56"/>
                </Link>))}
          </div>
        </div>
  );
}
