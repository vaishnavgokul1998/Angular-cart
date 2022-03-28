import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Book } from 'src/app/models/home.response';
import { WishListService } from 'src/app/service/wish-list.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {

  $destroy:Subject<void> = new Subject<void>();
  constructor(@Inject(MAT_DIALOG_DATA) public data: {book:Book},
  public dialogRef: MatDialogRef<DialogComponent>,
  private wishListService:WishListService) { }

  ngOnInit(): void {
  }
  addWishList(book: Book) {
    this.wishListService.updateWishList(book.id)
    .pipe( takeUntil(this.$destroy) )
    .subscribe(()=>{

    })
  }
  ngOnDestroy(): void {
      this.$destroy.next();
      this.$destroy.complete();
  }
  addToCart(book: Book){
    this.dialogRef.close(book)
  }

}
