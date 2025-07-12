import {ColumnSortWantedEnum} from "../../enums/column-sort-wanted.enum";
import {EditableEnum} from "../../enums/editable.enum";
import {ColumnTypeEnum} from "../../enums/column-type.enum";

export interface Column {
    key: string;
    label: string;
    type: ColumnTypeEnum;
    enum?: any;
    constraintValues?: any;
    sortType?: ColumnSortWantedEnum;
    editablePreCalcul: EditableEnum;
    editablePostCalcul?: EditableEnum;
    transform?: Function;
    tooltip?: string;
    autoCompleteValuesFromColumnKey?: string;
    cssClasses?: string;
    tooltipTransform?: Function;
    sensitive?: boolean;
    filterable?: boolean;
}
