import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#handleKeyDown', () => {
    it('should event Escape key', () => {
      const mockedKeyEvent: KeyboardEvent = {
        key: 'Escape',
        altKey: false,
        charCode: 0,
        code: '',
        ctrlKey: false,
        isComposing: false,
        keyCode: 0,
        location: 0,
        metaKey: false,
        repeat: false,
        shiftKey: false,
        getModifierState: function (keyArg: string): boolean {
          throw new Error('Function not implemented.');
        },
        initKeyboardEvent: function (
          typeArg: string,
          bubblesArg?: boolean,
          cancelableArg?: boolean,
          viewArg?: Window | null,
          keyArg?: string,
          locationArg?: number,
          ctrlKey?: boolean,
          altKey?: boolean,
          shiftKey?: boolean,
          metaKey?: boolean
        ): void {
          throw new Error('Function not implemented.');
        },
        DOM_KEY_LOCATION_STANDARD: 0,
        DOM_KEY_LOCATION_LEFT: 1,
        DOM_KEY_LOCATION_RIGHT: 2,
        DOM_KEY_LOCATION_NUMPAD: 3,
        detail: 0,
        view: null,
        which: 0,
        initUIEvent: function (
          typeArg: string,
          bubblesArg?: boolean,
          cancelableArg?: boolean,
          viewArg?: Window | null,
          detailArg?: number
        ): void {
          throw new Error('Function not implemented.');
        },
        bubbles: false,
        cancelBubble: false,
        cancelable: false,
        composed: false,
        currentTarget: null,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: false,
        returnValue: false,
        srcElement: null,
        target: null,
        timeStamp: 0,
        type: '',
        composedPath: function (): EventTarget[] {
          throw new Error('Function not implemented.');
        },
        initEvent: function (
          type: string,
          bubbles?: boolean,
          cancelable?: boolean
        ): void {
          throw new Error('Function not implemented.');
        },
        preventDefault: function (): void {
          throw new Error('Function not implemented.');
        },
        stopImmediatePropagation: function (): void {
          throw new Error('Function not implemented.');
        },
        stopPropagation: function (): void {
          throw new Error('Function not implemented.');
        },
        NONE: 0,
        CAPTURING_PHASE: 1,
        AT_TARGET: 2,
        BUBBLING_PHASE: 3,
      };
      const spyToggle = jest.spyOn(component, 'toggle');
      component.show = true;

      component.handleKeyDown(mockedKeyEvent);

      expect(spyToggle).toHaveBeenCalled();
      expect(component.show).toBeFalsy();
    });
  });
});
