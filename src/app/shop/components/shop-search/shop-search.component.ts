import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ShopParams } from '../../shop.service';

@Component({
  selector: 'app-shop-search',
  templateUrl: './shop-search.component.html',
  styleUrls: ['./shop-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopSearchComponent implements OnInit, OnDestroy {
  @Input({ required: true })
  totalCount = 0;

  @Input({ required: true })
  shopParams!: ShopParams;

  @Output()
  search = new EventEmitter<string>();

  @Output()
  reset = new EventEmitter<void>();

  searchTerm = '';

  // 1. إنشاء Subject لاستقبال القيم المكتوبة
  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  ngOnChanges(changes: SimpleChanges): void {
    // 1. مراقبة التغيير في totalCount
    // debugger
    if (changes['totalCount']) {
      const currentTotal = changes['totalCount'].currentValue;
      const prevTotal = changes['totalCount'].previousValue;
      const isFirst = changes['totalCount'].isFirstChange();

      console.log(
        `totalCount changed: ${prevTotal} -> ${currentTotal} (First change: ${isFirst})`,
      );
    }

    // 2. مراقبة التغيير في shopParams
    if (changes['shopParams']) {
      const currentParams = changes['shopParams'].currentValue;

      console.log('shopParams updated:', currentParams);
    }
  }

  ngOnInit(): void {
    // 2. الاستماع للـ Subject وتطبيق الـ Debounce
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(1000), // الانتظار 400 مللي ثانية بعد توقف الكتابة
        distinctUntilChanged(), // عدم إرسال الطلب لو كانت القيمة هي نفسها القيمة السابقة
      )
      .subscribe((searchValue) => {
        console.log('o');

        this.search.emit(searchValue.trim());
      });
  }

  // تُستدعى مع كل حرف يكتبه المستخدم في الـ HTML
  onSearchInput(value: string): void {
    this.searchSubject.next(value);
  }

  onReset(): void {
    this.searchTerm = '';
    this.reset.emit();
  }

  get from(): number {
    if (this.totalCount === 0) {
      return 0;
    }
    return (this.shopParams.pageNumber - 1) * this.shopParams.pageSize + 1;
  }

  get to(): number {
    const value = this.shopParams.pageNumber * this.shopParams.pageSize;
    return Math.min(value, this.totalCount);
  }

  // تنظيف الـ Subscription عند تدمير المكون لمنع الـ Memory Leaks
  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
