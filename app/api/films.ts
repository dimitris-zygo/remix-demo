export type Film = {
    description:string;
    director:string;
    id:string;
    image:string;
    locations:string[];
    movie_banner:string;
    original_title:string;
    original_title_romanised:string;
    people:string[];
    producer:string;
    release_date:string;
    rt_score:string;
    running_time:string;
    species:string[];
    title:string;
    url:string;
    vehicles:string[];
}

export async function getFilms(title?:string | null) {
    const response  = await fetch("https://ghibli.rest/films");

    const films: Film[] = await response.json();
    return films.filter((film) => title ? film.title.toLowerCase().includes(title.toLowerCase()):true);
}

export async function getFilmById(filmId:string) {
    const response = await fetch(`https://ghibli.rest/films?id=${filmId}`);
    const film: Film = await response.json();
    return film;
}
