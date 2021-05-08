import { Component, ElementRef, ViewChild } from "@angular/core";
import {
  ColumnApi,
  GridApi,
  GridOptions,
  IDatasource,
  IGetRowsParams,
} from "ag-grid-community";
import { AgGridParameter } from "app/@core/data/agGridPrameter";
import { SmartTableService } from "app/@core/mock/smart-table.service";

@Component({
  selector: "ngx-smart-table",
  templateUrl: "./smart-table.component.html",
  styleUrls: ["./smart-table.component.scss"],
})
export class SmartTableComponent {
  @ViewChild("currentPage") currentPageInput: ElementRef;
  @ViewChild("pageSize") pageSizeSelectList: ElementRef;

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

  constructor(private smartTableService: SmartTableService) {
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
        headerName: "Applicant FirstName",
        field: "ApplicantFirstName",
        editable: false,
        minWidth: 170,
        suppressSizeToFit: true,
      },
      {
        headerName: "Applicant LastName",
        field: "ApplicantLastName",
        editable: false,
        minWidth: 170,
        suppressSizeToFit: true,
      },
      {
        headerName: "Applicant MiddleName",
        field: "ApplicantMiddleName",
        editable: false,
        minWidth: 170,
        suppressSizeToFit: true,
      },
      {
        headerName: "Applicant DateOf Birth",
        field: "ApplicantDateOfBirth",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Applicant SIN",
        field: "ApplicantSIN",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Spouse FirstName",
        field: "SpouseFirstName",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Spouse LastName",
        field: "SpouseLastName",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Spouse MiddleName",
        field: "SpouseMiddleName",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Spouse DateOfBirth",
        field: "SpouseDateOfBirth",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Spouse SIN",
        field: "SpouseSIN",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Applicant Phone",
        field: "ApplicantPhone",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "CpApplicant Phone",
        field: "CpApplicantPhone",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Marital Status",
        field: "MaritalStatus",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Driver Licence",
        field: "DriverLicence",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Exp Date",
        field: "ExpDate",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Applicant Address",
        field: "ApplicantAddress",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Applicant City",
        field: "ApplicantCity",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Applicant Province",
        field: "ApplicantProvince",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Applicant PostalCode",
        field: "ApplicantPostalCode",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Applicant HowLong Year",
        field: "ApplicantHowLongYear",
        editable: false,
        minWidth: 170,
        suppressSizeToFit: true,
      },
      {
        headerName: "Applicant HowLong Month",
        field: "ApplicantHowLongMonth",
        editable: false,
        minWidth: 170,
        suppressSizeToFit: true,
      },
      {
        headerName: "Previous Applicant Address",
        field: "PreviousApplicantAddress",
        editable: false,
        minWidth: 170,
        suppressSizeToFit: true,
      },
      {
        headerName: "Previous Applicant City",
        field: "PreviousApplicantCity",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Previous Applicant Province",
        field: "PreviousApplicantProvince",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Previous Applicant PostalCode",
        field: "PreviousApplicantPostalCode",
        editable: false,
        minWidth: 230,
        suppressSizeToFit: true,
      },
      {
        headerName: "Previous Applicant HowLong Year",
        field: "PreviousApplicantHowLongYear",
        editable: false,
        minWidth: 240,
        suppressSizeToFit: true,
      },
      {
        headerName: "Previous Applicant HowLong Month",
        field: "PreviousApplicantHowLongMonth",
        editable: false,
        minWidth: 250,
        suppressSizeToFit: true,
      },
      {
        headerName: "Own Status",
        field: "OwnStatus",
        editable: false,
        minWidth: 100,
        suppressSizeToFit: true,
      },
      {
        headerName: "Market Value",
        field: "MarketValue",
        editable: false,
        minWidth: 100,
        suppressSizeToFit: true,
      },
      {
        headerName: "Mortgage Holder",
        field: "MortgageHolder",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Mortgage Balance",
        field: "MortgageBalance",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Mortgage",
        field: "Mortgage",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Present Employer Name",
        field: "PresentEmployerName",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Present Employer Occupation",
        field: "PresentEmployerOccupation",
        editable: false,
        minWidth: 180,
        suppressSizeToFit: true,
      },
      {
        headerName: "Present Employer HowLong Year",
        field: "PresentEmployerHowLongYear",
        editable: false,
        minWidth: 220,
        suppressSizeToFit: true,
      },
      {
        headerName: "Present Employer HowLong Month",
        field: "PresentEmployerHowLongMonth",
        editable: false,
        minWidth: 240,
        suppressSizeToFit: true,
      },
      {
        headerName: "Present Employer Address",
        field: "PresentEmployerAddress",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Nature Business",
        field: "NatureBusiness",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Present Employer Phone",
        field: "PresentEmployerPhone",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Present Employer Monthly Income",
        field: "PresentEmployerMonthlyIncome",
        editable: false,
        minWidth: 250,
        suppressSizeToFit: true,
      },
      {
        headerName: "Present Employer Two Income",
        field: "PresentEmployerTwoIncome",
        editable: false,
        minWidth: 250,
        suppressSizeToFit: true,
      },
      {
        headerName: "Previous Employer Name",
        field: "PreviousEmployerName",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Previous Employer Phone",
        field: "PreviousEmployerPhone",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Previous Employer HowLong Year",
        field: "PreviousEmployerHowLongYear",
        editable: false,
        minWidth: 250,
        suppressSizeToFit: true,
      },
      {
        headerName: "Previous Employer HowLong Month",
        field: "PreviousEmployerHowLongMonth",
        editable: false,
        minWidth: 250,
        suppressSizeToFit: true,
      },
      {
        headerName: "Applicant Employer Name",
        field: "ApplicantEmployerName",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Applicant Employer Occupation",
        field: "ApplicantEmployerOccupation",
        editable: false,
        minWidth: 220,
        suppressSizeToFit: true,
      },
      {
        headerName: "Applicant Employer HowLong Year",
        field: "ApplicantEmployerHowLongYear",
        editable: false,
        minWidth: 230,
        suppressSizeToFit: true,
      },
      {
        headerName: "Applicant Employer HowLong Month",
        field: "ApplicantEmployerHowLongMonth",
        editable: false,
        minWidth: 230,
        suppressSizeToFit: true,
      },
      {
        headerName: "Applicant Employer Phone",
        field: "ApplicantEmployerPhone",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Applicant Employer Monthly Income",
        field: "ApplicantEmployerMonthlyIncome",
        editable: false,
        minWidth: 230,
        suppressSizeToFit: true,
      },
      {
        headerName: "Applicant Employer Two Income",
        field: "ApplicantEmployerTwoIncome",
        editable: false,
        minWidth: 220,
        suppressSizeToFit: true,
      },
      {
        headerName: "Solid Vehicle Make",
        field: "SolidVehicleMake",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Solid Vehicle Model",
        field: "SolidVehicleModel",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Solid Vehicle Year",
        field: "SolidVehicleYear",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Solid Vehicle Kms",
        field: "SolidVehicleKms",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Solid Vehicle Vin",
        field: "SolidVehicleVin",
        editable: false,
        minWidth: 150,
        suppressSizeToFit: true,
      },
      {
        headerName: "Solid Vehicle Damage",
        field: "SolidVehicleDamage",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
        cellStyle: this.cellStyle,

        valueFormatter: (params) => {
          if (params.value === true) {
            return "yes";
          } else {
            return "no";
          }
        },
      },
      {
        headerName: "Solid Vehicle Rebuilt",
        field: "SolidVehicleRebuilt",
        editable: false,
        minWidth: 130,
		suppressSizeToFit: true,
		cellStyle: this.cellStyle,
        valueFormatter: (params) => {
          if (params.value === true) {
            return "yes";
          } else {
            return "no";
          }
        },
      },
      {
        headerName: "Solid Vehicle Out",
        field: "SolidVehicleOut",
        editable: false,
        minWidth: 100,
		suppressSizeToFit: true,
		cellStyle: this.cellStyle,
        valueFormatter: (params) => {
          if (params.value === true) {
            return "yes";
          } else {
            return "no";
          }
        },
      },
      {
        headerName: "Trade Vehicle Make",
        field: "TradeVehicleMake",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Trade Vehicle Model",
        field: "TradeVehicleModel",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Trade Vehicle Year",
        field: "TradeVehicleYear",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Trade Vehicle Kms",
        field: "TradeVehicleKms",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Trade Vehicle Vin",
        field: "TradeVehicleVin",
        editable: false,
        minWidth: 130,
        suppressSizeToFit: true,
      },
      {
        headerName: "Trade Vehicle Damage",
        field: "TradeVehicleDamage",
        editable: false,
        minWidth: 130,
		suppressSizeToFit: true,
		cellStyle: this.cellStyle,
        valueFormatter: (params) => {
          if (params.value === true) {
            return "yes";
          } else {
            return "no";
          }
        },
      },
      {
        headerName: "Trade Vehicle Rebuilt",
        field: "TradeVehicleRebuilt",
        editable: false,
        minWidth: 130,
		suppressSizeToFit: true,
		cellStyle: this.cellStyle,
        valueFormatter: (params) => {
          if (params.value === true) {
            return "yes";
          } else {
            return "no";
          }
        },
      },
      {
        headerName: "Trade Vehicle Out",
        field: "TradeVehicleOut",
        editable: false,
        minWidth: 130,
		suppressSizeToFit: true,
		cellStyle: this.cellStyle,
        valueFormatter: (params) => {
          if (params.value === true) {
            return "yes";
          } else {
            return "no";
          }
        },
      },
      {
        headerName: "Price",
        field: "Price",
        editable: false,
        minWidth: 100,
        suppressSizeToFit: true,
      },
      {
        headerName: "DocFEE",
        field: "DocFEE",
        editable: false,
        minWidth: 100,
        suppressSizeToFit: true,
      },
      {
        headerName: "Trade",
        field: "Trade",
        editable: false,
        minWidth: 100,
        suppressSizeToFit: true,
      },
      {
        headerName: "Difference",
        field: "Difference",
        editable: false,
        minWidth: 100,
        suppressSizeToFit: true,
      },
      {
        headerName: "DownPMT",
        field: "DownPMT",
        editable: false,
        minWidth: 100,
        suppressSizeToFit: true,
      },
      {
        headerName: "BalanceOwing",
        field: "BalanceOwing",
        editable: false,
        minWidth: 100,
        suppressSizeToFit: true,
      },
      {
        headerName: "created Date",
        field: "Created",
        editable: false,
        minWidth: 170,
        suppressSizeToFit: true,
      },
    ];
  }

  cellStyle(params) {
    if (params.value === true) {
      return {
        color: "green",
      };
    }
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
      allColumnIds.push(column["colId"]);
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
    const pageSize = this.pageSizeSelectList.nativeElement.value;
    this.gridApi.paginationSetPageSize(Number(pageSize));
    this.gridOptions.cacheBlockSize = Number(pageSize);
    this.loadGridData();
  }

  onGridPageSizeChanged() {
    const pageSize = this.pageSizeSelectList.nativeElement.value;
    this.gridOptions.paginationPageSize = Number(pageSize);
    this.gridOptions.cacheBlockSize = Number(pageSize);
    this.loadGridData();
  }

  onGridPaginationChanged(event) {
    if (this.gridApi) {
      const currentPage = this.gridApi.paginationGetCurrentPage() + 1;
      this.currentPageInput.nativeElement.value = currentPage;
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
      suppressQuotes: false,
    };
  }

  onBtnExport(): void {
    var params = this.getParams();
    this.gridOptions.api.exportDataAsCsv(params);
  }
}
