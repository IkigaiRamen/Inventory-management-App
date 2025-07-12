import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ColumnTypeEnum} from "../../enums/column-type.enum";
import {Column} from "../../models/table/column";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {

  ngOnInit(): void {
    this.selectedColumns = this.colonnes;
  }

  columnTypeEnum: typeof ColumnTypeEnum = ColumnTypeEnum;
  @Input() title: string = "";
  @Input() colonnes: Column[] = [];
  @Input() rows: any[] = [];
  @Input() resultPerPage: number = 10;
  @Input() nombreOccurences: number = 0;
  @Input() paginator: boolean = true;
  @Input() isEditable: boolean = true;
  @Input() isDeletable: boolean = true;
  @Input() canAddRow: boolean = true;

  @Output() rowElementEditAction = new EventEmitter();
  @Output() rowElementDeleteAction = new EventEmitter();
  @Output() deleteRow = new EventEmitter();
  @Output() addRow = new EventEmitter();
  @Output() editRow = new EventEmitter();
  @Output() clickRow = new EventEmitter();

  first = 0;

  selectedColumns: Column[] = [];

  confirmAdd(){
    this.addRow.emit();
  }

  select(event:any) {
    this.clickRow.emit(event);
  }

  confirmDelete(rowData: any) {
    this.deleteRow.emit(rowData);
  }

  confirmEdit(rowData: any) {
    this.editRow.emit(rowData);
  }

  modelChange(event : any) {
    this.selectedColumns = event.sort((a: Column, b: Column) => {
      return this.colonnes.findIndex(p => p.key === a.key) - this.colonnes.findIndex(p => p.key === b.key);
    });
  }
}