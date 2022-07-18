import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [  SearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call searchImage with query equality', () => {
    component.searchQueryParam = "yellow roses";
    component.searchImage();
    expect(component.searchTerm).toEqual("yellow roses");
  });
  it('should call searchImage with query inequality', () => {
    component.searchQueryParam = "yellow roses";
    component.searchImage();
    expect(component.searchTerm).not.toEqual("Yellow Roses");
  });
  it('should call onKeyDownPressed equality', () => {
    var evt = {"key":"enter"};
    component.searchQueryParam = "yellow roses";
    component.onKeyDownPressed(evt);
    expect(component.searchTerm).toEqual("yellow roses");
  });
  it('should call onKeyDownPressed inequality', () => {
    var evt = {"key":"enter"};
    component.searchQueryParam = "yellow roses";
    component.onKeyDownPressed(evt);
    expect(component.searchTerm).not.toEqual("Yellow Roses");
  });
});
