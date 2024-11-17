"use client";
import React from "react";

import { Input, Select, DatePicker, Button } from "antd";
const { RangePicker } = DatePicker;

interface SearchBarProps {
  onSearch: () => void;
  onReset: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onReset }) => {
  return (
    <div style={{ marginBottom: "16px", display: "flex", gap: "16px" }}>
      <Input placeholder="Nhập tiêu đề..." style={{ flex: 1 }} />
      <Select
        defaultValue="pending"
        style={{ width: 200 }}
        options={[
          { label: "Chưa giải quyết", value: "pending" },
          { label: "Đang hoạt động", value: "resolved" },
        ]}
      />
      <RangePicker style={{ width: 300 }} />
      <Button onClick={onReset}>Đặt lại</Button>
      <Button type="primary" onClick={onSearch}>
        Tìm kiếm
      </Button>
    </div>
  );
};
