import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  BookResponse,
  PageResponseBookResponse,
} from 'src/app/services/models';
import { BookService } from 'src/app/services/services';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss'],
})
export class MyBooksComponent implements OnInit {

  bookResponse: PageResponseBookResponse = {};
  page = 0;
  size = 1;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.findAllBooks();
  }

  private findAllBooks() {
    this.bookService
      .findAllBooksByOwner({ page: this.page, size: this.size })
      .subscribe({
        next: (books) => {
          this.bookResponse = books;
        },
      });
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBooks();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }

  goToLastPage() {
    this.page = (this.bookResponse.totalPages as number) - 1;
    this.findAllBooks();
  }

  get isFirstPage(): boolean {
    return this.page === 0;
  }

  get isLastPage(): boolean {
    return this.page == (this.bookResponse.totalPages as number) - 1;
  }

  archiveBook(book: BookResponse) {
    this.bookService.updateArchivedStatus({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        book.archived = !book.archived
      }
    });
  }

  shareBook(book: BookResponse) {
    this.bookService.updateSharebleStatus({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        book.shareable = !book.shareable
      }
    });
  }

  editBook(book: BookResponse) {
    this.router.navigate(['books', 'manage', book.id])
  }

}
