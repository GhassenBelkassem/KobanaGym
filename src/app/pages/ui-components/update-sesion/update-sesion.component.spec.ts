import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSesionComponent } from './update-sesion.component';

describe('UpdateSesionComponent', () => {
  let component: UpdateSesionComponent;
  let fixture: ComponentFixture<UpdateSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSesionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
