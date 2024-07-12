import {
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration, useLoaderData,
} from "@remix-run/react";
import * as React from "react"
import "./tailwind.css";
import styles from "./styles.module.css";
import {json} from "@remix-run/node";
import classNames from "classnames";


async function fetchGraphQL(query,variables) {
    const endpoint = 'https://nextocasino.com/api/graphql';
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query,variables }),
    });

    if (!response.ok) {
        throw new Error(`Network error: ${response.statusText}`);
    }

    const json = await response.json();
    return json.data;
}

export async function loader() {
    const query = `
        query Brands($mobile: Boolean!) {
            brands(input: { mobile: $mobile }) {
                id
                name
                logos {
                    dark
                    light 
                }
            }
        }
    `;

    const variables = {
        mobile: true,
    };

    try {
        const data = await fetchGraphQL(query, variables);
        return json({ data });
    } catch (error) {
        console.error('Error fetching GraphQL data:', error);
        return json({ error: error.message }, { status: 500 });
    }
}

function Header() {
    return (
        <header className="bg-gray-700 text-white p-4">
            <Link prefetch="intent" to="/">
                Home
            </Link>
        </header>
    )
}

type BrandsType = {
    id:string;
    logos: {
        dark:string;
        light:string;
    };
    name:string;
}

function Providers({value}:{value:BrandsType[]}){
    return (
        <div className="divide-y divide-color-g -my-2">
            <div className={classNames("inline-flex", styles.logos)}
                 style={{
                     animationDuration: `${value.length * 2}s`,
                 }}>
                {[...Array(2).keys()].map((_, index) => (
                    <div className="inline-flex items-center space-x-4 py-2 text-white" key={index}>
                        {value.map((b) => (
                            <div className="w-28" key={b.name}>
                                {b.name}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

function Footer() {
    const {data} = useLoaderData<BrandsType[]>();
    return (
        <footer className="flex-col items-center justify-center text-center text-white bg-[#4073AF] py-4 max-w-screen overflow-hidden">
            <Providers value={data.brands}/>
        </footer>
    )
}

export default function App() {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>
        <body>
        <Header/>
        <div className="w-full min-h-screen mb-20">
            <Outlet/>
        </div>
        <React.Suspense>
            <Footer/>
        </React.Suspense>
        <ScrollRestoration/>
        <Scripts/>
        </body>
        </html>
    );
}
