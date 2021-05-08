import { Component, ElementRef, ViewChild } from "@angular/core";
import {ColumnApi, GridApi, GridOptions, IDatasource,IGetRowsParams} from "ag-grid-community";
import { AgGridParameter } from "app/@core/data/agGridPrameter";
import { ContactService } from "app/@core/mock/contact.service";

@Component({
	selector: "ngx-smart-table",
	templateUrl: "./contact.component.html",
	styleUrls: ["./contact.component.scss"],
})
export class ContactComponent {
	@ViewChild("currentPageGridInput") currentPageGridInput: ElementRef;
	@ViewChild("pageSizeGridSelectList") pageSizeGridSelectList: ElementRef;

	public gridOptions: GridOptions;
	public gridApi: GridApi;
	public gridColumnApi: ColumnApi;
	public columnDefs: any;
	public defaultColDef: any;
	public frameworkComponents: any;

	public options: GridOptions = {
		pagination: true,
		rowSelection: "multiple",
		domLayout: "autoHeight",
		rowModelType: "infinite",
		cacheOverflowSize: 0,
		rowHeight: 38,
		maxConcurrentDatasourceRequests: 1,
		infiniteInitialRowCount: 1,
		maxBlocksInCache: 1,
		paginationPageSize: 10,
		cacheBlockSize: 10,
		sortingOrder: ["desc", "asc"],
		animateRows: false,
		onGridReady: (params: any) => {
			params.api.sizeColumnsToFit();
		},
		paginationNumberFormatter: function (params) {
			return "[" + params.value.toLocaleString() + "]";
		},
		getRowNodeId: function (item) {
			return item.Id != null ? item.Id.toString() : "";
		},
	};

	public readonly firstColumnName: string = "Code";

	constructor(private smartTableService: ContactService) {
		this.gridOptions = Object.assign({}, this.options);
		this.gridOptions.context = this;

		this.defaultColDef = {
			resizable: true,
			sortable: true,
			autoHeight: true,
			editable: false,
			filter: true,
			menuTabs: ["filterMenuTab"],
		};

		this.columnDefs = [
			{
				headerName: "Name",
				field: "Name",
				editable: false,
				minWidth: 200,
				suppressSizeToFit: true
			},
			{
				headerName: "Email",
				field: "Email",
				editable: false,
				minWidth: 220,
				suppressSizeToFit: true
			},
			{
				headerName: "Phone",
				field: "Phone",
				editable: false,
				minWidth: 220,
				suppressSizeToFit: true
			},
			{
				headerName: "Message",
				field: "Message",
				editable: false,
				minWidth: 400,
				suppressSizeToFit: true
			},
			{
				headerName: 'created Date',
				field: 'Created',
				editable: false,
				minWidth: 120,
				suppressSizeToFit: true
			},
		];
	}

	onGridReady(params) {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;
		this.autoSizeAll(false);
		this.loadGridData();
	}

	autoSizeAll(skipHeader) {
		var allColumnIds = [];
		this.gridOptions.columnApi.getAllColumns().forEach(function (column) {
		  allColumnIds.push(column['colId']);
		});
	  
		this.gridOptions.columnApi.autoSizeColumns(allColumnIds, skipHeader);
	  }


	fitGridColumnsSize() {
		if (this.gridApi) {
			this.gridApi.sizeColumnsToFit();
		}
	}

	onCurrentPageChanged(pageValue: string) {
		this.gridApi.paginationGoToPage(Number(pageValue) - 1);
	}

	onPageSizeChanged() {
		const pageSize = this.pageSizeGridSelectList.nativeElement.value;
		this.gridApi.paginationSetPageSize(Number(pageSize));
		this.gridOptions.cacheBlockSize = Number(pageSize);
		this.loadGridData();
	}

	onGridPageSizeChanged() {
		const pageSize = this.pageSizeGridSelectList.nativeElement.value;
		this.gridOptions.paginationPageSize = Number(pageSize);
		this.gridOptions.cacheBlockSize = Number(pageSize);
		this.loadGridData();
	}

	onGridPaginationChanged(event) {
		if (this.gridApi) {
			const currentPage = this.gridApi.paginationGetCurrentPage() + 1;
			this.currentPageGridInput.nativeElement.value = currentPage;
		}
	}

	onGridPageChanged(pageValue: string) {
		this.gridApi.paginationGoToPage(Number(pageValue) - 1);
	}

