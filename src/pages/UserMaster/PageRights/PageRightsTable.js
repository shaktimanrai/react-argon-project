/* eslint-disable eqeqeq */
import { Badge } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { connect } from "react-redux";
import * as actions from "store/creators";
import EditPageRights from "./EditPageRights";

function PageRightsTable(props) {
  const [pageSize, setPageSize] = React.useState(30);
  const columns = [
    {
      field: "page.page_name",
      headerName: "Pages",
      width: 300,
      // flex: 1,
      headerAlign: "center",
      renderCell: ({ row }) => {
        return <>{row?.page?.page_name}</>;
      },
    },
    {
      field: "view",
      headerName: "View",
      flex: 1,
      headerAlign: "center",
      renderCell: ({ row }) => {
        return (
          <>
            {row?.view == 1 ? (
              <Badge color="primary" variant="dot"></Badge>
            ) : (
              <Badge color="error" variant="dot"></Badge>
            )}
          </>
        );
      },
    },
    {
      field: "create",
      headerName: "Create",
      flex: 1,
      headerAlign: "center",
      renderCell: ({ row }) => {
        return (
          <>
            {row?.create == 1 ? (
              <Badge color="primary" variant="dot"></Badge>
            ) : (
              <Badge color="error" variant="dot"></Badge>
            )}
          </>
        );
      },
    },

    {
      field: "update",
      headerName: "Update",
      flex: 1,
      headerAlign: "center",
      renderCell: ({ row }) => {
        return (
          <>
            {row?.update == 1 ? (
              <Badge color="primary" variant="dot"></Badge>
            ) : (
              <Badge color="error" variant="dot"></Badge>
            )}
          </>
        );
      },
    },

    {
      field: "delete",
      headerName: "Delete",
      flex: 1,
      headerAlign: "center",
      renderCell: ({ row }) => {
        return (
          <>
            {row?.delete == 1 ? (
              <Badge color="primary" variant="dot"></Badge>
            ) : (
              <Badge color="error" variant="dot"></Badge>
            )}
          </>
        );
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return <EditPageRights data={params.row} index={params.row.id} />;
      },
    },
  ];

  const rows = props?.users?.isLoading
    ? []
    : props?.users?.users?.filter((row) => row.name == props.currentUser)
        .length > 0
    ? props?.users?.users?.filter((row) => row.name == props.currentUser)[0]
        ?.rights
    : [];
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      loading={props.users?.isLoading ? true : false}
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[15, 20]}
      pagination
      disableSelectionOnClick
      autoHeight
      hideFooterPagination
      cell--textCenter
    />
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.entities.userMaster.users,
    rights: state.entities.userMaster.rights,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUsersGetData: (data) => dispatch(actions.usersGetData(data)),
    onRightsGetData: (data) => dispatch(actions.rightsGetData(data)),
    onDeleteRights: (id, data) => dispatch(actions.deleteRights(id, data)),
    onPostRightsData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.postRightsData(data, user, toggle, setSubmitting)),
    updateRightsData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateRightsData(data, user, toggle, setSubmitting)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageRightsTable);
