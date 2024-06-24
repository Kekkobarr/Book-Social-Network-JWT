import { Component, OnInit } from '@angular/core';
import { BorrowedBookResponse } from 'src/app/services/models';
import { PageResponseBorrowedBookResponse } from 'src/app/services/models/page-response-borrowed-book-response';
import { BookService } from 'src/app/services/services/book.service';

@Component({
  selector: 'app-returned-books',
  templateUrl: './returned-books.component.html',
  styleUrls: ['./returned-books.component.scss']
})
export class ReturnedBooksComponent implements OnInit {

  returnedBooks: PageResponseBorrowedBookResponse = {};
  page = 0
  size = 5
  message = '';
  level = 'success';

  constructor(private bookService: BookService){}

  ngOnInit(): void {
    this.findAllBorrowedBooks();
    console.log(this.returnedBooks);
  }

  findAllBorrowedBooks() {
    this.bookService.findAllReturnedBooks({
      page:this.page, size: this.size
    }).subscribe({
      next: (resp) => {
        this.returnedBooks = resp;
        console.log(this.returnedBooks);
      }
    })
  }

  approveBookReturn(book: BorrowedBookResponse) {
    if(!book.returned){
      this.level = 'error';
      this.message = 'The book is not yet returned';
      return;
    }
    this.bookService.approveReturnBorrrowBook({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Book return approved';
        this.bookService.findAllReturnedBooks();
      }
    })
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBorrowedBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBorrowedBooks();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllBorrowedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBorrowedBooks();
  }

  goToLastPage() {
    this.page = (this.returnedBooks.totalPages as number) - 1;
    this.findAllBorrowedBooks();
  }

  get isFirstPage(): boolean {
    return this.page === 0;
  }

  get isLastPage(): boolean {
    return this.page == (this.returnedBooks.totalPages as number) - 1;
  }

}
