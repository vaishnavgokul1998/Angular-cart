import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Book } from 'src/app/models/home.response';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit {

  @Input() book!:Book 
  @Output() wishListEmitter = new EventEmitter<Book>();
  @Output() addToCartClickEmitter = new EventEmitter<Book>();

  constructor() { }

  ngOnInit(): void {
    
  }
  wishListClick(){
    this.book.isLiked = this.book.isLiked == "YES" ? "NO":"YES"
    this.wishListEmitter.emit(this.book)
  }
  addToCart(){
    this.addToCartClickEmitter.emit(this.book)
  }
}
