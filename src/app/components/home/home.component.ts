import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { forkJoin, of, Subject, takeUntil } from 'rxjs';
import { CartRequest } from 'src/app/models/cart/cart.model';
import { WishList } from 'src/app/models/wishlist/wishlist.response';
import { CartService } from 'src/app/service/cart.service';
import { WishListService } from 'src/app/service/wish-list.service';
import { Book } from '../../models/home.response';
import { AuthService } from '../../service/auth.service';
import { HomeService } from '../../service/home.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  books: Book[] = []
  wishLists: WishList[] = []
  columnClass: boolean = true;
  selectedBook!: Book
  $destroy: Subject<void> = new Subject<void>()

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private cartService: CartService,
    private _snackBar: MatSnackBar,
    private wishListService: WishListService,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {

    forkJoin([of(this.activatedRoute.snapshot.data['books']), this.wishListService.getWishList()])
      .pipe(takeUntil(this.$destroy))
      .subscribe(([res1, res2]) => {
        this.wishLists = res2.responseBody || [];
        this.books = Book.getNewArray(res1 as Book[], this.wishLists);
        this.selectedBook = this.books[0]
      })
  }
  openDetail(book: Book) {
    this.selectedBook = book;
    // this.columnClass = false;
    const dialog = this.dialog.open(DialogComponent, {
      panelClass: 'book-dialog',
      width: '650px',
      data: {
        book: this.selectedBook
      }
    })
    dialog.afterClosed().subscribe(result=>{
       if(result){
        this.addToCart(result)
       }
    })
  }
  addToCart(book: Book) {
    let req: CartRequest = {
      bookId: book.id
    }
    this.cartService.addItemToCart(req)
      .pipe(takeUntil(this.$destroy))
      .subscribe(res => {
        this._snackBar.open(res.responseCode.message, undefined, {
          duration: 2000,
          panelClass: ['white-snackbar']
        });
      })
  }
  addWishList(book: Book) {
    this.wishListService.updateWishList(book.id)
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {

      })
  }
  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
