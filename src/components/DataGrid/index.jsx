
import React from 'react'
import DataTable from 'react-data-table-component';
import { dummyData } from '../../types';

const columns = [
	{
		name: 'id',
		selector: row => row.id,
	},
	{
		name: 'domain',
		selector: row => row.domain,
		sortable: true,
	},
	{
		name: 'type',
		selector: row => row.type,
		sortable: true,
	},
	{
		name: 'value',
		selector: row => row.value,
		sortable: true,
	},
	{
		name: 'TTL',
		selector: row => row?.TTL?.ttl,
		sortable: true,
	},
];

const data = [
  {
    id: 1,
    domain: "hush.co",
    type: "A",
    value: "192.168.1.1",
    TTL: 1200
  }
]

const DataGrid = () => {
  return (
    <DataTable columns={columns} data={dummyData}/>
  )
}

export default DataGrid
