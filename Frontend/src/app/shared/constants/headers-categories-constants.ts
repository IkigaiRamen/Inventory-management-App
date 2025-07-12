import {ColumnTypeEnum} from "../enums/column-type.enum";
import {EditableEnum} from "../enums/editable.enum";
import {Column} from "../models/table/column";

export const HEADERS_CATEGORIES: Column[] = [
    {
        key: "libelle",
        label: "Nom",
        type: ColumnTypeEnum.string,
        editablePreCalcul: EditableEnum.no,
        filterable: true
    },
    {
        key: "description",
        label: "Description",
        type: ColumnTypeEnum.string,
        editablePreCalcul: EditableEnum.no,
        filterable: true
    }
];
