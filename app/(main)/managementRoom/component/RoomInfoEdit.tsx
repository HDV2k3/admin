// RoomInfoForm.tsx
import React from "react";
import { Form, Input, InputNumber, Row, Col } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

interface RoomInfoFormProps {
  roomInfo?: RoomInfo;
  onChange: (updatedRoomInfo: RoomInfo) => void;
}

const RoomInfoForm: React.FC<RoomInfoFormProps> = ({
  roomInfo = {
    name: "",
    description: "",
    address: "",
    type: "",
    style: "",
    floor: "",
    width: 0,
    height: 0,
    totalArea: 0,
    capacity: 0,
    numberOfBedrooms: 0,
    numberOfBathrooms: 0,
    availableFromDate: "",
  },
  onChange,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFieldChange = (field: keyof RoomInfo, value: any) => {
    if (onChange) {
      onChange({
        ...roomInfo,
        [field]: value,
      } as RoomInfo);
    }
  };
  // const dateFormat = "YYYY/MM/DD";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    <>
      <Form.Item label="Room Name" name={["roomInfo", "name"]}>
        <Input
          defaultValue={roomInfo?.name}
          onChange={(e) => handleFieldChange("name", e.target.value)}
          placeholder={roomInfo?.name || "Enter room name"}
        />
      </Form.Item>

      <Form.Item label="Room Description" name={["roomInfo", "description"]}>
        <Input.TextArea
          defaultValue={roomInfo?.description}
          onChange={(e) => handleFieldChange("description", e.target.value)}
          placeholder={roomInfo?.description || "Enter room description"}
        />
      </Form.Item>

      <Form.Item label="Address" name={["roomInfo", "address"]}>
        <Input
          defaultValue={roomInfo?.address}
          onChange={(e) => handleFieldChange("address", e.target.value)}
          placeholder={roomInfo?.address || "Enter room address"}
        />
      </Form.Item>

      <Form.Item label="Room Type" name={["roomInfo", "type"]}>
        <Input
          defaultValue={roomInfo?.type}
          onChange={(e) => handleFieldChange("type", e.target.value)}
          placeholder={roomInfo?.type || "Enter room type"}
        />
      </Form.Item>

      <Form.Item label="Room Style" name={["roomInfo", "style"]}>
        <Input
          defaultValue={roomInfo?.style}
          onChange={(e) => handleFieldChange("style", e.target.value)}
          placeholder={roomInfo?.style || "Enter room style"}
        />
      </Form.Item>

      <Form.Item label="Floor" name={["roomInfo", "floor"]}>
        <Input
          defaultValue={roomInfo?.floor}
          onChange={(e) => handleFieldChange("floor", e.target.value)}
          placeholder={roomInfo?.floor || "Enter floor"}
        />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Width" name={["roomInfo", "width"]}>
            <InputNumber
              min={1}
              defaultValue={roomInfo?.width}
              onChange={(value) => handleFieldChange("width", value)}
              style={{ width: "100%" }}
              placeholder={roomInfo?.width?.toString() || "Enter width"}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Height" name={["roomInfo", "height"]}>
            <InputNumber
              min={1}
              defaultValue={roomInfo?.height}
              onChange={(value) => handleFieldChange("height", value)}
              style={{ width: "100%" }}
              placeholder={roomInfo?.height?.toString() || "Enter height"}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Total Area (m²)" name={["roomInfo", "totalArea"]}>
            <InputNumber
              min={1}
              defaultValue={roomInfo?.totalArea}
              onChange={(value) => handleFieldChange("totalArea", value)}
              style={{ width: "100%" }}
              placeholder={
                roomInfo?.totalArea?.toString() || "Enter total area"
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Capacity" name={["roomInfo", "capacity"]}>
            <InputNumber
              min={1}
              defaultValue={roomInfo?.capacity}
              onChange={(value) => handleFieldChange("capacity", value)}
              style={{ width: "100%" }}
              placeholder={roomInfo?.capacity?.toString() || "Enter capacity"}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Number of Bedrooms"
            name={["roomInfo", "numberOfBedrooms"]}
          >
            <InputNumber
              min={1}
              defaultValue={roomInfo?.numberOfBedrooms}
              onChange={(value) => handleFieldChange("numberOfBedrooms", value)}
              style={{ width: "100%" }}
              placeholder={
                roomInfo?.numberOfBedrooms?.toString() ||
                "Enter number of bedrooms"
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Number of Bathrooms"
            name={["roomInfo", "numberOfBathrooms"]}
          >
            <InputNumber
              min={1}
              defaultValue={roomInfo?.numberOfBathrooms}
              onChange={(value) =>
                handleFieldChange("numberOfBathrooms", value)
              }
              style={{ width: "100%" }}
              placeholder={
                roomInfo?.numberOfBathrooms?.toString() ||
                "Enter number of bathrooms"
              }
            />
          </Form.Item>
        </Col>
      </Row>

      {/* <Form.Item
        label="Available From"
        name={["roomInfo", "availableFromDate"]}
      >
        <DatePicker
          style={{ width: "100%" }}
          defaultValue={dayjs(roomInfo?.availableFromDate, dateFormat)}
          format={dateFormat}
        />
      </Form.Item> */}
    </>
  );
};

export default RoomInfoForm;
