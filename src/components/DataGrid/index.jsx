import React from "react";
import DataTable from "react-data-table-component";
import { dummyData } from "../../types";
import { useDNSRecords } from "../../hooks/useQueries";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import { Button } from "reactstrap";

const columns = [
  {
    name: "ID",
    selector: (row) => row.id,
  },
  {
    name: "Domain",
    selector: (row) => row.domain,
    sortable: true,
  },
  {
    name: "Type",
    selector: (row) => row.type,
    sortable: true,
  },
  {
    name: "Value",
    selector: (row) => row.value,
    sortable: true,
  },
  {
    name: "TTL",
    selector: (row) => row?.ttl,
    sortable: true,
  },
  {
	name: "",
	button: "true",
	cell: () =>
	<Button color="warning" >
    <img src="https://raw.githubusercontent.com/ptech12/dns-manager/main/src/assets/pencil.svg" alt="pencil" width={25} height={25}  />
  </Button>
  },
  {
	name: "",
	button: "true",
	cell: () =>(
		<Button color="danger" >
      <img src="https://raw.githubusercontent.com/ptech12/dns-manager/main/src/assets/trash.svg" alt="trash-box" width={25} height={25}  />
    </Button>
  ),

  },
];
const customStyle = {
	cells: {
		style: {
			paddingLeft: '-50px'
		}
	}
}

const DataGrid = () => {
  const accessToken = Cookies.get("token").toString();

  const { data, isPending } = useDNSRecords(accessToken);

  if (isPending)
    return (
      <div className="relative">
        <div className="h-full w-full absolute inset-0 flex items-center justify-center">
          <Loader2 className="animate-spin transition ease-linear" />
        </div>
      </div>
    );


  return (
    <div className="container mx-auto py-10">
	<DataTableToolBar />
      <DataTable 
	  	title="DNS Records"
		columns={columns}
		data={data || []}
		pagination
		customStyles={customStyle}
		style={{
			maxWidth: '50%'
		}}
	  />
    </div>
  );
};

export default DataGrid;
