import {
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";

function Header(){
    return (
        <div className="bg-gray-700 text-white p-4">
            <Link prefetch="intent" to="/">
                Home
            </Link>
        </div>
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
      <Outlet/>
      <ScrollRestoration/>
      <Scripts/>
      </body>
      </html>
  );
}
