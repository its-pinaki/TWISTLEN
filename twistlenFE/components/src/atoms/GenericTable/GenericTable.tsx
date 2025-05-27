import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Checkbox } from "react-native-paper";

interface Column {
  key: string;
  title: string;
  sortable?: boolean;
  render?: (row: Record<string, any>) => JSX.Element;
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
  rowsPerPage?: number;
  themeColor?: string;
  onSelectionChange?: (selectedRows: Record<string, any>[]) => void;
  hidePagination?: boolean;
  hideSearch?: boolean;
  heading?: string;
  isItemSelectAllEnabled?: boolean;
}

const GenericTable: React.FC<TableProps> = ({
  columns,
  data,
  rowsPerPage = 5,
  themeColor = "#6200ea",
  onSelectionChange,
  hidePagination = false,
  hideSearch = false,
  heading,
  isItemSelectAllEnabled = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([]);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    return data.filter((row) =>
      columns.some((col) =>
        row[col.key]
          ?.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, data]);

  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;
    return [...filteredData].sort((a, b) => {
      const valA = a[sortColumn];
      const valB = b[sortColumn];
      if (typeof valA === "number" && typeof valB === "number") {
        return sortOrder === "asc" ? valA - valB : valB - valA;
      } else {
        return sortOrder === "asc"
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      }
    });
  }, [sortColumn, sortOrder, filteredData]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = hidePagination
    ? sortedData
    : sortedData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      );

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnKey);
      setSortOrder("asc");
    }
  };

  const toggleRowSelection = (row: Record<string, any>) => {
    let newSelectedRows = [...selectedRows];
    if (selectedRows.some((selected) => selected.id === row.id)) {
      newSelectedRows = newSelectedRows.filter(
        (selected) => selected.id !== row.id
      );
    } else {
      newSelectedRows.push(row);
    }
    setSelectedRows(newSelectedRows);
    if (onSelectionChange) onSelectionChange(newSelectedRows);
  };

  const renderPagination = () => {
    const getPageRange = () => {
      const range: (number | "...")[] = [];
      const delta = 1; // how many pages to show beside current

      if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      const left = Math.max(currentPage - delta, 2);
      const right = Math.min(currentPage + delta, totalPages - 1);

      range.push(1);
      if (left > 2) range.push("...");

      for (let i = left; i <= right; i++) {
        range.push(i);
      }

      if (right < totalPages - 1) range.push("...");
      range.push(totalPages);

      return range;
    };

    const pagesToDisplay = getPageRange();

    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          disabled={currentPage === 1}
          onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          style={[styles.pageButton, { backgroundColor: themeColor }]}
        >
          <Text style={styles.pageText}>Prev</Text>
        </TouchableOpacity>

        <View style={styles.pageNumbersWrapper}>
          {pagesToDisplay.map((page, idx) =>
            page === "..." ? (
              <Text key={idx} style={{ marginHorizontal: 5 }}>
                ...
              </Text>
            ) : (
              <TouchableOpacity
                key={page}
                onPress={() => setCurrentPage(page)}
                style={[
                  styles.pageNumberButton,
                  {
                    backgroundColor:
                      currentPage === page ? themeColor : "#f0f0f0",
                  },
                ]}
              >
                <Text
                  style={{
                    color: currentPage === page ? "white" : "black",
                    fontWeight: "bold",
                  }}
                >
                  {page}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        <TouchableOpacity
          disabled={currentPage === totalPages}
          onPress={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          style={[styles.pageButton, { backgroundColor: themeColor }]}
        >
          <Text style={styles.pageText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView
      horizontal
      contentContainerStyle={{ flexGrow: 1 }}
      showsHorizontalScrollIndicator={true}
    >
      <View style={styles.container}>
        {heading && <Text style={styles.heading}>{heading}</Text>}

        {!hideSearch && (
          <TextInput
            style={[styles.searchInput, { borderColor: themeColor }]}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        )}

        <View
          style={[
            styles.header,
            {
              backgroundColor: "#F9FAFB",
              borderColor: "#E5E7EB",
              borderWidth: 0.5,
            },
          ]}
        >
          {isItemSelectAllEnabled && (
            <View style={[styles.headerCell, { width: 40 }]}>
              <Checkbox
                status={
                  selectedRows.length === paginatedData.length &&
                  paginatedData.length > 0
                    ? "checked"
                    : "unchecked"
                }
                onPress={() => {
                  if (selectedRows.length === paginatedData.length) {
                    setSelectedRows([]);
                  } else {
                    setSelectedRows(paginatedData);
                  }
                  if (onSelectionChange) onSelectionChange(paginatedData);
                }}
              />
            </View>
          )}
          {columns.map((col) => (
            <TouchableOpacity
              key={col.key}
              style={[styles.headerCell, col.sortable && styles.sortableHeader]}
              onPress={() => col.sortable && handleSort(col.key)}
              disabled={!col.sortable}
            >
              <Text style={styles.headerText}>{col.title}</Text>
              {col.sortable && (
                <Ionicons
                  name={
                    sortColumn === col.key && sortOrder === "asc"
                      ? "arrow-up"
                      : "arrow-down"
                  }
                  size={16}
                  color="white"
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView
          horizontal
          contentContainerStyle={{ flexGrow: 1 }}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.tableWrapper}>
            <FlatList
              data={paginatedData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.row}>
                  {isItemSelectAllEnabled && (
                    <View style={[styles.cell, { width: 40 }]}>
                      <Checkbox
                        status={
                          selectedRows.some(
                            (selected) => selected.id === item.id
                          )
                            ? "checked"
                            : "unchecked"
                        }
                        onPress={() => toggleRowSelection(item)}
                      />
                    </View>
                  )}
                  {columns.map((col) => (
                    <View key={col.key} style={styles.cell}>
                      {col.render ? (
                        col.render(item)
                      ) : (
                        <Text>{item[col.key]}</Text>
                      )}
                    </View>
                  ))}
                </View>
              )}
            />
          </View>
        </ScrollView>

        {!hidePagination && (
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
              {Math.min(currentPage * rowsPerPage, sortedData.length)} of{" "}
              {sortedData.length} results
            </Text>
            {renderPagination()}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    width:"100%"
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    // textAlign: "center",
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: "center",
  },
  headerCell: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  sortableHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    color: "black",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  cell: {
    flex: 1,
    padding: 8,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  pageButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  pageNumbersWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pageNumberButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  pageText: {
    color: "white",
    fontWeight: "bold",
  },
  tableWrapper: {
    flex: 1,
  },
});

export default GenericTable;
