import {ColumnTypeEnum} from "../enums/column-type.enum";
import {EditableEnum} from "../enums/editable.enum";
import {Column} from "../models/table/column";

export const HEADERS_PRODUITS: Column[] = [
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
    },

    {
        key: "quantité totale",
        label: "quantité totale",
        type: ColumnTypeEnum.string,
        editablePreCalcul: EditableEnum.no,
        filterable: true
    },

    {
        key: "quantité disponible",
        label: "quantité disponible",
        type: ColumnTypeEnum.string,
        editablePreCalcul: EditableEnum.no,
        filterable: true
    },

    {
        key: "image url",
        label: "image url",
        type: ColumnTypeEnum.string,
        editablePreCalcul: EditableEnum.no,
        filterable: true
    }
];
