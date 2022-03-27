import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/models/home.response';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  @Input() book!: Book;

  @Output() seeMoreClickEmitter = new EventEmitter<Book>();
  @Output() buyClickEmitter = new EventEmitter<Book>();
  @Output() wishListEmitter = new EventEmitter<Book>();
  constructor() { }

  ngOnInit(): void {
  }
  seeMoreClick(book: Book) {
    this.seeMoreClickEmitter.emit(book)
  }
  buyProduct(book: Book) {
    this.buyClickEmitter.emit(book)
  }
  wishListClick(){
    this.book.isLiked = this.book.isLiked == "YES" ? "NO":"YES"
    this.wishListEmitter.emit(this.book)
  }

}
