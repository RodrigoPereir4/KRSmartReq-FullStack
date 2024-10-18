'use client'

import styled from "styled-components"

import EnhancedTable from "@/components/MUI/Tabela";
import { useState } from "react";

const tableHeader = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Dessert (100g serving)',
    },
    {
      id: 'calories',
      numeric: true,
      disablePadding: false,
      label: 'Calories',
    },
    {
      id: 'fat',
      numeric: true,
      disablePadding: false,
      label: 'Fat (g)',
    },
    {
      id: 'carbs',
      numeric: true,
      disablePadding: false,
      label: 'Carbs (g)',
    },
    {
      id: 'protein',
      numeric: true,
      disablePadding: false,
      label: 'Protein (g)',
    },
];


function createData(id, name, calories, fat, carbs, protein) {
    return { id, name, calories, fat, carbs, protein };
}

export default function Requisicao(){
    const [rows, setRows] = useState([]);

    const handleAddRow = () => {
        const newRow = createData(rows.length + 1, 'Cupcake', 305, 3.7, 67, 4.3);
        setRows((prevRows) => [...prevRows, newRow]);
    };

    const handleDeleteRow = (selected) => {
        setRows((prevRows) => prevRows.filter((row) => !selected.includes(row.id)));
    };

    return(
        <>
            <button onClick={handleAddRow}>Adicionar LinhaAAAA</button>
            <EnhancedTable tableHeader={tableHeader} rows={rows} onDeleteRow={handleDeleteRow}/>
        </>
    );
}