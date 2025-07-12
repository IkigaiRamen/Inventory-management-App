import {waitForAsync} from '@angular/core/testing';

import { TableComponent } from './table.component';
import {MockBuilder, MockedComponentFixture, MockRender, ngMocks} from "ng-mocks";
import {TranslateModule} from "@ngx-translate/core";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {TableModule} from "primeng/table";
import {ColumnTypeEnum} from "../../enums/column-type.enum";
import {EditableEnum} from "../../enums/editable.enum";
import {Column} from "../../models/table/column";
import {By} from "@angular/platform-browser";

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: MockedComponentFixture<TableComponent, {}>;

  beforeEach(() => {

    return MockBuilder(TableComponent, TableModule)
      .keep(TranslateModule.forRoot(), {
        export: true,
      })
      .beforeCompileComponents(testBed => {
        testBed.configureTestingModule({
          schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        })
      })
  });

  beforeEach(() => {
    fixture = MockRender(TableComponent, {});
    component = fixture.point.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display table title', waitForAsync(() => {
    // GIVEN
    component.title = "titre du tableau";
    // WHEN
    fixture.detectChanges();
    // THEN
    const element = ngMocks.find('p-table');
    const caption = ngMocks.findTemplateRef(element, [
      'pTemplate',
      'caption',
    ]);
    ngMocks.render(element.componentInstance, caption);
    const spanTitle = fixture.nativeElement.querySelector('.table-title');
    expect(spanTitle.textContent).toEqual("titre du tableau");
  }));

  it('should init selectedColumns with columns values', () => {
    // GIVEN
    component.colonnes = [
      {
        editablePreCalcul: EditableEnum.yes,
        type: ColumnTypeEnum.string,
        label: "Toto",
        key: "cle"
      } as Column,
      {
        editablePreCalcul: EditableEnum.no,
        type: ColumnTypeEnum.integer,
        label: "Toto2",
        key: "cle2"
      } as Column,
      {
        editablePreCalcul: EditableEnum.no,
        type: ColumnTypeEnum.enum,
        label: "Toto3",
        key: "cle3"
      } as Column
    ];
    // WHEN
    component.ngOnInit();
    // THEN
    expect(component.selectedColumns).toEqual([
      {
        editablePreCalcul: EditableEnum.yes,
        type: ColumnTypeEnum.string,
        label: "Toto",
        key: "cle"
      } as Column,
      {
        editablePreCalcul: EditableEnum.no,
        type: ColumnTypeEnum.integer,
        label: "Toto2",
        key: "cle2"
      } as Column,
      {
        editablePreCalcul: EditableEnum.no,
        type: ColumnTypeEnum.enum,
        label: "Toto3",
        key: "cle3"
      } as Column
    ]);
  });

  it('should display edit button', waitForAsync(() => {
    // GIVEN
    fixture.detectChanges();

    // THEN
    const element = ngMocks.find('p-table');
    const body = ngMocks.findTemplateRef(element, [
      'pTemplate',
      'body',
    ]);
    ngMocks.render(element.componentInstance, body);
    const editButton = fixture.debugElement.query(By.css('button'))

    //THEN
    expect(editButton).toBeTruthy();
  }));
});
