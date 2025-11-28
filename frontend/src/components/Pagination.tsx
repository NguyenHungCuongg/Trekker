import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  let pages: (number | string)[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 4) {
      pages = [1, 2, 3, 4, 5, "...", totalPages];
    } else if (currentPage >= totalPages - 3) {
      const start = Math.max(2, totalPages - 4);
      pages = [1, "..."];
      for (let i = start; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]}
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Text style={[styles.pageButtonText, currentPage === 1 && styles.pageButtonTextDisabled]}>←</Text>
      </TouchableOpacity>

      {pages.map((page, idx) =>
        page === "..." ? (
          <Text key={"ellipsis-" + idx} style={styles.ellipsis}>
            ...
          </Text>
        ) : (
          <TouchableOpacity
            key={page}
            style={[styles.pageButton, page === currentPage && styles.pageButtonActive]}
            onPress={() => onPageChange(page as number)}
            disabled={page === currentPage}
          >
            <Text style={[styles.pageButtonText, page === currentPage && styles.pageButtonTextActive]}>{page}</Text>
          </TouchableOpacity>
        )
      )}

      <TouchableOpacity
        style={[styles.pageButton, currentPage === totalPages && styles.pageButtonDisabled]}
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Text style={[styles.pageButtonText, currentPage === totalPages && styles.pageButtonTextDisabled]}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
    gap: 4,
  },
  pageButton: {
    backgroundColor: "#E8ECF0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: 2,
  },
  pageButtonActive: {
    backgroundColor: "#0F93C3",
  },
  pageButtonDisabled: {
    opacity: 0.5,
  },
  pageButtonText: {
    color: "#1B1E28",
    fontWeight: "600",
    fontSize: 14,
  },
  pageButtonTextActive: {
    color: "#fff",
  },
  pageButtonTextDisabled: {
    color: "#7D848D",
  },
  ellipsis: {
    color: "#7D848D",
    fontSize: 16,
    marginHorizontal: 4,
    fontWeight: "bold",
  },
});
