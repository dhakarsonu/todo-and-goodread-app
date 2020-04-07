import React from 'react';
export default function Book(props){
    var {best_book} = props.book;
    return (
        <div className="card-book" key={props.book.id}>
            <header>
                <div className="top">
                    <span>{best_book.title}</span>
                </div>
                <div className="bottom">
                <span>Rattings : {props.book.average_rating}</span>
                <code>Published in : {props.book.original_publication_year}</code>
                </div>
            </header>
            <main>
                <img src={best_book.image_url}/>
            </main>
            <footer>
                <span>Author : {best_book.author.name}</span>
            </footer>
        </div>
    )
}