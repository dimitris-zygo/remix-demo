import {
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import {json} from "@remix-run/node";


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

function Footer() {
    return (
        <footer className="flex-col items-center justify-center text-center text-white">
            <main className="bg-[#4073AF]">
                <div className="grid grid-cols-3 grid-rows-1 gap-x-10 py-6 px-2 sm:px-6">
                    <div className="space-y-4">
                        <h2>Placeholder 1</h2>
                        <div>
                            <p>Text 1</p>
                            <p>Text 2</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h2>Placeholder 2</h2>
                        <div>
                            <p>Text 1</p>
                            <p>Text 2</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h2>Placeholder 3</h2>
                        <div>
                            <p>Text 1</p>
                            <p>Text 2</p>
                        </div>
                    </div>
                </div>
            </main>
            <div className="bg-[#004494] flex items-center justify-evenly p-2">
                <p>About</p>
                <p>Contact</p>
                <p>Placeholder</p>
            </div>
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
        <Footer/>
        <ScrollRestoration/>
        <Scripts/>
        </body>
        </html>
    );
}