	loadGridData() {
		
		const dataSource = {
			rowCount: null,
			getRows: (params: IGetRowsParams) => {
				this.gridApi.deselectAll();

				const propertyNames = Object.getOwnPropertyNames(params.filterModel);
				// const filterItems: agGridFilter[] = [];
				// for (let i = 0; i < propertyNames.length; i++) {
				// 	const current = params.filterModel[propertyNames[i]];
				// 	filterItems.push({
				// 		Filter: current.filter,
				// 		FilterType: current.filterType,
				// 		Type: current.type,
				// 		FilterField: propertyNames[i]
				// 	});
				// }
				const agGridParameter: AgGridParameter = <AgGridParameter>{
					StartRow: params.startRow,
					EndRow: params.endRow,
					PageSize: params.endRow - params.startRow,
					ColId:
						params.sortModel.length == 0 ? null : params.sortModel[0].colId,
					Sort: params.sortModel.length == 0 ? null : params.sortModel[0].sort,
				};
				this.gridApi.showLoadingOverlay();
				this.smartTableService
					.getLoanList(agGridParameter)
					.subscribe((data) => {
						
						if (data.Result) {
							data.Result.Items.forEach(function (item) {
								item.id = item.Id;
							});
							const rowsThisPage = data.Result.Items;
							const lastRow = data.Result.TotalCount;
							params.successCallback(rowsThisPage, lastRow);
							this.fitGridColumnsSize();
							if (lastRow > 0) {
								this.bringFocusBack();
							}
						}
						this.gridApi.hideOverlay();
					});
			},
		} as IDatasource;
		if (this.gridApi) {
			this.gridApi.setDatasource(dataSource);
		}
	}

	reloadGridData() {
		const filters = this.gridApi.getFilterModel();
		if (filters && Object.keys(filters).length > 0) {
			this.gridApi.setFilterModel(null);
		} else {
			this.loadGridData();
		}
	}

	onRowClicked(event) {
		if (event.event.target) {
			const data = event.data;
			const actionType = event.event.target.getAttribute("data-action-type");
			this.setRowNodeSelected(event.node.id);
		}
	}

	cellEditingStopped(event) {
		this.gridApi.setFocusedCell(event.rowIndex, event.colDef.field);
	}

	onCellKeyDown(event) {
		const cellKeyDownEvent = event.event.key;
		switch (cellKeyDownEvent) {
			case "ArrowDown":
			case "ArrowUp":
				{
					const focusedCell = this.gridApi.getFocusedCell();
					if (focusedCell) {
						const rowNode = this.getRowNodeByRowIndex(focusedCell.rowIndex);
						if (rowNode && rowNode.id) {
							rowNode.setSelected(true);
						}
					}
				}
				break;
			default:
				break;
		}
	}

	onStartEditingRow(rowIndex, colKey) {
		this.gridApi.startEditingCell({
			rowIndex: rowIndex,
			colKey: colKey,
		});
	}

	setFocusedRowCell(rowIndex, colKey) {
		this.gridApi.setFocusedCell(rowIndex, colKey);
	}

	setRowNodeSelected(rowNodeId) {
		this.gridApi.deselectAll();
		const rowNode = this.gridApi.getRowNode(rowNodeId);
		if (rowNode) {
			rowNode.setSelected(true);
		}
	}

	getRowNodeByRowIndex(rowIndex: number) {
		return this.gridApi.getDisplayedRowAtIndex(rowIndex);
	}

	bringFocusBack() {
		const focusedCell = this.gridApi.getFocusedCell();
		const firstRowIndex =
			this.gridApi.paginationGetPageSize() *
			this.gridApi.paginationGetCurrentPage();
		const lastRowIndex =
			this.gridApi.paginationGetPageSize() *
			(this.gridApi.paginationGetCurrentPage() + 1);
		if (
			focusedCell &&
			focusedCell.rowIndex >= firstRowIndex &&
			focusedCell.rowIndex < lastRowIndex
		) {
			this.gridApi.setFocusedCell(focusedCell.rowIndex, focusedCell.column);
			const rowNode = this.gridApi.getDisplayedRowAtIndex(focusedCell.rowIndex);
			if (rowNode && rowNode.id) {
				rowNode.setSelected(true);
			}
		} else {
			const firstRowIndex =
				this.gridApi.paginationGetPageSize() *
				this.gridApi.paginationGetCurrentPage();
			this.setFocusedRowCell(firstRowIndex, this.firstColumnName);
			const rowNode = this.gridApi.getDisplayedRowAtIndex(firstRowIndex);
			if (rowNode && rowNode.id) {
				rowNode.setSelected(true);
			}
		}
	}

	onResize() {
		this.fitGridColumnsSize();
	}

	//Excel CSV
	getParams() {
		return {
			columnWidth: 100,
		  suppressQuotes: false
		 
		};
	  }

	onBtnExport(): void {
		var params = this.getParams();
		this.gridOptions.api.exportDataAsCsv(params);
	}

}
