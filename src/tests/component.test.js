import React from 'react';
import { render, getByPlaceholderText } from '@testing-library/react';
import Book from '../components/book';
import GoodReads from '../components/goodReads';
import Todo from '../components/todo';
import store from '../store';
import { Provider } from 'react-redux';

test('Book Component should be rendred', () => {
  const props = {
    book : {
      id: "878368",
      books_count: "325",
      ratings_count: "1717036",
      text_reviews_count: "108888",
      original_publication_year: "2005",
      original_publication_month: "9",
      original_publication_day: "1",
      average_rating: "4.37",
      best_book: {
          id: "19063",
          title: "The Book Thief",
          author: {
              id: "11466",
              name: "Markus Zusak"
          },
          image_url: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1522157426l/19063._SX98_.jpg",
          small_image_url: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1522157426l/19063._SY75_.jpg"
      }
    }
  }
  const { getByText } = render(<Book book={props.book} />);
  
  let spanElement = getByText(/The Book Thief/i);
  expect(spanElement).toBeInTheDocument();

  spanElement = getByText(/Author : Markus Zusak/i);
  expect(spanElement).toBeInTheDocument();

  spanElement = getByText(/Rattings : 4.37/i);
  expect(spanElement).toBeInTheDocument();

  spanElement = getByText(/Published in : 2005/i);
  expect(spanElement).toBeInTheDocument();

});

test('GoodReads Component should be rendred', () => {

  const { getByText,getByPlaceholderText } = render(<GoodReads />);

  let anchorTag = getByText(/Good Reads App/i);
  expect(anchorTag).toBeInTheDocument();

  const inputTag = getByPlaceholderText(/Search Book/i);
  expect(inputTag).toBeInTheDocument();

  anchorTag = getByText(/First/i);
  expect(anchorTag).toBeInTheDocument();

  anchorTag = getByText(/Last/i);
  expect(anchorTag).toBeInTheDocument();

  anchorTag = getByText(/Next/i);
  expect(anchorTag).toBeInTheDocument();

  anchorTag = getByText(/Previous/i);
  expect(anchorTag).toBeInTheDocument();

  inputTag.value = "Books";
  inputTag.nextElementSibling.click();

  setTimeout(()=>{
    let spanTag = getByText(/The Book Thief/i);
    expect(spanTag).toBeInTheDocument();
  },10000);

});

test('Todo Component should be rendred', () => {
  const { getByText,getByPlaceholderText } = render(
    <Provider store={store}>
      <Todo />
    </Provider>
  );
  
  //Basic Layout Check
  let anchorTag = getByText(/TODO App/i);
  expect(anchorTag).toBeInTheDocument();

  let spanTag = getByText(/ADD ITEMS/i);
  expect(spanTag).toBeInTheDocument();

  spanTag = getByText(/COMPLETED/i);
  expect(spanTag).toBeInTheDocument();

  let inputTag = getByPlaceholderText(/Type here.../i);
  expect(inputTag).toBeInTheDocument();


  //Adding Todo Items
  inputTag.value = "Tea";
  inputTag.nextElementSibling.click();

  spanTag = getByText(/Tea/i);
  expect(spanTag).toBeInTheDocument();

  anchorTag = getByText(/Delete/i);
  expect(anchorTag).toBeInTheDocument();

  anchorTag = getByText(/Edit/i);
  expect(anchorTag).toBeInTheDocument();

  //Edit Todo Item
  anchorTag.click();
  anchorTag = getByText(/Save/i);
  expect(anchorTag).toBeInTheDocument();

  inputTag = getByPlaceholderText(/Change item name/i);
  expect(inputTag).toBeInTheDocument();


  //Save todo item
  inputTag.value = "Banana";
  anchorTag.click();
  anchorTag = getByText(/Edit/i);
  expect(anchorTag).toBeInTheDocument();
  
  let labelTag = getByText(/Banana/i);
  expect(labelTag).toBeInTheDocument();


  //completing todo
  labelTag = getByText(/Banana/i);
  expect(labelTag).toBeInTheDocument();
  labelTag.previousElementSibling.click();
  
  setTimeout(()=>{
    expect(labelTag.classList.contains("complete")).toEqual(true);
  },0);



});